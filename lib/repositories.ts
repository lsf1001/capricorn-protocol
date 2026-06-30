import type {
  GithubApiRepo,
  GithubRepo,
  RepositoryLanguage,
  RepositorySort,
} from "@/types/github";

export type { RepositoryLanguage, RepositorySort } from "@/types/github";

const FALLBACK_DESCRIPTION = "这个节点还没有写简介，但代码已经开始发光。";
const EXPLICIT_LANGUAGES = new Set<string>([
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Solidity",
  "Go",
  "Rust",
]);

function has_meaningful_description(description: string | null): boolean {
  return description !== null && description.trim().length > 0;
}

function should_keep_repository(repository: GithubApiRepo): boolean {
  return !repository.fork
    || repository.stargazers_count > 0
    || has_meaningful_description(repository.description);
}

function normalize_topics(topics: unknown): string[] {
  if (!Array.isArray(topics)) {
    return [];
  }
  return topics.filter((topic): topic is string => typeof topic === "string");
}

function normalize_repository(repository: GithubApiRepo): GithubRepo {
  return {
    ...repository,
    description: has_meaningful_description(repository.description)
      ? repository.description as string
      : FALLBACK_DESCRIPTION,
    language: repository.language ?? "Unknown",
    topics: normalize_topics(repository.topics),
  };
}

/** 过滤无内容 fork、补齐缺失字段，并按更新时间倒序返回新数组。 */
export function normalizeRepositories(raw_repositories: GithubApiRepo[]): GithubRepo[] {
  return raw_repositories
    .filter(should_keep_repository)
    .map(normalize_repository)
    .sort((left, right) => right.updated_at.localeCompare(left.updated_at));
}

/** 按支持的语言项筛选仓库，并始终返回新数组。 */
export function filterRepositories(
  repositories: GithubRepo[],
  language: RepositoryLanguage,
): GithubRepo[] {
  if (language === "All") {
    return [...repositories];
  }
  if (language === "Other") {
    return repositories.filter((repository) => !EXPLICIT_LANGUAGES.has(repository.language));
  }
  return repositories.filter((repository) => repository.language === language);
}

/** 按更新时间、star 数或名称排序仓库，且不修改输入数组。 */
export function sortRepositories(repositories: GithubRepo[], sort: RepositorySort): GithubRepo[] {
  const sorted_repositories = [...repositories];
  if (sort === "stars") {
    return sorted_repositories.sort((left, right) => right.stargazers_count - left.stargazers_count);
  }
  if (sort === "name") {
    return sorted_repositories.sort((left, right) => left.name.localeCompare(right.name));
  }
  return sorted_repositories.sort((left, right) => right.updated_at.localeCompare(left.updated_at));
}
