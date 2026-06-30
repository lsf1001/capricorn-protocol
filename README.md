# 0xForge · 摩羯契约

0xForge 是老白的 AI × Blockchain 架构实验室入口，
展示可信智能系统、AI Agent、链上数据、智能合约与工程化项目。
它不是简历模板，而是一套可运行、可验证、可持续扩展的个人技术协议界面。

## 品牌与视觉主题

- 品牌：`0xForge`
- 中文主题：摩羯契约
- 英文主题：Capricorn Protocol
- 定位：区块链架构师 × AI 架构师

本项目融合了 Capricorn 摩羯座星图元素，但以科技化、抽象化、工程化方式呈现，
不包含占星、玄学或运势内容。摩羯代表结构、自律和长期主义；
契约代表智能合约、可信规则与可验证系统。

## 技术栈

- Next.js 16.2.9 与 App Router
- React 19、TypeScript、Tailwind CSS 4
- Motion、Lucide React
- Canvas 2D、SVG、CSS 动效
- Vitest、Testing Library

项目不使用 Three.js、react-three-fiber、大型 UI 框架或外部在线字体。

## 本地运行

请使用 Node.js 20.9 或更高版本。项目依赖由本地 `node_modules` 隔离，不使用全局依赖。

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

运行测试、类型检查和生产构建：

```bash
npm test
npm run typecheck
npm run build
```

## 修改 GitHub 用户名

默认读取 `lsf1001` 的公开仓库。修改时改一处即可：

```ts
// lib/profile.ts
export const GITHUB_USERNAME = "lsf1001";
```

这个常量会被 `lib/github.ts` 用来拉取仓库列表，同时被 Navbar / Hero / OpenChannel / `app/layout.tsx` 用来构造外链。公开 API 地址格式为：

```text
https://api.github.com/users/<username>/repos?sort=updated&per_page=100
```

## 修改联系邮箱

公开的联系邮箱在 `lib/profile.ts` 的 `CONTACT_EMAIL` 中维护，会被 OpenChannel 区块自动引用。务必只填写准备公开的工作邮箱。

## 修改个人文案

首屏、架构模块、协议栈、关于我、联系方式等所有可见副本都走双语字典。修改入口在：

- 双语字符串字典：`lib/i18n/dicts/en.ts` 与 `lib/i18n/dicts/zh.ts`
- 双语数组型内容（协议栈技术、研究方向）：`lib/i18n/contents.ts`
- UI 引用 key 的位置：`components/Hero.tsx`、`components/ArchitectureModules.tsx`、`components/ProtocolStack.tsx`、`components/AboutArchitect.tsx`、`components/OpenChannel.tsx`、`components/Navbar.tsx`、`components/Footer.tsx`、`components/RepositoryForestMap.tsx`、`components/ProjectCard.tsx`

新文案请同步 en + zh 两个 locale;字典里漏 key 时会自动回退到英文。

语言切换按钮在 Navbar 右上方与移动菜单底部，由 `LocalStorage` 持久化用户偏好（key：`capricorn.locale`）。首次访问默认英文。

SEO 默认英文 metadata；中文描述已预留于字典 `metadata.*`，未来启用 server-side locale 流程时可一键切换。

## 推送到 GitHub

先在 GitHub 创建空仓库，再执行：

```bash
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

如果已经配置 `origin`，只需执行 `git push`。

## 免费部署到 Vercel

1. 将项目推送到 GitHub。
2. 登录 Vercel，选择 **Add New Project**。
3. 导入刚才的 GitHub 仓库。
4. Framework Preset 保持 Next.js，构建命令保持 `npm run build`。
5. 点击 Deploy。

项目不需要数据库和环境变量，可直接使用 Vercel 免费套餐部署。

## 绑定自定义域名

部署完成后进入 Vercel 项目的 **Settings > Domains**：

1. 输入自定义域名并添加。
2. 按 Vercel 提示在域名服务商配置 A、CNAME 或 Nameserver 记录。
3. 等待 DNS 生效，Vercel 会自动签发 HTTPS 证书。
4. 将首选域名设置为 Primary Domain。

## 安全说明

- 本项目不需要 GitHub Token。
- 本项目不需要 GitHub 密码。
- 本项目只读取公开仓库，不访问 private repositories。
- 不要将任何密钥、Token、Cookie、密码或其他敏感信息提交到代码仓库。

GitHub API 请求仅使用公开端点，并在 Next.js 服务端按小时缓存。
