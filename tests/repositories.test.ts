import { describe, expect, it } from "vitest";

import {
  filterRepositories,
  normalizeRepositories,
  sortRepositories,
} from "@/lib/repositories";
import type { GithubApiRepo, GithubRepo, RepositoryLanguage } from "@/types/github";

const FALLBACK_DESCRIPTION = "这个节点还没有写简介，但代码已经开始发光。";

function create_raw_repo(overrides: Partial<GithubApiRepo> = {}): GithubApiRepo {
  return {
    id: 1,
    name: "capricorn",
    description: "A repository",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-01T00:00:00Z",
    topics: ["nextjs"],
    html_url: "https://github.com/lsf1001/capricorn",
    homepage: null,
    fork: false,
    ...overrides,
  };
}

function create_repo(overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    ...create_raw_repo(),
    description: "A repository",
    language: "TypeScript",
    topics: ["nextjs"],
    ...overrides,
  };
}

describe("normalizeRepositories", () => {
  it("补齐缺失描述和语言并按更新时间倒序", () => {
    const raw_repositories = [
      create_raw_repo({
        id: 1,
        description: null,
        language: null,
        updated_at: "2026-01-01T00:00:00Z",
      }),
      create_raw_repo({ id: 2, updated_at: "2026-02-01T00:00:00Z" }),
    ];

    const result = normalizeRepositories(raw_repositories);

    expect(result.map((repository) => repository.id)).toEqual([2, 1]);
    expect(result[1].description).toBe(FALLBACK_DESCRIPTION);
    expect(result[1].language).toBe("Unknown");
    expect(raw_repositories.map((repository) => repository.id)).toEqual([1, 2]);
  });

  it("过滤无内容且零 star 的 fork，保留有描述或 star 的 fork", () => {
    const result = normalizeRepositories([
      create_raw_repo({ id: 1, fork: true, description: null, stargazers_count: 0 }),
      create_raw_repo({ id: 2, fork: true, description: "useful" }),
      create_raw_repo({ id: 3, fork: true, description: null, stargazers_count: 1 }),
      create_raw_repo({ id: 4, fork: false, description: null, stargazers_count: 0 }),
    ]);

    expect(result.map((repository) => repository.id)).toEqual([2, 3, 4]);
  });

  it("将非数组 topics 归一化为空数组，并移除数组中的非字符串成员", () => {
    const result = normalizeRepositories([
      create_raw_repo({ id: 1, topics: null }),
      create_raw_repo({ id: 2, topics: ["nextjs", 42, "web3"] }),
    ]);

    expect(result.find((repository) => repository.id === 1)?.topics).toEqual([]);
    expect(result.find((repository) => repository.id === 2)?.topics).toEqual(["nextjs", "web3"]);
  });
});

describe("filterRepositories", () => {
  const repositories = [
    create_repo({ id: 1, language: "TypeScript" }),
    create_repo({ id: 2, language: "JavaScript" }),
    create_repo({ id: 3, language: "Python" }),
    create_repo({ id: 4, language: "Java" }),
    create_repo({ id: 5, language: "Solidity" }),
    create_repo({ id: 6, language: "Go" }),
    create_repo({ id: 7, language: "Rust" }),
    create_repo({ id: 8, language: "C++" }),
    create_repo({ id: 9, language: "Unknown" }),
  ];

  it.each<RepositoryLanguage>([
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Solidity",
    "Go",
    "Rust",
  ])("筛选 %s 仓库", (language) => {
    expect(filterRepositories(repositories, language).map((repository) => repository.language)).toEqual([language]);
  });

  it("All 返回全部仓库的新数组", () => {
    const result = filterRepositories(repositories, "All");

    expect(result).toEqual(repositories);
    expect(result).not.toBe(repositories);
  });

  it("Other 返回不属于七种显式技术语言的仓库", () => {
    expect(filterRepositories(repositories, "Other").map((repository) => repository.id)).toEqual([8, 9]);
  });
});

describe("sortRepositories", () => {
  const repositories = [
    create_repo({ id: 1, name: "zeta", stargazers_count: 2, updated_at: "2026-01-01T00:00:00Z" }),
    create_repo({ id: 2, name: "Alpha", stargazers_count: 9, updated_at: "2026-03-01T00:00:00Z" }),
    create_repo({ id: 3, name: "beta", stargazers_count: 4, updated_at: "2026-02-01T00:00:00Z" }),
  ];

  it.each([
    ["updated", [2, 3, 1]],
    ["stars", [2, 3, 1]],
    ["name", [2, 3, 1]],
  ] as const)("按 %s 排序且不修改输入", (sort, expected_ids) => {
    const original_ids = repositories.map((repository) => repository.id);

    const result = sortRepositories(repositories, sort);

    expect(result.map((repository) => repository.id)).toEqual(expected_ids);
    expect(repositories.map((repository) => repository.id)).toEqual(original_ids);
    expect(result).not.toBe(repositories);
  });
});
