import type { Dict } from "@/lib/i18n/types";

/**
 * 中文文案。同样的 key 树结构,缺 key 时自动回退到 en。
 */
export const zh: Dict = {
  common: {
    appName: "0xForge · 摩羯契约",
    repositoryTitle: "项目星图",
    repositoryLoadingDescription:
      "GitHub 公开仓库被映射成一组技术节点，记录实验、工具、架构和正在生长的系统。",
  },
  nav: {
    home: "首页",
    architecture: "架构模块",
    repositories: "项目星图",
    stack: "协议栈",
    about: "关于我",
    contact: "联系",
    brandAria: "0xForge · 首页",
    desktopAria: "主导航",
    mobileAria: "移动端导航",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    statusActive: "ACTIVE",
    statusOpen: "OPEN",
    statusExternal: "EXTERNAL",
    localeToggle: "语言",
    localeToggleAria: "切换语言",
    localeSwitchTo: "切换到 {label}",
  },
  hero: {
    protocolMark: "CAPRICORN PROTOCOL 已初始化",
    protocolMeta: "0xA7F · 2026",
    brandPrefix: "CAPRICORN PROTOCOL · 2026",
    brandValue: "摩羯契约 · Capricorn Protocol",
    titleAccessible: "老白",
    identityBlockchain: "区块链架构师",
    identityAi: "AI 架构师",
    labPrefixEn: "EN",
    labTextEn: "AI × Blockchain Architecture Lab",
    labPrefixCn: "中文",
    labTextCn: "老白的可信智能系统实验室",
    statement:
      "构建可信智能系统，把 AI Agent、链上数据、智能合约与业务工程锻造成能跑的机器。",
    ctaRepos: "查看项目",
    ctaGithub: "GitHub",
    ctaContact: "联系我",
    feedbackRepos: "正在路由到项目星图",
    feedbackGithub: "正在打开 GitHub 节点",
    feedbackContact: "正在打开联系通道",
    bootlogLabel: "SYSTEM BOOTLOG",
    bootlogAria: "系统启动状态",
    bootLine1: "> 正在初始化 laobai 身份...",
    bootLine2: "> 正在绑定 0xForge 实验室上下文...",
    bootLine3: "> 正在同步链节点...",
    bootLine4: "> 系统就绪。",
    visualLabel: "COVENANT REACTOR · ACTIVE",
    visualStatus: "SIGNING · 0xCAPRICORN",
  },
  heading: {
    architecture: "架构模块",
    repositories: "项目星图",
    stack: "协议栈",
    about: "关于我",
    contact: "开放连接",
  },
  module: {
    aiTitle: "AI 架构",
    aiDesc:
      "设计 LLM 应用、RAG、AI Agent、多模型协作与本地智能系统，让模型能力进入真实业务流程。",
    aiStatus: "STATUS: ACTIVE",
    chainTitle: "区块链架构",
    chainDesc:
      "关注链上系统、智能合约、链上数据、钱包交互与可信业务网络，构建可追踪、可验证的数字系统。",
    chainStatus: "STATUS: VERIFIED",
    agentTitle: "Agent 工程",
    agentDesc:
      "将工具调用、任务编排、记忆系统、自动化工作流与业务系统结合，让 Agent 从聊天框走向生产环境。",
    agentStatus: "STATUS: ROUTING",
    dataTitle: "数据驱动产品",
    dataDesc:
      "用数据建模、特征工程、可解释性分析和业务反馈闭环，支撑定价、决策和增长系统。",
    dataStatus: "STATUS: LEARNING",
  },
  stack: {
    aiAria: "AI 层技术栈",
    chainAria: "链层技术栈",
    engineeringAria: "工程层技术栈",
  },
  repo: {
    githubRepoCard: {
      type: "REPOSITORY NODE",
      nodePrefix: "NODE /",
      topicsAria: "仓库主题",
      updatedAt: "更新于 {date}",
      viewOnGithub: "在 GitHub 查看 {name}",
      viewHomepage: "访问 {name} 项目主页",
      githubLabel: "GitHub",
      liveLabel: "在线",
    },
    lang: {
      all: "全部",
      ts: "TypeScript",
      js: "JavaScript",
      python: "Python",
      java: "Java",
      solidity: "Solidity",
      go: "Go",
      rust: "Rust",
      other: "其他",
    },
    toolbarAria: "按编程语言筛选",
    sortAria: "仓库排序",
    sortUpdated: "最近更新",
    sortStars: "Stars 最多",
    sortName: "名称排序",
    emptyTitle: "当前没有可显示的公开仓库节点。",
    emptyHint: "调整语言筛选，或稍后重新连接图谱。",
    overlayTitle: "仓库之森",
    clearingOne: "{count} 片空地",
    clearingOther: "{count} 片空地",
    nodesAria: "仓库节点",
    forestAria: "仓库森林图谱",
    viewDetails: "查看 {name} 详情",
    drawerAria: "{name} 详情",
    closeAria: "关闭",
    errorTitle: "GitHub 星图暂时失联，但实验室还在运转。",
    errorHint: "公开仓库连接将在下一次协议刷新时重试。",
    constellationDescription:
      "GitHub 公开仓库被映射成一组技术节点，记录实验、工具、架构和正在生长的系统。",
  },
  about: {
    lead: "我是老白，区块链架构师 × AI 架构师。",
    intro:
      "我关注的不是模型排行榜，也不是概念化的 Web3 叙事，而是技术如何进入真实系统。",
    questions: `AI 如何接业务，
Agent 如何稳定运行，
链上数据如何被分析，
智能合约如何服务真实流程，
模型结果如何被解释，
系统成本如何被控制。`,
    directionLabel: "我正在研究的核心方向：",
    directionsAria: "核心研究方向",
    creed: "摩羯式工程观：少一点概念噪音，多一点系统确定性。",
    contractHashLabel: "Capricorn 契约哈希",
    contractHash: "0xCAPRICORN-ARCHITECT-2026",
  },
  open: {
    githubLabel: "GitHub",
    emailLabel: "邮箱",
    wechatLabel: "微信",
    wechatPrivate: "暂不公开",
    note: "如需合作，可通过 GitHub 或邮箱联系。",
    protocolAria: "连接协议状态",
    protocolStatus: "> connection.status = open",
    protocolGithub: "> github.node = {handle}",
    protocolCollaboration: "> collaboration.mode = async",
    protocolName: "> protocol = capricorn",
    protocolContact: "> contact.email = {email}",
    protocolWechat: "> wechat = private",
  },
  footer: {
    copyright: "© 2026 0xForge. 由老白构建。",
    interface: "摩羯契约协议界面",
    contractHashLabel: "Capricorn 契约哈希",
  },
  metadata: {
    title: "老白 | 0xForge · 摩羯契约 · Capricorn Protocol",
    description:
      "老白的 AI × Blockchain 架构实验室 0xForge：构建可信智能系统，把 AI Agent、链上数据、智能合约与业务工程锻造成能跑的机器。Capricorn Protocol — 摩羯契约。",
    ogDescription:
      "AI × Blockchain 架构实验室 — 把模型、链与工程锻造成可信智能系统。",
    twitterTitle: "老白 | 0xForge · 摩羯契约 · Capricorn Protocol",
    twitterDescription: "AI × Blockchain 架构实验室 — 可信智能系统入口。",
  },
};
