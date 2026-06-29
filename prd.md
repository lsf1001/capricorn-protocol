你是一个顶级前端工程师、视觉设计师、交互设计师和产品型 AI 编程助手。

请从 0 开发一个个人技术网站。

这个网站不是简历页，不是普通作品集，不是模板站，而是一个具有强烈个人符号的技术入口。

我的 GitHub 账号是：

lsf1001

请通过 GitHub 公开 API 自动读取我的公开仓库：

https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100

重要安全要求：

1. 不要要求我提供 GitHub 密码。
2. 不要要求我提供 GitHub Token。
3. 第一版只展示 GitHub public repositories。
4. 不读取 private repositories。
5. 不要把任何密钥、Token、Cookie、私有信息写进代码。
6. 不要生成需要后端数据库的复杂系统。
7. 第一版必须可以免费部署到 Vercel。

==================================================
一、项目核心定位
==================================================

主品牌名：

0xForge

中文主题：

摩羯契约

英文主题：

Capricorn Protocol

网站完整定位：

0xForge
摩羯契约 · Capricorn Protocol
AI × Blockchain Architecture Lab
老白的可信智能系统实验室

我的个人定位：

区块链架构师 × AI 架构师

核心方向：

- Blockchain Architecture
- AI Architecture
- AI Agent 工程化
- 智能合约
- 链上数据分析
- RAG / LLM 应用
- 多模型协作
- 数据驱动产品
- 本地智能系统
- 可信智能系统
- 工程化落地

一句话介绍：

构建可信智能系统，把 AI Agent、链上数据、智能合约与业务工程锻造成能跑的机器。

==================================================
二、整体视觉目标
==================================================

我要的视觉效果是：

神秘
炫酷
暗黑
高级
克制
冷感
独一无二
有压迫感
有架构感
有工程感
有长期主义
像一个隐藏在深空中的 AI × Blockchain 架构控制台

打开网站第一眼要让人感觉：

“这不是普通个人主页，而是一个链上深空实验室入口。”

但请注意：

不要做成星座运势网站。
不要做成玄学网站。
不要做成 NFT 官网。
不要做成土味币圈大屏。
不要做成廉价赛博朋克。
不要做成游戏登录页。
不要满屏彩虹渐变。
不要使用卡通山羊。
不要过度堆砌光效。
不要牺牲文字可读性。
不要让页面卡顿。

视觉核心概念：

摩羯契约不是星座玄学，而是一个工程隐喻。

摩羯代表：

- 结构
- 自律
- 攀登
- 秩序
- 长期主义
- 系统确定性

契约代表：

- 智能合约
- 链上承诺
- 可信规则
- 协议边界
- 可验证系统

所以整个网站应该像：

一个由摩羯星图、区块链节点、AI 模型核心、智能合约协议和深空控制台融合而成的可信智能系统界面。

主题名称：

Capricorn Protocol Interface
摩羯契约协议界面

==================================================
三、技术栈要求
==================================================

请使用：

- Next.js 最新稳定版
- App Router
- TypeScript
- Tailwind CSS
- motion/react 或 framer-motion
- lucide-react 图标
- Canvas 2D 或 SVG 动效
- 不要使用 Three.js
- 不要使用 react-three-fiber
- 不要使用大型 UI 框架
- 不要使用 Bootstrap
- 不要依赖复杂在线字体
- 优先使用系统字体

必须保证：

npm install
npm run dev
npm run build

都可以正常运行。

必须支持：

- 桌面端
- 平板端
- 手机端
- Vercel 免费部署

==================================================
四、全局视觉系统
==================================================

请在 globals.css 中定义 CSS variables。

建议主题色：

--bg-void: #02030a;
--bg-deep: #030712;
--bg-panel: rgba(15, 23, 42, 0.58);
--bg-panel-strong: rgba(15, 23, 42, 0.82);

--text-main: #e5e7eb;
--text-soft: #cbd5e1;
--text-muted: #94a3b8;
--text-faint: #64748b;

--cyan-core: #22d3ee;
--violet-core: #8b5cf6;
--indigo-core: #6366f1;
--emerald-flow: #34d399;
--gold-star: #f5c451;
--blood-red: #7f1d1d;

