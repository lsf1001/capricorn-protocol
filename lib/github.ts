import { GITHUB_USERNAME } from "@/lib/profile";
import { normalizeRepositories } from "@/lib/repositories";
import type { GithubApiRepo, GithubRepo } from "@/types/github";

const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

function is_nullable_string(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function is_github_api_repo(value: unknown): value is GithubApiRepo {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const repository = value as Record<string, unknown>;
  return typeof repository.id === "number"
    && typeof repository.name === "string"
    && is_nullable_string(repository.description)
    && is_nullable_string(repository.language)
    && typeof repository.stargazers_count === "number"
    && typeof repository.forks_count === "number"
    && typeof repository.updated_at === "string"
    && typeof repository.html_url === "string"
    && is_nullable_string(repository.homepage)
    && typeof repository.fork === "boolean";
}

async function request_github_repositories(): Promise<Response> {
  try {
    return await fetch(GITHUB_REPOS_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
  } catch (error: unknown) {
    throw new Error(`GitHub 仓库请求异常（${GITHUB_USERNAME}，HTTP unavailable）`, { cause: error });
  }
}

async function parse_response_payload(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (error: unknown) {
    throw new Error(
      `GitHub 仓库响应格式无效（${GITHUB_USERNAME}，HTTP ${response.status}）`,
      { cause: error },
    );
  }
}

/** 获取 lsf1001 的公开仓库，并返回经过过滤、补全和排序的数据。 */
export async function getGithubRepos(): Promise<GithubRepo[]> {
  const response = await request_github_repositories();
  if (!response.ok) {
    throw new Error(`GitHub 仓库请求失败（${GITHUB_USERNAME}，HTTP ${response.status}）`);
  }

  const payload = await parse_response_payload(response);
  if (!Array.isArray(payload) || !payload.every(is_github_api_repo)) {
    throw new Error(`GitHub 仓库响应格式无效（${GITHUB_USERNAME}，HTTP ${response.status}）`);
  }
  return normalizeRepositories(payload);
}
