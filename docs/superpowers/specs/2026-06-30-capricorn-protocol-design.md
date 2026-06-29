# 0xForge 摩羯契约网站设计规格

## 1. 项目目标

从零构建一个可免费部署到 Vercel 的个人技术网站。网站以“0xForge / 摩羯契约 / Capricorn Protocol”为品牌核心，定位为 AI × Blockchain Architecture Lab，而不是简历页、普通作品集、NFT 官网或星座主题站。

首要成功标准是首屏视觉冲击。冲击力来自品牌字标、非对称构图、协议核心装置和深空信息层级，不依赖大面积霓虹、重型 3D 或牺牲可读性的光效。

## 2. 已确认的设计方向

采用 A 方案“协议锻炉”：

- 左侧以超大 `0xForge` 字标和摩羯契约主题形成编辑式视觉锚点。
- 右侧以 SVG/CSS 实现 Capricorn Core，表现可信智能系统核心。
- 深色协议网格与 Canvas 节点网络构成低功耗运行的空间背景。
- 青色表示数据流，紫蓝表示 AI 模型核心，金色表示契约印记。
- 页面模块采用协议编号、窄字距等宽标签和稳定的系统边界。

## 3. 范围

### 3.1 包含

- 固定导航栏和移动端菜单。
- Hero、架构模块、项目星图、协议栈、关于我、开放连接和页脚。
- Canvas 2D 深空协议背景。
- SVG/CSS Capricorn Core 和 ForgeSigil。
- GitHub 公开仓库读取、规范化、筛选、排序、骨架屏和错误状态。
- 响应式、键盘可访问性和减少动态效果偏好支持。
- SEO Metadata、README、本地构建和 Vercel 部署说明。
- 单元测试与关键组件交互测试。

### 3.2 不包含

- GitHub 私有仓库、密码、Token 或 Cookie。
- 数据库、登录系统、后台管理、表单存储或邮件发送服务。
- Three.js、react-three-fiber、大型 UI 框架或复杂在线字体。
- 占星、运势、NFT 头像、真实动物插图或高频游戏化动效。

## 4. 技术架构

### 4.1 应用壳层

使用 Next.js 最新稳定版、App Router、TypeScript 和 Tailwind CSS。`app/layout.tsx` 负责 Metadata、语言、全局样式和页面壳层；`app/page.tsx` 只负责编排页面模块，不承载组件内部逻辑。

静态内容优先使用服务端组件。只有需要浏览器 API、状态或动画的组件才声明为 client component，避免整页客户端化和 hydration 错误。

### 4.2 客户端边界

以下职责独立为客户端组件：

- Canvas 初始化、视口适配、指针响应和动画帧清理。
- Navbar 滚动状态、活动锚点和移动菜单。
- Hero 启动序列、SVG 入场和低频交互动效。
- 仓库筛选、排序和卡片交互。
- 进入视口 reveal 和扫描线效果。

其余文案和结构保持服务端渲染。

### 4.3 GitHub 数据流

`lib/github.ts` 的 `getGithubRepos()` 请求：

`https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100`

请求不包含认证信息，使用 Next.js fetch 缓存并按小时重新验证。服务端完成以下处理：

1. 校验 HTTP 状态和响应结构。
2. 保留非 fork 仓库；fork 仓库仅在 stars 大于 0 或 description 非空时保留。
3. description 为空时填入“这个节点还没有写简介，但代码已经开始发光。”。
4. language 为空时填入 `Unknown`。
5. topics 非数组时归一化为空数组。
6. 按 `updated_at` 倒序返回。

页面使用 Suspense 骨架屏承接服务端等待。成功数据传给客户端仓库浏览器完成筛选和排序；失败时只替换项目星图区域，其他模块继续渲染。

## 5. 文件与职责

PRD 指定文件全部保留，并按单一职责补充少量辅助模块：