--line-muted: rgba(148, 163, 184, 0.16);
--line-glow: rgba(34, 211, 238, 0.35);
--gold-glow: rgba(245, 196, 81, 0.42);
--violet-glow: rgba(139, 92, 246, 0.36);

设计原则：

1. 背景必须深。
2. 文字必须清晰。
3. 金色只做少量点缀，代表摩羯主星和契约印记。
4. 青绿色代表数据流。
5. 紫蓝色代表 AI 模型核心。
6. 红色只能极少量使用，作为深空警示感，不要做恐怖风。
7. 页面整体要暗黑，但不能脏。
8. 页面要炫酷，但不能吵。
9. 视觉要独特，但不能影响阅读。
10. 每个区域都要有“系统模块”的感觉。

==================================================
五、字体系统要求
==================================================

请强化全站字体系统。

字体方向：

- 英文标题要冷感、科技、克制、有实验室感。
- 中文字体要清晰、稳重、不要花哨。
- 不要使用复杂在线字体，避免加载慢。
- 优先使用系统字体。
- 英文可使用 font-mono / tracking-wide / uppercase 增强协议感。
- 中文正文保持高可读性，不要强行等宽。

字体层级要求：

1. 主品牌 0xForge
   
   - 使用超大字号。
   - 字重 700 或 800。
   - 字距略微拉开。
   - 可以使用暗黑霓虹渐变文字。
   - 可以加入轻微 text-shadow glow。
   - 不能廉价发光。

2. 主题行：
   摩羯契约 · Capricorn Protocol
   
   - 中英文混排。
   - 字号小于主标题。
   - 像协议名称。
   - 可以使用低调金色或青紫色点缀。

3. 英文 Section Title：
   例如：
   Architecture Modules
   Repository Constellation
   Protocol Stack
   About the Architect
   Open Channel
   
   要使用 uppercase、小字号、宽字距、低透明度。
   像控制台里的模块编号。

4. 中文标题：
   
   - 要稳、清楚、克制。
   - 不要用花哨字体。
   - 不要像海报字体。

5. 代码感小字：
   例如：
   CAPRICORN PROTOCOL INITIALIZED
   STATUS: ACTIVE
   connection.status = open
   
   使用等宽字体。
   字号小。
   字距拉开。
   颜色低调。

==================================================
六、页面结构
==================================================

页面采用单页滚动结构：

1. Navbar
2. Hero
3. Architecture Modules
4. Repository Constellation
5. Protocol Stack
6. About the Architect
7. Open Channel
8. Footer

导航栏菜单：

首页
架构模块
项目星图
协议栈
关于我
联系
GitHub

每个 section 增加协议编号：

[01] ARCHITECTURE MODULES
[02] REPOSITORY CONSTELLATION
[03] PROTOCOL STACK
[04] ABOUT THE ARCHITECT
[05] OPEN CHANNEL

要求：

- 编号很小。
- 低透明度。
- 使用等宽字体。
- 像系统协议文档。
- 不要抢标题。

==================================================
七、组件结构要求
==================================================

请生成以下结构：

app/
  layout.tsx
  page.tsx
  globals.css

components/
  Navbar.tsx
  Hero.tsx
  CapricornProtocolBackground.tsx
  CapricornCore.tsx
  ForgeSigil.tsx
  ProtocolBadge.tsx
  ArchitectureModules.tsx
  RepositoryConstellation.tsx
  ProjectCard.tsx
  ProtocolStack.tsx
  AboutArchitect.tsx
  OpenChannel.tsx
  Footer.tsx

lib/
  github.ts
  utils.ts

types/
  github.ts

README.md

==================================================
八、核心视觉组件 1：CapricornProtocolBackground
==================================================

文件：

components/CapricornProtocolBackground.tsx

作用：

全站深空背景。

要求：

