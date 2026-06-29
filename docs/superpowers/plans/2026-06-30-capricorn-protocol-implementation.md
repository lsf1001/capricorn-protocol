# 0xForge 摩羯契约网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建并验证一个视觉冲击优先、读取 GitHub 公开仓库、可免费部署到 Vercel 的 0xForge 单页技术网站。

**Architecture:** Next.js App Router 提供服务端页面壳层和缓存后的 GitHub 数据；浏览器能力被隔离在小型客户端组件中。仓库转换、筛选和排序使用纯函数，Canvas/SVG/CSS 分别承担背景、核心装置和界面表现。

**Tech Stack:** Next.js 最新稳定版、React、TypeScript、Tailwind CSS、motion/react、lucide-react、Vitest、Testing Library、Canvas 2D、SVG

---

## 文件结构

- `app/layout.tsx`：Metadata 与根布局。
- `app/page.tsx`：单页模块编排与仓库 Suspense 边界。
- `app/globals.css`：设计变量、布局、视觉状态、动画和响应式规则。
- `components/`：PRD 指定组件以及 SectionHeading、SectionReveal、RepositorySkeleton、RepositoryConstellationSection。
- `lib/github.ts`：GitHub 请求和规范化。
- `lib/repositories.ts`：筛选和排序纯函数。
- `lib/utils.ts`：类名合并和日期格式化。
- `types/github.ts`：原始与规范化仓库类型。
- `tests/`：数据层和组件行为测试。

### Task 1: 初始化 Next.js 工程与测试基础设施

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `.gitignore`

- [ ] **Step 1: 获取并锁定当前稳定依赖**

运行：

```bash
npm view next version
npm view react version
npm view tailwindcss version
npm view motion version
```

将返回的稳定版本写入 `package.json`，生产依赖只包含 `next`、`react`、`react-dom`、`motion` 和 `lucide-react`；测试依赖包含 Vitest、jsdom、Testing Library、TypeScript、Tailwind/PostCSS 和类型包。

- [ ] **Step 2: 写入脚本和严格 TypeScript 配置**

`package.json` 脚本必须为：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

`vitest.config.ts` 使用 jsdom、`tests/setup.ts` 和 `@/` 路径别名；setup 引入 `@testing-library/jest-dom/vitest` 并清理组件。

- [ ] **Step 3: 安装并验证工具链**

运行：

```bash
npm install
npm run typecheck
npm test
```

预期：依赖安装成功；TypeScript 无错误；Vitest 允许尚无测试文件并正常退出，或在首个测试加入后执行。

- [ ] **Step 4: 提交基础设施**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts tests/setup.ts .gitignore
git commit -m "chore: initialize next application"
```

### Task 2: GitHub 类型、规范化、筛选与排序

**Files:**
- Create: `types/github.ts`
- Create: `lib/repositories.ts`
- Create: `tests/repositories.test.ts`

- [ ] **Step 1: 先写纯函数失败测试**

测试必须直接覆盖以下 API：

```ts
import { describe, expect, it } from "vitest";
import { filterRepositories, normalizeRepositories, sortRepositories } from "@/lib/repositories";

describe("normalizeRepositories", () => {
  it("补齐缺失描述和语言并按更新时间倒序", () => {
    const result = normalizeRepositories([
      createRawRepo({ id: 1, description: null, language: null, updated_at: "2026-01-01T00:00:00Z" }),
      createRawRepo({ id: 2, updated_at: "2026-02-01T00:00:00Z" }),
    ]);
    expect(result.map((repo) => repo.id)).toEqual([2, 1]);
    expect(result[1].description).toBe("这个节点还没有写简介，但代码已经开始发光。");
    expect(result[1].language).toBe("Unknown");
  });

  it("过滤无内容 fork 并保留有 star 或描述的 fork", () => {
    const result = normalizeRepositories([
      createRawRepo({ id: 1, fork: true, description: null, stargazers_count: 0 }),
      createRawRepo({ id: 2, fork: true, description: "useful" }),
      createRawRepo({ id: 3, fork: true, stargazers_count: 1 }),
    ]);
    expect(result.map((repo) => repo.id)).toEqual([2, 3]);
  });
});
```

继续覆盖 `TypeScript`、`Other`、全部筛选，以及 `updated`、`stars`、`name` 排序。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/repositories.test.ts
```

预期：因为模块尚不存在而失败。

- [ ] **Step 3: 实现稳定类型和纯函数**

导出接口与联合类型：

```ts
export type RepositoryLanguage =
  | "All" | "TypeScript" | "JavaScript" | "Python" | "Java"
  | "Solidity" | "Go" | "Rust" | "Other";
export type RepositorySort = "updated" | "stars" | "name";

export function normalizeRepositories(rawRepositories: GithubApiRepo[]): GithubRepo[];
export function filterRepositories(repositories: GithubRepo[], language: RepositoryLanguage): GithubRepo[];
export function sortRepositories(repositories: GithubRepo[], sort: RepositorySort): GithubRepo[];
```