- `app/layout.tsx`：Metadata、根布局。
- `app/page.tsx`：单页模块编排和仓库异步边界。
- `app/globals.css`：设计变量、基础样式、动画与响应式规则。
- `components/Navbar.tsx`：桌面/移动导航、活动状态和滚动行为。
- `components/Hero.tsx`：首屏文案、按钮、启动序列与状态条。
- `components/CapricornProtocolBackground.tsx`：Canvas 深空协议网络。
- `components/CapricornCore.tsx`：Hero 右侧核心装置。
- `components/ForgeSigil.tsx`：可缩放品牌 SVG。
- `components/ProtocolBadge.tsx`：统一状态标签。
- `components/ArchitectureModules.tsx`：四个架构模块。
- `components/RepositoryConstellation.tsx`：筛选、排序与项目阵列。
- `components/RepositoryConstellationSection.tsx`：服务端仓库获取和错误边界适配。
- `components/RepositorySkeleton.tsx`：项目星图加载骨架。
- `components/ProjectCard.tsx`：单个仓库节点。
- `components/ProtocolStack.tsx`：三层协议栈。
- `components/AboutArchitect.tsx`：架构师协议铭牌。
- `components/OpenChannel.tsx`：连接终端面板。
- `components/Footer.tsx`：版权与契约 hash 装饰。
- `components/SectionHeading.tsx`：统一协议编号和中英文标题。
- `components/SectionReveal.tsx`：统一进入视口上线动效。
- `lib/github.ts`：GitHub 请求和数据规范化。
- `lib/repositories.ts`：仓库筛选与排序纯函数。
- `lib/utils.ts`：类名合并、日期等小型通用函数。
- `types/github.ts`：GitHub 原始与规范化类型。
- `tests/`：纯函数和组件行为测试。

任何单文件原则上不超过 800 行，单函数原则上不超过 80 行，单行不超过 120 个字符。

## 6. 视觉系统

### 6.1 色彩

在 `globals.css` 定义 PRD 给出的全部 CSS variables。背景以 `#02030a` 和 `#030712` 为主；面板使用带蓝灰边界的半透明深色；正文使用高对比灰白。

- 青色仅用于数据流、活动节点和主要操作。
- 紫蓝仅用于 AI Core、轨道和局部模型光晕。
- 金色仅用于摩羯主星、契约印记和少量主题文字。
- 红色仅作为极少量警示装饰，不承担主要状态。

### 6.2 字体

全站使用系统字体，不发起外部字体请求。英文协议标签使用系统等宽字体、大写和宽字距；中文正文使用系统无衬线字体。`0xForge` 使用 700–800 字重、紧凑字距和低强度渐变文字。

### 6.3 空间与边界

内容最大宽度保持稳定，桌面端留出明显负空间。面板使用细线边界、克制圆角和极轻阴影，不采用漂浮大圆角卡片或多层玻璃拟态。Section 之间以协议编号、扫描线和背景节点密度区分。

## 7. 关键视觉组件

### 7.1 CapricornProtocolBackground

单个固定 Canvas 覆盖页面背景。所有 `window`、`document`、Canvas 和 media query 访问均在 `useEffect` 中进行。初始化时根据视口生成低透明度粒子、网络节点、固定摩羯折线节点和 Hash Drift 字符。

每帧只进行一次清屏和分层绘制。`devicePixelRatio` 上限为 2。桌面、平板、手机分别降低粒子与连接数量；手机关闭 Hash Drift 和指针光晕。`prefers-reduced-motion` 下绘制稳定静态帧，不启动连续动画。卸载时移除监听并调用 `cancelAnimationFrame`。

### 7.2 CapricornCore

使用 SVG 建立中央模型核心、双向轨道、环形链节点、抽象山羊角线框、金色契约点和装饰 hash。外环与内环低速反向旋转，主节点呼吸，数据段沿有限路径移动。hover 只增加少量亮度，不缩放或高频追随。

### 7.3 ForgeSigil

使用几何 SVG 融合 `0x`、双角、节点和熔炉线条。首次入场使用一次性 stroke-dash 点亮；完成后保持静态微光。Navbar hover 只发生极小旋转和亮度变化。

## 8. 页面模块

### 8.1 Navbar

顶部固定，初始透明度较低，滚动后增强深色毛玻璃背景。活动锚点由 IntersectionObserver 更新。移动端菜单使用暗色协议面板，支持 Escape 关闭和键盘焦点。锚点点击平滑滚动；减少动态效果时直接跳转。目标 section 接收一次性扫描线动画。

### 8.2 Hero