1. 使用 Canvas 2D 实现。
2. 必须是 client component。
3. 所有 window/document/canvas 逻辑必须放在 useEffect 中。
4. 背景包含深空粒子。
5. 背景包含固定的摩羯座星图节点。
6. 背景包含区块链节点网络。
7. 节点之间用细线连接。
8. 摩羯座星图要隐藏在节点网络中，不要太直白。
9. 节点连接线要像区块链拓扑。
10. 有非常轻微的数据流线段沿连接线移动。
11. 鼠标移动时产生微弱光晕。
12. 节点有轻微呼吸动画。
13. 不能卡顿。
14. 移动端减少粒子数量。
15. prefers-reduced-motion 下关闭复杂动画。
16. 组件卸载时 cancelAnimationFrame。
17. 根据 devicePixelRatio 适配高清屏。
18. 不要导致 hydration error。

视觉细节：

- 背景接近黑色深空。
- 粒子透明度低。
- 主节点用少量金色。
- AI 节点用紫蓝色。
- 数据流用青绿色。
- 连线透明度低。
- 鼠标光晕要像暗处的扫描灯，不能刺眼。
- 整体像“协议网络正在低功耗运行”。

摩羯座节点设计：

请创建一组固定坐标，形成抽象摩羯座星图。
但不要写实，也不要标注星座名称。
节点之间可以形成：

- 星图折线
- 山羊角弧线暗示
- 攀登山脊般的折线结构

这是隐藏彩蛋，不要喧宾夺主。

同时增加一层非常淡的 Protocol Grid：

效果：

- 背景中有几乎不可见的细线网格。
- 网格不是普通方格，而是略带透视感的深空架构网格。
- 偶尔有一小段线条微亮，像数据包经过。
- 网格透明度非常低。
- 不能影响文字阅读。
- 移动端可以减少或关闭。

再加入非常克制的 Hash Drift 效果：

背景中偶尔出现低透明度字符：
0x
hash
node
agent
proof
contract
forge
capricorn

要求：

- 字符很小。
- 很淡。
- 缓慢漂移。
- 不像 Matrix 代码雨。
- 不影响阅读。
- 移动端关闭。

==================================================
九、核心视觉组件 2：CapricornCore
==================================================

文件：

components/CapricornCore.tsx

作用：

Hero 右侧核心视觉装置。

它不是图片，而是一个 SVG / CSS 动画装置。

视觉名称：

Capricorn Core

设计要求：

它要像一个“可信智能系统核心”正在启动。

包含元素：

1. 中央核心圆环。
2. 多层旋转轨道。
3. 摩羯座主星节点。
4. 区块链环形节点。
5. AI 模型核心光晕。
6. 细线连接。
7. 隐约的 0x 字符碎片。
8. 几何山羊角轮廓。
9. 少量金色契约印记。
10. 青绿色数据流。
11. 紫蓝色模型核心。
12. 极简 hash 片段，例如 0xA7F、0xC13、0x9E2，仅作为装饰。

禁止：

- 不要卡通山羊。
- 不要真实动物图。
- 不要星座运势图。
- 不要 NFT 头像风。
- 不要做成普通 loading 圈。
- 不要过度复杂。

动效：

1. 外环缓慢旋转。
2. 内环反向缓慢旋转。
3. 主节点轻微呼吸。
4. 数据流沿部分连线移动。
5. 0x 字符若隐若现。
6. 进入页面时整体淡入并轻微上浮。
7. 鼠标 hover 时核心略微变亮。

移动端：

缩小显示，不能撑爆布局。

==================================================
十、核心视觉组件 3：ForgeSigil
==================================================

文件：

components/ForgeSigil.tsx

作用：

导航栏和 Hero 中的品牌符号。

它是一个极简 SVG 符号。

融合元素：

- 0x
- 山羊角
- 节点网络
- 熔炉几何线条
- 契约印记

设计要求：

1. 不要使用图片。
2. 不要卡通。
3. 不要币圈土 logo。
4. 不要太复杂。
5. 可缩放。
6. 可以使用青紫渐变和一点金色。
7. 在小尺寸下仍然清楚。
8. 放在 Navbar 左侧时要好看。
9. 放在 Hero 中时也能作为标识。

动态要求：

1. 页面首次加载时，ForgeSigil 像契约印记一样被点亮。
2. SVG path 可以有轻微 stroke-dash 动画。
3. 动画完成后保持静态微光。
4. Navbar 中的 ForgeSigil hover 时轻微旋转或亮起。
5. 不要持续高频动画。
6. 不要像 loading 图标。

