import type { Locale } from "@/lib/i18n/types";

/**
 * 数组类本地化数据。字典({@link translations})只装 string,
 * 列表型内容(技术栈、研究方向、协议层名)在 {@link contents} 里维护，
 * 这样 `t(key)` 的返回类型保持干净的 string,而无需给数组节点设计额外的 fallback 协议。
 */

export interface ProtocolLayerContents {
  readonly name: string;
  readonly technologies: readonly string[];
}

/** 三层协议栈的内容。 */
export const PROTOCOL_LAYERS: Record<Locale, readonly ProtocolLayerContents[]> = {
  en: [
    {
      name: "AI Layer",
      technologies: [
        "LLM Applications",
        "RAG",
        "AI Agent",
        "Multi-model Collaboration",
        "Explainable Analysis",
        "Local Intelligence",
      ],
    },
    {
      name: "Chain Layer",
      technologies: [
        "Blockchain Architecture",
        "Smart Contract",
        "Web3",
        "On-chain Analytics",
        "Tokenomics",
        "Trusted Protocol",
      ],
    },
    {
      name: "Engineering Layer",
      technologies: [
        "TypeScript",
        "Python",
        "Next.js",
        "FastAPI",
        "Playwright",
        "LightGBM",
        "Data Engineering",
        "Local Deployment",
        "Automation Workflows",
        "Production-grade Delivery",
      ],
    },
  ],
  zh: [
    {
      name: "AI Layer",
      technologies: [
        "LLM 应用",
        "RAG",
        "AI Agent",
        "多模型协作",
        "可解释性分析",
        "本地智能系统",
      ],
    },
    {
      name: "Chain Layer",
      technologies: [
        "Blockchain Architecture",
        "Smart Contract",
        "Web3",
        "链上数据分析",
        "Tokenomics",
        "可信协议",
      ],
    },
    {
      name: "Engineering Layer",
      technologies: [
        "TypeScript",
        "Python",
        "Next.js",
        "FastAPI",
        "Playwright",
        "LightGBM",
        "数据工程",
        "本地部署",
        "自动化工作流",
        "工程化落地",
      ],
    },
  ],
};

/** 关于我区块里列出的核心研究方向。 */
export const RESEARCH_DIRECTIONS: Record<Locale, readonly string[]> = {
  en: [
    "AI Agent engineering",
    "Blockchain architecture",
    "Smart contracts and on-chain data systems",
    "Local-first intelligent systems",
    "Data-driven pricing and decisioning",
    "Multi-model collaboration workflows",
    "AI tooling products for individuals and small teams",
  ],
  zh: [
    "AI Agent 工程化",
    "Blockchain Architecture",
    "智能合约与链上数据系统",
    "本地优先的智能系统",
    "数据驱动定价与决策",
    "多模型协作工作流",
    "面向个人和小团队的 AI 工具产品",
  ],
};

/** 关于我区块里的 7 年履历时间线(脱敏后挂数字,不挂在职公司名)。 */
export interface TimelineEntry {
  readonly period: string;
  readonly role: string;
  readonly note: string;
}

export const ABOUT_TIMELINE: Record<Locale, readonly TimelineEntry[]> = {
  en: [
    {
      period: "2024.06 – now",
      role: "Architect — large enterprise group",
      note: "Leads the AI business line. Specific group name anonymized for in-job NDA.",
    },
    {
      period: "2021.07 – 2024.05",
      role: "Tech Lead — open consortium chain",
      note: "Cosmos IRITA-based chain; national filing; 16-ministry pilot award; 2 invention patents.",
    },
    {
      period: "2018 – 2021",
      role: "Blockchain R&D Engineer",
      note: "Public-chain customization, smart contracts, anti-counterfeit & notarization, 2 invention patents.",
    },
    {
      period: "2012 – 2018",
      role: "Embedded / Military Communications Engineer",
      note: "Communication modules and host-side systems for defense projects.",
    },
  ],
  zh: [
    {
      period: "2024.06 – 至今",
      role: "某大型集团 · 架构师",
      note: "主导 AI 业务线,具体集团名按在职脱敏。",
    },
    {
      period: "2021.07 – 2024.05",
      role: "自研开放联盟链 · 技术负责人",
      note: "Cosmos IRITA 框架,通过国家网信办备案,十六部委区块链+版权创新试点优秀奖,2 项发明专利。",
    },
    {
      period: "2018 – 2021",
      role: "区块链研发工程师",
      note: "公链定制开发与智能合约研发,落地防伪溯源、存证等多个商业化业务,2 项发明专利。",
    },
    {
      period: "2012 – 2018",
      role: "嵌入式 / 军工通信工程师",
      note: "通信模块与上位机系统开发。",
    },
  ],
};

/** 关于我区块里"我常用的工具"清单(面向私活客户,展示能立刻上手的栈)。 */
export const ABOUT_DIRECTIONS: Record<Locale, readonly string[]> = {
  en: [
    "LangGraph / DeepAgents — multi-agent orchestration",
    "LlamaIndex + Milvus + Elasticsearch — RAG & vector retrieval",
    "MCP — model context protocol & plugin layer",
    "Ollama / 4-bit quantization — on-device LLM",
    "Polars / LightGBM / Optuna / SHAP — data & ML",
    "Python · TypeScript · Go · FastAPI · Next.js · Electron",
    "Cosmos IRITA — consortium chain (history)",
  ],
  zh: [
    "LangGraph / DeepAgents — 多智能体编排",
    "LlamaIndex + Milvus + Elasticsearch — RAG 与向量检索",
    "MCP — Model Context Protocol 与插件层",
    "Ollama / 4-bit 量化 — 端侧 LLM",
    "Polars / LightGBM / Optuna / SHAP — 数据与机器学习",
    "Python · TypeScript · Go · FastAPI · Next.js · Electron",
    "Cosmos IRITA — 联盟链(历史)",
  ],
};
