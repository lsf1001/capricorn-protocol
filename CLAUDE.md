# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

0xForge · 摩羯契约（Capricorn Protocol）是老白（Laobai）的个人 AI × Blockchain 架构实验室入口站点。一个 Next.js 单页（`app/page.tsx` 一次性拼接所有区块），不接数据库，不需要环境变量，部署到 Vercel 即可。

支持英文 / 简体中文双语切换，默认英文（海外 GitHub 受众优先）。切换按钮在 Navbar 右上方与移动菜单底部。

视觉主题是科技化、工程化的摩羯座星图，不含占星或玄学元素。

## 命令

Node ≥ 20.9。`node_modules` 本地隔离，不走全局。

| 任务 | 命令 |
| --- | --- |
| 本地开发 | `npm install && npm run dev`（端口 3017，固定） |
| 类型检查 | `npm run typecheck`（`tsc --noEmit`） |
| 测试 | `npm test`（vitest，`--passWithNoTests`） |
| 监听模式测试 | `npm run test:watch` |
| 生产构建 | `npm run build`（`next build --webpack`） |
| 单个测试文件 | `npx vitest run tests/<file>`（如 `tests/repositories.test.ts`） |
| 按名过滤用例 | `npx vitest run -t "<用例名片段>"` |

## 目录与职责

- `app/` — App Router 入口。`layout.tsx` 设元数据与 viewport，`page.tsx` 组装所有区块，`globals.css` 引 Tailwind 4 + 两份样式表。
- `components/` — 区块组件。默认是 Server Component；只在需要 hooks/事件时才加 `"use client"`。背景动画、Hero、Navbar、星图筛选器、SectionReveal 都是客户端组件。`I18nProvider` 是支持 client-side 字典查找 + `<html lang>` mutation + localStorage 持久化的根 Provider。
- `lib/` — 纯函数 / 数据访问。`github.ts` 在服务端请求 GitHub API，`repositories.ts` 是 normalize/filter/sort 的纯实现，`utils.ts` 只有 `merge_class_names`；`profile.ts` 集中托管 GitHub 用户名 / 邮箱常量。
- `lib/i18n/` — 双语基础设施。`types.ts` 定义 `Locale`/`Dict`/`HTML_LANG`/点号路径查找 + `translate` fallback 链；`dicts/en.ts` + `zh.ts` 维护两份字符串字典；`contents.ts` 维护本地化数组内容（协议层技术、研究方向）；`server.ts` 提供 SSR 用的纯函数 `t_server(locale, key)`，供 server components / Suspense fallback 用。
- `types/github.ts` — GitHub 原始与规范化仓库结构、筛选与排序枚举。
- `styles/` — `sections.css`（区块布局）、`motion-responsive.css`（响应式 / 减弱动效偏好），与 `app/globals.css` 一起被引入。
- `tests/` — Vitest + Testing Library。`setup.ts` stub `IntersectionObserver` 并把 `HTMLCanvasElement.getContext` 置为 `null`，所以任何依赖 Canvas 的组件都能在 jsdom 环境跑。`tests/helpers/i18n-wrapper.tsx` 给消费 `useI18n` 的组件测试提供 default locale Provider wrapper。

## 关键架构约束

- **栈边界**：Next.js 16 + React 19 + TypeScript + Tailwind 4 + Motion + Lucide React + Canvas 2D / SVG。明确不使用 Three.js、react-three-fiber、大型 UI 库、外部在线字体、外部 i18n 框架（如 next-intl）、外部 cookie/storage utility。所有视觉与翻译都必须用现有依赖做出。
- **样式**：CSS 写在 `styles/*.css` 里通过 `@import` 进入，全局变量集中在 `app/globals.css` 的 `:root`。组件用语义 class（如 `protocol-section`、`project-card`），通过 `merge_class_names` 拼接。
- **动效**：优先用 Motion + `useReducedMotion()`。Canvas 背景（`CapricornProtocolBackground`）也要响应 `prefers-reduced-motion`。
- **GitHub 数据**：唯一的数据源是公开 REST 端点 `https://api.github.com/users/<username>/repos?sort=updated&per_page=100`，在 `lib/github.ts` 通过 `next: { revalidate: 3600 }` 按小时缓存，运行时再做严格类型守卫（`is_github_api_repo`）。仓库会被 `normalizeRepositories` 过滤 fork、补齐默认值后倒序排序，然后由 `RepositoryConstellationSection`（Server Component）拉取后传给客户端的 `RepositoryForestMap`。失败时，星图区块独立降级为错误状态，不会让整页崩溃。
- **页面渲染策略**：`app/page.tsx` 用 `export const revalidate = 3600;`（ISR，每小时回源刷新一次）。星图区块用 `<Suspense fallback={RepositoryLoadingSection()}>` 包裹，加载期间渲染 `RepositorySkeleton`。
- **i18n 策略**：客户端切换 + localStorage 持久化（`capricorn.locale`）。`layout.tsx` 保持静态、不读 cookie，保全 ISR；`<html lang>` 在 Provider mount 后由 client 端 mutate。所有消费 `useI18n` 的组件都加了 `"use client"`；server-side 文案（Suspense fallback、错误态、Robots）固定走英文。新增字符串时在 `lib/i18n/dicts/{en,zh}.ts` 加 key；新增数组型本地化内容（列表 / 技术标签）放 `lib/i18n/contents.ts`。
- **路径别名**：`@/*` 映射到仓库根。tsconfig 与 vitest 配置都识别同一别名。

## 个性化 / 修改入口

集中修改点位（README 也提到，这里仅列文件，避免重复说明）：

- GitHub 用户名 / 联系邮箱：`lib/profile.ts` 的 `GITHUB_USERNAME` 和 `CONTACT_EMAIL`（同时影响 Navbar、Hero、OpenChannel、`app/layout.tsx` 的 author 链接、README；Footer 仅做品牌展示，不引用）。
- 文案：首屏 `components/Hero.tsx`、架构模块 `components/ArchitectureModules.tsx`、协议栈 `components/ProtocolStack.tsx`、关于我 `components/AboutArchitect.tsx`、联系入口 `components/OpenChannel.tsx`。
- 双语字符串字典：`lib/i18n/dicts/en.ts` 与 `lib/i18n/dicts/zh.ts`。新文案请同步两个 locale,字典里漏 key 时会自动回退到英文。
- 双语数组型内容（协议栈技术、研究方向）：`lib/i18n/contents.ts`。
- SEO / 元数据：`app/layout.tsx`（默认英文 static metadata；中文描述在 dict 的 `metadata.*` 预留,等待 server-side locale 流程启用时可一键切换）。

## 安全 / 数据来源约束

- 项目不需要 GitHub Token、密码、私有仓库访问。仅命中公开 REST 端点，并在 Next.js 服务端缓存。
- 不要把任何密钥、token、cookie、密码提交进仓库。