==================================================
十一、核心视觉组件 4：ProtocolBadge
==================================================

文件：

components/ProtocolBadge.tsx

作用：

显示系统状态标签。

用于 Hero 和其他模块。

示例标签：

AI CORE ONLINE
CHAIN NODES SYNCED
AGENT ROUTER ACTIVE
CAPRICORN PROTOCOL
CONTRACT LAYER READY
REPOSITORY CONSTELLATION

视觉要求：

- 小号字体。
- uppercase。
- letter spacing。
- 暗色玻璃背景。
- 左侧有小圆点。
- 小圆点可以轻微呼吸。
- hover 时边框微亮。
- 不要太花。

==================================================
十二、Navbar 要求
==================================================

文件：

components/Navbar.tsx

要求：

1. 固定顶部。
2. 毛玻璃背景。
3. 左侧显示 ForgeSigil + 0xForge。
4. 菜单：
   首页
   架构模块
   项目星图
   协议栈
   关于我
   联系
   GitHub
5. GitHub 是外链，打开 https://github.com/lsf1001。
6. 滚动后 Navbar 背景更明显。
7. 移动端有菜单按钮。
8. 移动菜单要有暗黑控制台风格。
9. 点击菜单平滑滚动。
10. 当前导航项高亮。
11. 高亮效果像协议节点激活。
12. 不要使用臃肿依赖。

点击导航后：

- 平滑滚动。
- 滚动到目标 section 时，该 section 顶部扫描线轻微闪过一次。

==================================================
十三、Hero 要求
==================================================

文件：

components/Hero.tsx

Hero 是整个网站的灵魂，必须最有冲击力。

布局：

桌面端：
左侧文案，右侧 CapricornCore。

移动端：
上方文案，下方 CapricornCore 缩小居中。

文案：

主标题：

0xForge

主题行：

摩羯契约 · Capricorn Protocol

副标题：

AI × Blockchain Architecture Lab

中文定位：

老白的可信智能系统实验室

一句话：

构建可信智能系统，把 AI Agent、链上数据、智能合约与业务工程锻造成能跑的机器。

隐藏状态文字：

CAPRICORN PROTOCOL INITIALIZED

中文彩蛋：

摩羯契约已启动：少一点概念噪音，多一点系统确定性。

按钮：

查看项目
GitHub
联系我

按钮要求：

- 查看项目：滚动到 Repository Constellation
- GitHub：打开 https://github.com/lsf1001
- 联系我：滚动到 Open Channel

Hero 状态标签：

AI CORE ONLINE
CHAIN NODES SYNCED
AGENT ROUTER ACTIVE
CAPRICORN PROTOCOL

Hero 增加一个克制的系统启动动态。

效果：
页面加载后，依次出现这些状态：

> initializing 0xForge...
> syncing chain nodes...
> loading AI core...
> validating capricorn protocol...
> system ready.

要求：

- 显示在 Hero 的小型终端区域。
- 不要占据太大空间。
- 每行出现时有轻微打字机效果。
- 打字速度不要太慢。
- 整体不超过 2 秒完成。
- 完成后保持为低透明度状态。
- 移动端可以简化为 2 到 3 行。
- prefers-reduced-motion 下直接显示最终状态。

Hero 底部或桌面端右下角增加 System Status Bar：

AI CORE: ONLINE
CHAIN: SYNCED
AGENT: ACTIVE
CONTRACT: VERIFIED

要求：

- 小字号。
- 等宽字体。
- 暗色半透明背景。
- 每个状态前有小圆点。
- 小圆点轻微呼吸。
- 移动端可以隐藏。

视觉要求：

1. 背景使用 CapricornProtocolBackground。
2. 标题要有暗黑霓虹渐变，但不要花。
3. 0xForge 要有强识别度。
4. 中文排版要高级。
5. 文字不能被背景干扰。
6. 按钮要像控制台操作按钮。
7. 整体像“系统启动完成后的主控界面”。

==================================================
十四、Architecture Modules 要求
==================================================

文件：

components/ArchitectureModules.tsx

区域标题：

Architecture Modules
架构模块

四个模块：

1. AI Architecture

文案：
设计 LLM 应用、RAG、AI Agent、多模型协作与本地智能系统，让模型能力进入真实业务流程。