桌面端左文右图，移动端上下排列。左侧依次呈现初始化状态、超大品牌、主题行、定位、描述、状态标签和三个操作按钮；右侧是 Capricorn Core。启动终端在 2 秒内完成，减少动态效果时直接显示终态。桌面端显示状态条，手机端隐藏。

### 8.3 Architecture Modules

四张模块卡采用严谨网格和极简 lucide 图标。卡片上线时顺序淡入，hover 边界微亮并上移不超过 4px。

### 8.4 Repository Constellation

仓库节点支持语言筛选和最近更新、Stars、名称三种排序。桌面三列、平板两列、手机单列。卡片 hover 扫描线只运行一次，hash 装饰明确为视觉伪 hash，不与真实仓库数据混淆。

### 8.5 Protocol Stack

AI、Chain、Engineering 三层以细线和连接节点组织。标签保持低饱和深色，hover 激活对应色，不做彩色糖果标签。

### 8.6 About、Open Channel、Footer

About 使用黑色协议铭牌和低透明度契约 hash。Open Channel 使用轻量终端语法显示 GitHub、占位邮箱和私有微信状态，其中 GitHub 与邮箱可点击。Footer 保持单线分隔和简洁版权信息。

## 9. 动效规则

- Hero 入场、核心浮现和启动序列总时长不超过 2 秒。
- Section reveal 时长为 0.4–0.7 秒，无弹跳和夸张缩放。
- hover 位移不超过 4px。
- Canvas 数据流和轨道保持低速，页面不存在高频闪烁。
- 鼠标光晕通过 requestAnimationFrame 节流，手机关闭。
- `prefers-reduced-motion` 关闭打字机、连续旋转、漂移和复杂 reveal。

## 10. 异常与边界

- GitHub 请求网络失败、非 2xx 或 JSON 不合法时，抛出包含用户名和状态码的上下文错误，但不记录任何敏感信息。
- 项目星图捕获错误并显示“GitHub 星图暂时失联，但实验室还在运转。”。
- 空仓库返回明确空状态，不使用虚构数据填充。
- Canvas 不可用时背景退化为 CSS 深空网格，正文和交互不受影响。
- 外链统一使用安全的 `rel="noreferrer"`，GitHub 新窗口打开。
- 邮箱保留 `your-email@example.com` 占位符，微信明确为不公开。

## 11. 响应式与可访问性

- 桌面：Hero 双栏、架构模块四列、仓库三列。
- 平板：Hero 可上下排列、内容卡片两列。
- 手机：单列、折叠菜单、核心缩小、背景显著降级、状态条隐藏。
- 使用语义化 `header`、`nav`、`main`、`section`、`footer` 和标题层级。
- 所有按钮与链接具有明确可访问名称和可见焦点。
- 文本与背景达到稳定可读对比度；装饰 SVG 对辅助技术隐藏。
- 菜单按钮暴露 `aria-expanded` 和关联面板。

## 12. 测试策略

使用 Vitest、Testing Library 和 jsdom：

1. GitHub 数据规范化：兜底描述、Unknown 语言、topics 修复和时间排序。
2. fork 规则：普通 fork 过滤，有 stars 或描述的 fork 保留。
3. 请求异常：非 2xx、无效结构和网络失败抛出有上下文的错误。
4. 仓库筛选：指定语言、Other 和全部。
5. 仓库排序：更新时间、Stars 和名称。
6. Navbar：菜单展开/关闭、可访问属性和目标链接。
7. Repository Constellation：正常数据、空状态和选项交互。
8. 关键静态内容：Hero、About、Open Channel 和 Footer 文案存在。

每个行为遵循测试先行：先写失败测试并确认失败原因，再实现最小代码，最后重构并运行完整测试。

## 13. 验收标准

- `npm install` 成功。
- `npm run dev` 可启动。
- `npm test` 全部通过。
- `npm run build` 无类型、构建或 hydration 错误。
- 桌面、平板和手机布局可用，无横向溢出。
- GitHub 公开仓库正常显示、筛选、排序；失败状态不影响整页。
- 页面不要求密码或 Token，不访问私有仓库，不包含敏感信息。
- 不安装 Three.js、react-three-fiber、大型 UI 框架或外部字体依赖。
- README 完整覆盖运行、定制、Vercel 部署、自定义域名和安全说明。

