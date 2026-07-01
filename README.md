# 0xForge · 摩羯契约 · Laobai Contracting

> **Capricorn Protocol — Hiring Mode.**
> 老白（Laobai / 令帅锋）—— AI × Blockchain 架构师，7 年企业级落地，可接私活。
> 可签 NDA · 48 小时回复 · 远程优先。

## 这是什么

0xForge 是老白的个人技术协议界面，**目前以接活模式运行**：

- 一份会持续更新的可验证履历。
- 4 类我能接的服务（Agent Harness / RAG / 数据治理 / 端侧 AI）。
- 4 个真实案例（Nexus / Furion / qiqi-voice / 大唐链·已脱敏）。
- GitHub 公开仓库星图（自动按小时刷新）。
- 一份询价邮件模板（点击按钮即可发需求）。

它不是简历模板，而是一套可运行、可验证、可持续扩展的个人技术协议界面。

## 在线访问

- 生产站点：<https://capricorn-protocol.vercel.app>
- GitHub：<https://github.com/lsf1001>

## 4 类服务（可发需求）

| 服务 | 参考案例 | 关键数字 |
| --- | --- | --- |
| AI Agent Harness / 多智能体 | Nexus（开源） | 421 单测 · 176MB 一键安装包 |
| 多模态 RAG 知识库 | 某大型集团（已脱敏） | 召回 90%+ · 问答 30→85% · <2s |
| 数据治理 + ML 建模 | Furion（开源） | 华为 MAPE 4.23% · 33→12.3 万优质训练数据 |
| AI 私有化部署 / 端侧 AI | qiqi-voice（开源） | 30 语种 · 4-bit 量化 · 成本降低约 70% |

## 技术栈

- Next.js 16.2.9 + App Router
- React 19、TypeScript、Tailwind CSS 4
- Motion、Lucide React
- Canvas 2D、SVG、CSS 动效
- Vitest、Testing Library

项目不使用 Three.js、react-three-fiber、大型 UI 框架或外部在线字体；所有视觉与翻译都用现有依赖做出。

## 本地运行

请使用 Node.js ≥ 20.9。依赖由本地 `node_modules` 隔离，不走全局。

```bash
npm install
npm run dev
```

打开 [http://localhost:3017](http://localhost:3017)（端口在 `package.json` 固定为 3017）。

```bash
npm test          # 单元测试（vitest）
npm run typecheck # tsc --noEmit
npm run build     # 生产构建
```

## 修改入口（一个文件联动全局）

| 改动 | 文件 |
| --- | --- |
| GitHub 用户名 / 联系邮箱 / 站点 URL | `lib/profile.ts` |
| 首屏中英文案 | `components/Hero.tsx` + `lib/i18n/dicts/{en,zh}.ts` |
| 4 类服务卡片 | `components/ServicesSection.tsx` + `lib/i18n/dicts/{en,zh}.ts` (`services.*`) |
| 案例 | `components/CaseStudies.tsx` + `lib/i18n/dicts/{en,zh}.ts` (`cases.*`) |
| 关于我（含 7 年时间线） | `components/AboutArchitect.tsx` + `lib/i18n/contents.ts` (`ABOUT_TIMELINE`) |
| 询价模板 | `components/OpenChannel.tsx` + `lib/i18n/dicts/{en,zh}.ts` (`open.*`) |
| SEO 元数据 / JSON-LD | `app/layout.tsx` |

字典缺 key 时自动回退到英文；新增数组类本地化内容（时间线、研究方向）请放到 `lib/i18n/contents.ts`。

## 部署

- 生产通过 GitHub Actions 自动部署到 Vercel（`.github/workflows/deploy.yml`）。
- 推送到 `main` 即触发；workflow 拉取代码后用 Vercel CLI 执行 `vercel deploy --prod`。
- 不需要任何数据库 / 环境变量。

## 安全

- 不需要 GitHub Token、不需要密码、不访问私有仓库。
- 只用公开 REST 端点，按小时 ISR 缓存。
- **绝不要把任何密钥、Token、Cookie、密码提交到仓库。**

## 品牌与视觉主题

- 品牌：`0xForge`（英文）+ `摩羯契约`（中文）
- 视觉主题：科技化、工程化的摩羯座星图
- 不含占星、玄学、运势元素