状态：
STATUS: ACTIVE

2. Blockchain Architecture

文案：
关注链上系统、智能合约、链上数据、钱包交互与可信业务网络，构建可追踪、可验证的数字系统。

状态：
STATUS: VERIFIED

3. Agent Engineering

文案：
将工具调用、任务编排、记忆系统、自动化工作流与业务系统结合，让 Agent 从聊天框走向生产环境。

状态：
STATUS: ROUTING

4. Data-driven Products

文案：
用数据建模、特征工程、可解释性分析和业务反馈闭环，支撑定价、决策和增长系统。

状态：
STATUS: LEARNING

视觉要求：

- 四个卡片像系统模块。
- 每个卡片有极简线框图标。
- hover 时边框微光。
- 卡片内部可以有很淡的节点纹理。
- 卡片进入视口时像“系统模块上线”。
- 不要花。
- 文案清晰。

==================================================
十五、Repository Constellation 要求
==================================================

文件：

components/RepositoryConstellation.tsx
components/ProjectCard.tsx

区域标题：

Repository Constellation
项目星图

说明文案：

GitHub 公开仓库被映射成一组技术节点，记录实验、工具、架构和正在生长的系统。

GitHub API：

https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100

展示字段：

- name
- description
- language
- stargazers_count
- forks_count
- updated_at
- topics
- html_url
- homepage

数据处理要求：

1. 默认过滤 fork 项目。
2. 如果 fork 项目 stars > 0 或 description 不为空，可以保留。
3. 按 updated_at 默认倒序。
4. description 为空时使用兜底文案：
   这个节点还没有写简介，但代码已经开始发光。
5. language 为空时显示 Unknown。
6. topics 为空时不展示 topics 区域。
7. API 失败时显示错误卡片：
   GitHub 星图暂时失联，但实验室还在运转。
8. 加载时显示 skeleton 卡片，不能简单写 Loading。

筛选功能：

- 全部
- TypeScript
- JavaScript
- Python
- Java
- Solidity
- Go
- Rust
- Other

排序功能：

- 最近更新
- Stars 最多
- 名称排序

项目卡片视觉：

每个 repo 卡片像一个“链上节点”。

卡片内容：

- repo name
- description
- language
- stars
- forks
- updated date
- topics
- GitHub link

卡片 hover 效果：

1. 微弱边框发光。
2. 顶部出现一条很细的数据扫描线。
3. 扫描线从左到右滑过。
4. 右上角出现 hash-like 装饰，例如 0xA7F、0xC13、0x9E2。
5. hash-like 装饰只是视觉装饰，不要冒充真实 hash。
6. stars / forks 数字区域微亮。
7. 卡片背景中隐藏的节点纹理稍微显现。
8. 卡片轻微上浮，幅度控制在 4px 以内。
9. 鼠标离开后平滑恢复。
10. 不影响阅读。
11. 不要闪烁刺眼。

注意：

不要把项目区做成普通网格卡片。
要像“仓库星图中的节点阵列”。

==================================================
十六、Protocol Stack 要求
==================================================

文件：

components/ProtocolStack.tsx

区域标题：

Protocol Stack
协议栈

分三层展示：

AI Layer:

- LLM 应用
- RAG
- AI Agent
- 多模型协作
- 可解释性分析
- 本地智能系统

Chain Layer:

- Blockchain Architecture
- Smart Contract
- Web3
- 链上数据分析
- Tokenomics
- 可信协议

Engineering Layer:

- TypeScript
- Python
- Next.js
- FastAPI
- Playwright
- LightGBM
- 数据工程
- 本地部署
- 自动化工作流
- 工程化落地

视觉要求：

1. 技术标签像控制台里的协议标签。
2. 分组像系统分层。
3. hover 时标签被激活，有微弱光晕。
4. 不要做成彩色糖果按钮。
5. 中文和英文混排要美观。
6. 三层之间可以用细线或节点连接。

==================================================
十七、About the Architect 要求
==================================================

文件：

components/AboutArchitect.tsx

区域标题：

About the Architect
关于我

文案：

我是老白，区块链架构师 × AI 架构师。

