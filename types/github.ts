/** GitHub 公共仓库接口返回的原始字段。 */
export interface GithubApiRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: unknown;
  html_url: string;
  homepage: string | null;
  fork: boolean;
}

/** 页面可直接消费的规范化 GitHub 仓库。 */
export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  html_url: string;
  homepage: string | null;
  fork: boolean;
}

/** 仓库浏览器支持的语言筛选项。 */
export type RepositoryLanguage =
  | "All"
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Java"
  | "Solidity"
  | "Go"
  | "Rust"
  | "Other";

/** 仓库浏览器支持的排序方式。 */
export type RepositorySort = "updated" | "stars" | "name";
