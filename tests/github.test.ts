import { afterEach, describe, expect, it, vi } from "vitest";

import { getGithubRepos } from "@/lib/github";
import type { GithubApiRepo } from "@/types/github";

const GITHUB_REPOS_URL = "https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100";

function create_raw_repo(overrides: Partial<GithubApiRepo> = {}): GithubApiRepo {
  return {
    id: 1,
    name: "capricorn",
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    topics: [],
    html_url: "https://github.com/lsf1001/capricorn",
    homepage: null,
    fork: false,
    ...overrides,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getGithubRepos", () => {
  it("使用 GitHub JSON 请求公开仓库且不携带 Token，并返回规范化结果", async () => {
    const fetch_mock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([create_raw_repo()]), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetch_mock);

    const result = await getGithubRepos();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ language: "Unknown", topics: [] });
    expect(fetch_mock).toHaveBeenCalledWith(GITHUB_REPOS_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    const request_options = fetch_mock.mock.calls[0][1] as RequestInit;
    expect(request_options.headers).not.toHaveProperty("Authorization");
  });

  it("非 2xx 响应抛出包含用户名和状态码的上下文错误", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));

    await expect(getGithubRepos()).rejects.toThrow("GitHub 仓库请求失败（lsf1001，HTTP 403）");
  });

  it("响应根节点不是数组时抛出包含用户名和状态码的上下文错误", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "unexpected" }), { status: 200 })),
    );

    await expect(getGithubRepos()).rejects.toThrow("GitHub 仓库响应格式无效（lsf1001，HTTP 200）");
  });

  it("网络请求失败时抛出包含用户名的上下文错误", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network unavailable")));

    await expect(getGithubRepos()).rejects.toThrow("GitHub 仓库请求异常（lsf1001，HTTP unavailable）");
  });

  it("响应 JSON 无法解析时抛出包含用户名和状态码的格式错误", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{invalid", { status: 200 })));

    await expect(getGithubRepos()).rejects.toThrow("GitHub 仓库响应格式无效（lsf1001，HTTP 200）");
  });

  it("数组元素结构无效时抛出格式错误且不泄露原始 payload", async () => {
    const sensitive_payload = {
      ...create_raw_repo(),
      id: "invalid-id",
      description: "PRIVATE_PAYLOAD_MARKER",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify([sensitive_payload]), { status: 200 })),
    );

    const rejection = await getGithubRepos().catch((error: unknown) => error);

    expect(rejection).toBeInstanceOf(Error);
    expect((rejection as Error).message).toBe("GitHub 仓库响应格式无效（lsf1001，HTTP 200）");
    expect((rejection as Error).message).not.toContain("PRIVATE_PAYLOAD_MARKER");
  });

  it("允许 topics 缺失并将其规范化为空数组", async () => {
    const { topics: _topics, ...repository_without_topics } = create_raw_repo();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([repository_without_topics]), { status: 200 }),
      ),
    );

    await expect(getGithubRepos()).resolves.toEqual([
      expect.objectContaining({ id: 1, topics: [] }),
    ]);
  });

  it.each([
    ["null", null],
    ["对象", { unexpected: "topic" }],
  ])("topics 为%s时将其规范化为空数组", async (_value_type, topics) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([create_raw_repo({ topics })]), { status: 200 }),
      ),
    );

    await expect(getGithubRepos()).resolves.toEqual([
      expect.objectContaining({ id: 1, topics: [] }),
    ]);
  });
});