我关注的不是模型排行榜，也不是概念化的 Web3 叙事，而是技术如何进入真实系统。

AI 如何接业务，
Agent 如何稳定运行，
链上数据如何被分析，
智能合约如何服务真实流程，
模型结果如何被解释，
系统成本如何被控制。

我正在研究的核心方向：

- AI Agent 工程化
- Blockchain Architecture
- 智能合约与链上数据系统
- 本地优先的智能系统
- 数据驱动定价与决策
- 多模型协作工作流
- 面向个人和小团队的 AI 工具产品

隐藏彩蛋小字：

摩羯式工程观：少一点概念噪音，多一点系统确定性。

隐藏彩蛋：

CAPRICORN CONTRACT HASH
0xCAPRICORN-ARCHITECT-2026

要求：

- 默认低透明度。
- hover 时略微显现。
- 不影响主内容。

视觉要求：

1. 像一块黑色协议铭牌。
2. 左侧可以有 ForgeSigil 或抽象山羊角线框。
3. 文案要清晰。
4. 不要过度动画。
5. 保持神秘但不装神弄鬼。

==================================================
十八、Open Channel 要求
==================================================

文件：

components/OpenChannel.tsx

区域标题：

Open Channel
开放连接

内容：

GitHub:
https://github.com/lsf1001

Email:
your-email@example.com

微信：
暂不公开

说明：
如需合作，可通过 GitHub 或邮箱联系。

设计成一个暗黑终端连接面板。

显示为：

> connection.status = open
> github.node = lsf1001
> collaboration.mode = async
> protocol = capricorn
> contact.email = your-email@example.com
> wechat = private

视觉要求：

1. 像暗黑终端。
2. 有轻微闪烁光标。
3. GitHub 和 Email 可点击。
4. 面板边框有微弱发光。
5. 不要过度拟真终端。
6. Email 是占位符，方便我后续修改。
7. 不要写真实微信。

==================================================
十九、Footer 要求
==================================================

文件：

components/Footer.tsx

内容：

© 2026 0xForge. Built by Laobai.

可以加小字：

Capricorn Protocol Interface

也可以在 Footer 上方或角落低调显示：

CAPRICORN CONTRACT HASH
0xCAPRICORN-ARCHITECT-2026

视觉要求：

- 简洁。
- 暗色。
- 细线分隔。
- 不要复杂。

==================================================
二十、GitHub API 封装要求
==================================================

文件：

lib/github.ts

请封装：

getGithubRepos()

要求：

1. fetch https://api.github.com/users/lsf1001/repos?sort=updated&per_page=100
2. 处理失败。
3. 返回类型完整。
4. 对 description 做兜底。
5. 对 language 做兜底。
6. 默认过滤 fork。
7. 按 updated_at 排序。
8. 不需要 Token。
9. 不访问私有仓库。

文件：

types/github.ts

定义 GithubRepo 类型，至少包含：

id
name
description
language
stargazers_count
forks_count
updated_at
topics
html_url
homepage
fork

==================================================
二十一、动效和交互要求
==================================================

使用 motion/react 或 framer-motion。

页面动效：

1. Hero 进入时淡入。
2. CapricornCore 轻微上浮。
3. Section 滚动进入时轻微 reveal。
4. 卡片 hover 微动。
5. 标签 hover 微光。
6. ForgeSigil 首次加载有契约印记点亮动画。
7. 不要做夸张跳动。
8. 不要做满屏炫光。
9. 不要影响性能。
10. prefers-reduced-motion 下关闭复杂动效。
11. 移动端减少动效。

滚动 reveal 动效设计成“系统模块上线”。

每个 section 进入视口时：

- 顶部出现一条很细的扫描线。
- 模块标题轻微上浮并显现。
- 卡片按顺序淡入。
- 背景节点纹理轻微显现。
- 动效总时长控制在 0.4 到 0.7 秒。
- 不要弹跳。
- 不要夸张缩放。
- prefers-reduced-motion 下关闭。

鼠标交互：

1. 全站有一个非常克制的鼠标光晕。
2. 光晕像暗黑控制台里的扫描灯。
3. 鼠标靠近卡片时，卡片边框产生微弱响应。
4. 鼠标靠近 CapricornCore 时，核心节点略微变亮。
5. 鼠标移动不要造成明显性能负担。
6. 移动端关闭鼠标光晕。
7. 不要出现夸张跟随动画。
8. 不要影响文字阅读。