函数不得修改输入数组。Other 表示不属于七种显式技术语言的所有仓库。

- [ ] **Step 4: 验证 GREEN 并提交**

```bash
npm test -- tests/repositories.test.ts
git add types/github.ts lib/repositories.ts tests/repositories.test.ts
git commit -m "feat: add repository data transforms"
```

预期：全部纯函数测试通过。

### Task 3: GitHub 公共 API 服务

**Files:**
- Create: `lib/github.ts`
- Create: `tests/github.test.ts`

- [ ] **Step 1: 写请求成功与异常路径测试**

```ts
describe("getGithubRepos", () => {
  it("只请求 lsf1001 的公开仓库并返回规范化结果", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify([createRawRepo()]), {
      status: 200,
    })));
    await expect(getGithubRepos()).resolves.toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100",
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it("非成功响应抛出包含状态码的上下文错误", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
    await expect(getGithubRepos()).rejects.toThrow("GitHub 仓库请求失败（lsf1001，HTTP 403）");
  });
});
```

另写响应根节点不是数组的异常测试。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/github.test.ts
```

预期：`getGithubRepos` 尚不存在。

- [ ] **Step 3: 实现服务**

```ts
export async function getGithubRepos(): Promise<GithubRepo[]> {
  const response = await fetch(GITHUB_REPOS_URL, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`GitHub 仓库请求失败（${GITHUB_USERNAME}，HTTP ${response.status}）`);
  }
  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error(`GitHub 仓库响应格式无效（${GITHUB_USERNAME}）`);
  }
  return normalizeRepositories(payload as GithubApiRepo[]);
}
```

- [ ] **Step 4: 验证并提交**

```bash
npm test -- tests/github.test.ts
git add lib/github.ts tests/github.test.ts
git commit -m "feat: fetch public github repositories"
```

### Task 4: 公共视觉原语与静态内容模块

**Files:**
- Create: `lib/utils.ts`
- Create: `components/ForgeSigil.tsx`
- Create: `components/ProtocolBadge.tsx`
- Create: `components/SectionHeading.tsx`
- Create: `components/SectionReveal.tsx`
- Create: `components/ArchitectureModules.tsx`
- Create: `components/ProtocolStack.tsx`
- Create: `components/AboutArchitect.tsx`
- Create: `components/OpenChannel.tsx`
- Create: `components/Footer.tsx`
- Create: `tests/static-sections.test.tsx`

- [ ] **Step 1: 写静态模块失败测试**

测试渲染各模块并断言：四个架构模块标题与状态齐全；AI、Chain、Engineering 三层存在；关于文案与契约 hash 存在；GitHub 和邮箱是可点击链接；页脚版权为 2026。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/static-sections.test.tsx
```

预期：组件模块不存在。

- [ ] **Step 3: 实现公共原语和模块**

所有组件 props 必须显式标注类型。`SectionHeading` 接收：

```ts
interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}
```

静态模块内容严格使用 PRD 文案；图标从 lucide-react 按需导入；装饰 SVG 使用 `aria-hidden="true"`。

- [ ] **Step 4: 验证并提交**

```bash
npm test -- tests/static-sections.test.tsx
git add lib/utils.ts components tests/static-sections.test.tsx
git commit -m "feat: add protocol content sections"
```

### Task 5: Navbar、Hero 与核心品牌装置

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Hero.tsx`
- Create: `components/CapricornCore.tsx`
- Create: `tests/navigation-hero.test.tsx`

- [ ] **Step 1: 写导航和 Hero 失败测试**

覆盖品牌、主标题、主题行、三个 CTA、GitHub 外链、移动菜单的 `aria-expanded`、菜单展开和 Escape 关闭。mock `matchMedia` 和 `IntersectionObserver`，不测试 motion 内部实现。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/navigation-hero.test.tsx
```

预期：组件尚不存在。

- [ ] **Step 3: 实现交互**

Navbar 使用滚动监听和 IntersectionObserver 更新活动锚点；卸载时清理监听。Hero 启动序列在 2 秒内完成；减少动态效果时直接渲染全部状态。CapricornCore 使用单个 SVG 表现双向轨道、模型核心、契约节点和抽象双角。

- [ ] **Step 4: 验证并提交**

```bash
npm test -- tests/navigation-hero.test.tsx
git add components/Navbar.tsx components/Hero.tsx components/CapricornCore.tsx tests/navigation-hero.test.tsx
git commit -m "feat: add navigation and protocol hero"
```

### Task 6: 仓库星图界面与异步状态

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `components/RepositoryConstellation.tsx`
- Create: `components/RepositoryConstellationSection.tsx`
- Create: `components/RepositorySkeleton.tsx`
- Create: `tests/repository-constellation.test.tsx`

- [ ] **Step 1: 写仓库界面失败测试**

