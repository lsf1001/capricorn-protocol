import type { Dict } from "@/lib/i18n/types";

/**
 * 中文文案。同样的 key 树结构,缺 key 时自动回退到 en。
 *
 * 文案方向(2026-07):首屏从"lab"调成"接活入口",面向私活客户。
 * 现公司项目(大唐西市集团)一律脱敏:只挂数字结果,不挂公司/项目名。
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
    architecture: "服务",
    repositories: "项目",
    stack: "技术栈",
    about: "关于我",
    contact: "谈需求",
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
    protocolMark: "摩羯契约 · 接活模式",
    protocolMeta: "0xA7F · 2026 · 可接私活",
    brandPrefix: "老白 · 接活中",
    brandValue: "AI × Blockchain 架构师",
    titleAccessible: "我接 AI × Blockchain 私活。",
    identityBlockchain: "AI × Blockchain 架构师",
    identityAi: "可签 NDA · 7 年企业经验",
    labPrefixEn: "EN",
    labTextEn: "Open to contracts · 7 years production",
    labPrefixCn: "中文",
    labTextCn: "可接私活 · 7 年企业级落地",
    statement:
      "做能跑进生产的 AI 系统——多智能体 Harness、多模态 RAG 知识库、数据治理 pipeline、可解释模型。发我需求，我签 NDA，咱们交付。",
    ctaRepos: "看服务",
    ctaGithub: "GitHub",
    ctaContact: "谈需求",
    ctaCase: "看案例",
    feedbackRepos: "正在路由到服务区",
    feedbackGithub: "正在打开 GitHub 节点",
    feedbackContact: "正在打开接活通道",
    feedbackCase: "正在打开案例区",
    bootlogLabel: "SYSTEM BOOTLOG",
    bootlogAria: "系统启动状态",
    bootLine1: "> 正在初始化 laobai.identity...",
    bootLine2: "> mode = open_to_contracts...",
    bootLine3: "> 正在绑定 4 个服务层 + 4 项专利...",
    bootLine4: "> 系统就绪。nda-friendly。",
    visualLabel: "HIRING REACTOR · ACTIVE",
    visualStatus: "SIGNING · 0xCONTRACT-OPEN",
  },
  heading: {
    architecture: "服务",
    repositories: "项目星图",
    stack: "技术栈",
    about: "关于我",
    contact: "谈需求",
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
  services: {
    title: "服务",
    eyebrow: "我能接的活",
    indexLabel: "[01]",
    intro:
      "4 类私活，全部能交付到生产环境——开源案例可直接验证,在职项目数据真实但按 NDA 脱敏。",
    nda: "可签 NDA · 48 小时回复 · 远程优先",
    ctaBrief: "发我需求",
    ctaGithub: "在 GitHub 看",
    agent: {
      title: "AI Agent Harness / 多智能体",
      desc: "端到端 Agent 平台:记忆系统、质量门、MCP 插件层、多通道路由、Electron 桌面端打包。从 0 到 1，不是 demo。",
      metric: "421 单测 · 176MB 一键安装包",
      caseLabel: "参考案例:Nexus(开源)",
    },
    rag: {
      title: "多模态 RAG 知识库",
      desc: "企业级 RAG:LlamaIndex + LangGraph + MCP 协议解耦架构,BM25 + 向量混合检索 + RRF 融合 + 重排,离线加工与在线问答三层解耦。",
      metric: "召回 90%+ · 问答 30→85% · 响应 <2s",
      caseLabel: "参考案例:某大型集团落地(已脱敏)",
    },
    data: {
      title: "数据治理 + ML 建模",
      desc: "Polars 百万级数据清洗,三级清洗规则,可解释 LightGBM 定价/决策模型,Optuna 调优 + SHAP 可解释性 + 时序切分防数据泄露。",
      metric: "华为 MAPE 4.23% · 33 万→12.3 万优质训练数据",
      caseLabel: "参考案例:Furion(开源)",
    },
    privateai: {
      title: "AI 私有化部署 / 端侧 AI",
      desc: "LLM / 多模态模型量化压缩,Apple Silicon MPS 适配,Ollama 离线部署,Skill 封装。零 SaaS 依赖,数据不出门。",
      metric: "30 语种 · 4-bit 量化 · 成本降低约 70%",
      caseLabel: "参考案例:qiqi-voice(开源)",
    },
  },
  cases: {
    title: "案例",
    eyebrow: "我做过的",
    indexLabel: "[04]",
    intro:
      "精选案例——开源项目可点链接看代码;在职项目已脱敏但数字真实。",
    problem: "问题",
    solution: "方案",
    stack: "技术栈",
    results: "结果",
    linkGithub: "在 GitHub 查看",
    linkReadMore: "了解更多",
    nexus: {
      title: "Nexus · 本地多智能体协作平台",
      problem: "需要一个生产级、本地可跑的多智能体平台,带记忆、质量门、多通道路由和桌面端——不是聊天 demo。",
      solution:
        "DeepAgents SDK + FastAPI + WebSocket + React 19 + Electron 三进程全栈;五阶段 Agent 流式协议;Channel 抽象层把微信硬编码重构为可插拔多通道;记忆中间件 + LangGraph 存储带写保护机制;421 单测,176MB 一键安装包,Apache-2.0 开源。",
      stack: "Python · DeepAgents · FastAPI · WebSocket · React 19 · Electron · LangGraph",
      results: "421 单测 · 176MB 一键安装 · 多通道可插拔 · 7 年生产思维",
      link: "https://github.com/lsf1001/nexus",
    },
    furion: {
      title: "Furion 万机 · B2B 二手机智能估价",
      problem: "二手机人工估价慢、不一致。需要一个亚秒级、覆盖 95% 主流机型的生产级自动估价。",
      solution:
        "五大数据源分层定价(自营成交 + ERP 基准 → 市场行情修正 → 竞品偏离校验);19 维双品牌特征体系;8:1:1 时序切分;Optuna 50 轮贝叶斯调优 + SHAP 可解释性 + 分价位中位数偏移校准。",
      stack: "Python · LightGBM · Optuna · SHAP · Polars",
      results: "华为 MAPE 4.23% · 苹果 MAPE 9.77% · 累计 21 万+ 报价单",
      link: "https://github.com/lsf1001/furion",
    },
    qiqi: {
      title: "qiqi-voice · 端侧 TTS Skill",
      problem: "云端 TTS 贵、泄露数据、依赖网络。需要 30 语种、零 SaaS、可声音克隆的本地语音方案。",
      solution:
        "OpenBMB VoxCPM2 + pnpm monorepo + Python/FastAPI 推理服务;Apple Silicon MPS 适配 + fp32 精度验证;13 款预置音色 + 声音克隆 + Voice Design;176MB 一键安装包,Apache-2.0 合规。",
      stack: "VoxCPM2 · pnpm monorepo · FastAPI · Apple Silicon MPS",
      results: "30 语种 · 13 款音色 · 声音克隆 · 100% 端侧运行",
      link: "https://github.com/lsf1001/qiqi-voice",
    },
    chain: {
      title: "大唐链 · 国家试点联盟链(已脱敏)",
      problem:
        "从零自研一条开放联盟链,通过国家网信办备案,并交付一个国家级版权上链试点项目。",
      solution:
        "基于 Cosmos IRITA 框架做底层开发与性能优化;主导整体架构、技术迭代与项目落地;深度参与国家级区块链创新试点;期间累计申报 2 项区块链发明专利。",
      stack: "Cosmos IRITA · 智能合约 · 链上索引",
      results: "国家网信办备案 · 十六部委区块链+版权创新试点优秀奖 · 2 项专利",
    },
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
    lead: "7 年把 AI × Blockchain 系统做进生产——给付费客户,不是给模型排行榜。",
    intro:
      "现在在某大型集团主导 AI 业务线。曾负责一条开放联盟链从研发到国家网信办备案到十六部委试点落地。私活我可以端到端交付:需求拆解、架构、交付、移交。可签 NDA,48 小时回复,远程优先。",
    timelineLabel: "7 年履历",
    timelineTitle: "时间线",
    questions: `我关注的点:
端到端 owner——不是 200 页架构文档,是一个能跑的系统。
生产级——测试、打包、KPI、移交。
可解释模型——SHAP,不是黑盒。
成本意识——量化、轮询、批处理、serverless。
可签 NDA——你拿 IP,我签你的合同。`,
    directionLabel: "我常用的工具:",
    directionsAria: "我常用的工具",
    creed: "少一点概念噪音，多一点系统确定性。可签 NDA，48 小时回复，远程优先。",
    contractHashLabel: "Capricorn 契约哈希",
    contractHash: "0xLAOBAI-CONTRACTOR-2026",
  },
  open: {
    githubLabel: "GitHub",
    emailLabel: "邮箱",
    wechatLabel: "微信",
    wechatPrivate: "可单独索取",
    note: "有项目想谈,按下方模板把信息发到邮箱,48 小时内回复。",
    protocolAria: "连接协议状态",
    protocolStatus: "> hiring.status = open",
    protocolGithub: "> github.node = {handle}",
    protocolCollaboration: "> collaboration.mode = remote_first",
    protocolName: "> protocol = nda_friendly",
    protocolContact: "> contact.email = {email}",
    protocolWechat: "> wechat = on_request",
    briefLabel: "询价模板",
    briefHelp: "把下面这些填好,发到下面的邮箱,48 小时内回复。",
    briefType: "项目类型",
    briefTypeHint: "Agent Harness / RAG / 数据治理 / 私有化 AI / 链上工程",
    briefBudget: "预算区间",
    briefBudgetHint: "如:¥50k–150k,USD 10k–30k,equity-flexible",
    briefTimeline: "期望时间",
    briefTimelineHint: "4 周出 MVP / 3 个月全交付 / 长期 retainer",
    briefStack: "技术栈 / 约束",
    briefStackHint: "必用语言、基础设施要求、本地 vs 云、已有系统",
    briefEmailCta: "把需求发给我",
  },
  footer: {
    copyright: "© 2026 0xForge · 老白 · 可接私活",
    interface: "摩羯契约协议界面",
    contractHashLabel: "Capricorn 契约哈希",
  },
  metadata: {
    title: "老白 · AI × Blockchain 架构师 · 可接私活",
    description:
      "老白(令帅锋)——7 年企业级 AI × Blockchain 架构经验,现主导某大型集团 AI 业务线。可接私活:AI Agent Harness、多模态 RAG、数据治理 pipeline、端侧 AI。可签 NDA,48 小时回复,远程优先。",
    ogDescription:
      "AI × Blockchain 架构师,可接私活。端到端交付:Agent Harness、RAG、数据 pipeline、端侧 AI。",
    twitterTitle: "老白 · AI × Blockchain 架构师 · 可接私活",
    twitterDescription:
      "7 年企业级 AI × Blockchain 架构经验。可接私活——Agent Harness、RAG、数据治理、端侧 AI。可签 NDA,48 小时回复。",
  },
};