动效气质：

像一台深空机器低功耗运行。
不是舞台灯光。
不是烟花。
不是游戏 UI。

==================================================
二十二、响应式要求
==================================================

桌面端：

- Hero 左右布局。
- CapricornCore 在右侧。
- 项目卡片 3 列或自适应。
- Architecture Modules 4 卡片网格。

平板端：

- Hero 可上下布局。
- 卡片 2 列。

手机端：

- Hero 上下布局。
- CapricornCore 缩小。
- 项目卡片单列。
- Navbar 折叠菜单。
- 背景粒子减少。
- Hash Drift 关闭。
- 鼠标光晕关闭。
- 背景动效降级。
- 文案不可拥挤。

==================================================
二十三、SEO 和 Metadata
==================================================

title:

0xForge | 摩羯契约 · Capricorn Protocol

description:

老白的 AI × Blockchain 架构实验室，以摩羯契约为视觉主题，展示可信智能系统、AI Agent、链上数据、智能合约与工程化项目。

keywords:

AI Architect, Blockchain Architect, AI Agent, Web3, Smart Contract, RAG, LLM, 0xForge, Capricorn Protocol, 老白

Footer：

© 2026 0xForge. Built by Laobai.

==================================================
二十四、README 要求
==================================================

README.md 必须包含：

1. 项目介绍
2. 品牌说明
3. 视觉主题说明
4. 技术栈
5. 本地运行方法
6. 如何修改 GitHub 用户名
7. 如何修改个人文案
8. 如何部署到 Vercel
9. 如何后续绑定自定义域名
10. 安全说明

安全说明必须写：

本项目不需要 GitHub Token。
本项目不需要 GitHub 密码。
本项目只读取公开仓库。
不要将任何敏感信息提交到代码仓库。

视觉主题说明必须写：

本项目融合了 Capricorn 摩羯座星图元素，但以科技化、抽象化、工程化方式呈现，不包含占星、玄学或运势内容。

本地运行命令：

npm install
npm run dev

构建命令：

npm run build

部署说明：

推送到 GitHub 后，在 Vercel 导入该仓库即可部署。

==================================================
二十五、性能和工程质量要求
==================================================

必须满足：

1. 不要使用 Three.js。
2. 不要使用 react-three-fiber。
3. 不要使用大型 UI 库。
4. 动效优先 CSS / SVG / Canvas 2D。
5. 避免 hydration error。
6. 所有使用 window/document/canvas 的逻辑必须放在 client component 的 useEffect 中。
7. Canvas 动画要清理资源。
8. prefers-reduced-motion 下关闭复杂动画。
9. 移动端减少粒子、字符漂移和背景动效。
10. npm run build 必须通过。
11. 不需要 GitHub Token。
12. 不需要 GitHub 密码。
13. 只读取公开仓库。
14. 不要引入导致部署失败的复杂依赖。
15. 移动端必须可用。
16. Vercel 免费版可以部署。

==================================================
二十六、最终交付要求
==================================================

请直接创建完整项目代码。

要求：

1. 不要只给方案。
2. 不要省略关键文件。
3. 不要让我再补大量代码。
4. npm install 必须能安装。
5. npm run dev 必须能运行。
6. npm run build 必须通过。
7. UI 要有完成度，不能像 demo。
8. 网站必须神秘、炫酷、暗黑、独一无二。
9. 网站必须简约、清晰、可读。
10. 中文必须是简体中文。
11. 不要使用真实敏感信息。
12. 不要请求 GitHub 密码。
13. 不要请求 GitHub Token。
14. 不要使用重型 3D 依赖。
15. 不要引入导致部署失败的复杂依赖。
16. 避免 hydration error。
17. 移动端必须可用。
18. Vercel 免费版可以部署。

完成后，请先自己运行：

npm run build

如果有报错，请修复到构建通过。

最后告诉我：

1. 本地如何运行。
2. 如何推送到 GitHub。
3. 如何在 Vercel 免费部署。
4. 如何后续绑定自定义域名。
