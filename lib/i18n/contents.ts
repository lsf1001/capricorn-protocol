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