使用三条固定仓库数据，验证默认更新时间顺序、Python 筛选、Stars 排序、空筛选结果、topics 条件渲染和 GitHub 链接。单独验证 Skeleton 至少包含六张带 `aria-hidden` 的骨架卡。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/repository-constellation.test.tsx
```

预期：仓库组件不存在。

- [ ] **Step 3: 实现仓库界面**

`RepositoryConstellation` 只保存 `language` 和 `sort` 两个状态，通过 `useMemo` 组合纯函数。项目卡显示名称、描述、语言、stars、forks、更新时间、topics 和外链；装饰 hash 由仓库 id 确定性生成，避免 hydration 差异。

`RepositoryConstellationSection` 捕获服务异常并返回指定失联卡，不记录敏感数据。

- [ ] **Step 4: 验证并提交**

```bash
npm test -- tests/repository-constellation.test.tsx
git add components/ProjectCard.tsx components/RepositoryConstellation.tsx components/RepositoryConstellationSection.tsx components/RepositorySkeleton.tsx tests/repository-constellation.test.tsx
git commit -m "feat: add repository constellation"
```

### Task 7: Canvas 深空协议背景

**Files:**
- Create: `components/CapricornProtocolBackground.tsx`
- Create: `tests/protocol-background.test.tsx`

- [ ] **Step 1: 写生命周期失败测试**

mock Canvas 2D context、`requestAnimationFrame`、`cancelAnimationFrame`、`matchMedia` 和 ResizeObserver。验证组件挂载时请求动画帧，卸载时取消同一帧；减少动态效果时不启动连续循环。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/protocol-background.test.tsx
```

- [ ] **Step 3: 实现 Canvas 管线**

把节点生成、固定摩羯坐标、连线绘制、数据包、Hash Drift 和指针光晕拆成小函数。DPR 上限 2；按宽度使用三档粒子数量；所有浏览器 API 位于 `useEffect`；清理 resize、pointermove、media query 和动画帧。

- [ ] **Step 4: 验证并提交**

```bash
npm test -- tests/protocol-background.test.tsx
git add components/CapricornProtocolBackground.tsx tests/protocol-background.test.tsx
git commit -m "feat: add capricorn protocol background"
```

### Task 8: 全局样式、页面集成与 Metadata

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `tests/page-content.test.tsx`

- [ ] **Step 1: 写页面内容失败测试**

mock仓库服务后渲染 Page，断言五个 section id、协议编号、Hero 与页脚均存在；渲染 RootLayout metadata 的静态导出并验证标题和 description。

- [ ] **Step 2: 运行测试并确认 RED**

```bash
npm test -- tests/page-content.test.tsx
```

- [ ] **Step 3: 实现页面和完整设计系统**

`globals.css` 定义 PRD 全部颜色变量、系统字体、焦点样式、协议网格、卡片、按钮、扫描线、核心轨道、响应式断点和 `prefers-reduced-motion` 覆盖。`page.tsx` 使用 Suspense + RepositorySkeleton 组合仓库服务端区块，其他模块按 PRD 顺序排列。

- [ ] **Step 4: 验证类型、测试和构建**

```bash
npm run typecheck
npm test
npm run build
```

预期：TypeScript、全部测试和生产构建通过。

- [ ] **Step 5: 提交集成**

```bash
git add app tests/page-content.test.tsx
git commit -m "feat: integrate capricorn protocol interface"
```

### Task 9: README 与部署文档

**Files:**
- Create: `README.md`

- [ ] **Step 1: 写完整 README**

README 必须覆盖项目和品牌、视觉主题、技术栈、本地运行、GitHub 用户名替换、个人文案修改、Vercel 导入部署、自定义域名以及四条安全声明。明确摩羯元素不包含占星、玄学或运势内容。

- [ ] **Step 2: 验证命令和敏感信息**

```bash
rg -n "npm install|npm run dev|npm run build|Vercel|自定义域名|GitHub Token|GitHub 密码|公开仓库|敏感信息" README.md
rg -n "ghp_|github_pat_|password|secret|token=" --glob '!package-lock.json' .
```

预期：README 关键内容全部命中；敏感模式扫描无真实凭证。

- [ ] **Step 3: 提交文档**

```bash
git add README.md
git commit -m "docs: add setup and deployment guide"
```

### Task 10: 浏览器验收与最终质量门禁

**Files:**
- Modify only when verification finds a concrete defect.

- [ ] **Step 1: 运行自动化门禁**

```bash
npm run typecheck
npm test
npm run build
```

预期：全部退出码为 0，无 React 警告和未处理异常。

- [ ] **Step 2: 启动生产或开发服务器并浏览器验收**

```bash
npm run dev
```

在桌面 1440px、平板 768px 和手机 390px 检查首屏、菜单、锚点、仓库筛选排序、外链、无横向溢出、减少动态效果和 API 失败降级。

- [ ] **Step 3: 检查工程约束**

```bash
find app components lib types tests -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) -print0 | xargs -0 wc -l
git status --short
```

预期：单文件不超过 800 行；工作树只包含本计划产生且已审查的修改。

- [ ] **Step 4: 最终提交**

仅在浏览器验收产生修复时提交：

```bash
git add app components lib types tests README.md
git commit -m "fix: polish responsive protocol interface"
```

