import type { Dict } from "@/lib/i18n/types";

/**
 * 英文文案。所有用户可见的副本在这里集中维护；
 * 缺 key 时会自动回退到 {@link translate} 内的 fallback 链。
 *
 * 文案方向(2026-07):首屏从"lab"调成"接活入口",面向私活客户。
 * 现公司项目(大唐西市集团)一律脱敏:只挂数字结果,不挂公司/项目名。
 */
export const en: Dict = {
  common: {
    appName: "0xForge · Capricorn Protocol",
    repositoryTitle: "Repository Constellation",
    repositoryLoadingDescription:
      "Public GitHub repositories mapped as a forest of technology nodes — every clearing holds an experiment, tool, or a system in progress.",
  },
  nav: {
    home: "Home",
    architecture: "Services",
    repositories: "Projects",
    stack: "Stack",
    about: "About",
    contact: "Hire Me",
    brandAria: "0xForge · Home",
    desktopAria: "Primary navigation",
    mobileAria: "Mobile navigation",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    statusActive: "ACTIVE",
    statusOpen: "OPEN",
    statusExternal: "EXTERNAL",
    localeToggle: "Language",
    localeToggleAria: "Switch language",
    localeSwitchTo: "Switch to {label}",
  },
  hero: {
    protocolMark: "CAPRICORN PROTOCOL · HIRING MODE",
    protocolMeta: "0xA7F · 2026 · OPEN TO CONTRACTS",
    brandPrefix: "LAOBAI · CONTRACTING",
    brandValue: "AI × Blockchain Architect",
    titleAccessible: "I take AI × Blockchain contracts.",
    identityBlockchain: "AI × Blockchain Architect",
    identityAi: "Open to Contracts · NDA-friendly",
    labPrefixEn: "EN",
    labTextEn: "Open to contracts · 7 years production",
    labPrefixCn: "CN",
    labTextCn: "可接私活 · 7 年企业级落地",
    statement:
      "I build production-grade AI systems that ship — multi-agent harnesses, RAG knowledge bases, data pipelines and explainable models. Drop the brief, I sign the NDA, we ship.",
    ctaRepos: "View Services",
    ctaGithub: "GitHub",
    ctaContact: "Hire Me",
    ctaCase: "Case Studies",
    feedbackRepos: "ROUTING TO SERVICES",
    feedbackGithub: "OPENING GITHUB NODE",
    feedbackContact: "OPENING HIRING CHANNEL",
    feedbackCase: "OPENING CASE STUDIES",
    bootlogLabel: "SYSTEM BOOTLOG",
    bootlogAria: "System boot status",
    bootLine1: "> initializing laobai.identity...",
    bootLine2: "> mode = open_to_contracts...",
    bootLine3: "> binding 4 service layers + 4 patents...",
    bootLine4: "> system ready. nda-friendly.",
    visualLabel: "HIRING REACTOR · ACTIVE",
    visualStatus: "SIGNING · 0xCONTRACT-OPEN",
  },
  heading: {
    repositories: "Project Constellation",
    stack: "Stack",
    about: "About",
    contact: "Hire Me",
  },
  services: {
    title: "Services",
    eyebrow: "WHAT I SHIP",
    indexLabel: "[01]",
    intro:
      "Four categories of work I take on as a contractor — each backed by shipped, production-grade systems (open source or under NDA).",
    nda: "NDA-friendly · 48h reply · remote-first",
    ctaBrief: "Send a brief",
    ctaGithub: "See on GitHub",
    agent: {
      title: "AI Agent Harness & Multi-Agent",
      desc: "End-to-end agent platforms: memory systems, quality gates, MCP plugin layer, multi-channel routing, Electron desktop packaging. From 0 to 1, not a demo.",
      metric: "421 unit tests · 176MB one-click installer",
      caseLabel: "Reference: Nexus (open source)",
    },
    rag: {
      title: "Multimodal RAG Knowledge Base",
      desc: "Enterprise-grade RAG: LlamaIndex + LangGraph + MCP, hybrid retrieval (BM25 + vector), rerank, offline indexing, online Q&A decoupled. Recall 90%+, end-to-end answer accuracy 30 → 85%.",
      metric: "Recall 90%+ · accuracy 85% · <2s response",
      caseLabel: "Reference: shipped at large enterprise (NDA)",
    },
    data: {
      title: "Data Governance & ML Modeling",
      desc: "Polars-based million-row data cleaning, three-tier rule system, explainable LightGBM pricing/decision models, Optuna + SHAP, time-series split to avoid leakage.",
      metric: "MAPE 4.23% on Huawei phones · 12.3w clean rows from 33w raw",
      caseLabel: "Reference: Furion (open source)",
    },
    privateai: {
      title: "AI Private Deployment & On-device AI",
      desc: "LLM / multimodal model quantization, Apple Silicon MPS adaptation, Ollama offline deployment, Skill packaging. Zero SaaS dependency, data never leaves the box.",
      metric: "30 languages · 4-bit quantization · ~70% cost cut",
      caseLabel: "Reference: qiqi-voice (open source)",
    },
  },
  cases: {
    title: "Case Studies",
    eyebrow: "WHAT I SHIPPED",
    indexLabel: "[04]",
    intro:
      "Selected work — open-source repos are linked; in-house projects are anonymized but the metrics are real.",
    problem: "Problem",
    solution: "Approach",
    stack: "Stack",
    results: "Results",
    linkGithub: "View on GitHub",
    linkReadMore: "Read more",
    nexus: {
      title: "Nexus — Local Multi-Agent Harness",
      problem: "Need a production-grade, locally-runnable multi-agent platform with memory, quality gates, multi-channel routing and a desktop installer — not a chat demo.",
      solution:
        "DeepAgents SDK + FastAPI + WebSocket + React 19 + Electron three-process stack; five-stage streaming protocol; Channel abstraction layer replaces hardcoded WeChat with pluggable channels; Memory middleware + LangGraph store with write-protection; 421 unit tests, 176MB one-click package, Apache-2.0.",
      stack: "Python · DeepAgents · FastAPI · WebSocket · React 19 · Electron · LangGraph",
      results: "421 unit tests · 176MB one-click · Channel plug-and-play · 7-year production mindset",
      link: "https://github.com/lsf1001/nexus",
    },
    furion: {
      title: "Furion — B2B Second-hand Phone Pricing",
      problem: "Manual pricing for used Apple/Huawei phones was slow and inconsistent. Need a sub-second, production-grade automated valuation that covers 95%+ of mainstream models.",
      solution:
        "Five-source hierarchical pricing architecture (in-house deals + ERP base → market trend adjustment → competitor cross-check); 19-feature dual-brand system; 8:1:1 time-series split; Optuna 50-round Bayesian tuning + SHAP explainability + median-shift calibration.",
      stack: "Python · LightGBM · Optuna · SHAP · Polars",
      results: "Huawei MAPE 4.23% · Apple MAPE 9.77% · 210k+ quotes delivered",
      link: "https://github.com/lsf1001/furion",
    },
    qiqi: {
      title: "qiqi-voice — On-device TTS Skill",
      problem: "Cloud TTS is expensive, leaks data, and doesn't survive network loss. Need a 30-language, on-device, zero-SaaS voice stack with voice cloning.",
      solution:
        "OpenBMB VoxCPM2 + pnpm monorepo + Python/FastAPI inference service; Apple Silicon MPS adaptation + fp32 verification; 13 preset voices + voice cloning + voice design; 176MB one-click package under Apache-2.0.",
      stack: "VoxCPM2 · pnpm monorepo · FastAPI · Apple Silicon MPS",
      results: "30 languages · 13 voices · voice cloning · 100% on-device",
      link: "https://github.com/lsf1001/qiqi-voice",
    },
    chain: {
      title: "DaTang Chain — National-pilot Consortium Blockchain (anonymized)",
      problem:
        "Build a consortium chain from scratch, get it filed with the Cyberspace Administration, and deliver a national-level copyright-on-chain pilot project.",
      solution:
        "Lead architect on a Cosmos IRITA-based open consortium chain; bottom-up optimization; full lifecycle from R&D to national filing to industry rollout; 2 invention patents filed in this period.",
      stack: "Cosmos IRITA · Smart contracts · On-chain indexing",
      results: "National filing passed · 16-ministry pilot award · 2 patents",
    },
  },
  stack: {
    aiAria: "AI Layer technologies",
    chainAria: "Chain Layer technologies",
    engineeringAria: "Engineering Layer technologies",
  },
  repo: {
    githubRepoCard: {
      type: "REPOSITORY NODE",
      nodePrefix: "NODE /",
      topicsAria: "Repository topics",
      updatedAt: "Updated {date}",
      viewOnGithub: "View {name} on GitHub",
      viewHomepage: "Visit {name} homepage",
      githubLabel: "GitHub",
      liveLabel: "Live",
    },
    lang: {
      all: "All",
      ts: "TypeScript",
      js: "JavaScript",
      python: "Python",
      java: "Java",
      solidity: "Solidity",
      go: "Go",
      rust: "Rust",
      other: "Other",
    },
    toolbarAria: "Filter by programming language",
    sortAria: "Repository sort",
    sortUpdated: "Recently updated",
    sortStars: "Most stars",
    sortName: "Sort by name",
    emptyTitle: "No public repositories to display.",
    emptyHint:
      "Adjust the language filter, or reconnect the constellation in a moment.",
    overlayTitle: "FOREST OF REPOSITORIES",
    clearingOne: "{count} clearing",
    clearingOther: "{count} clearings",
    nodesAria: "Repository nodes",
    forestAria: "Forest map of repositories",
    viewDetails: "View {name} details",
    drawerAria: "{name} details",
    closeAria: "Close",
    errorTitle:
      "GitHub constellation is temporarily offline, but the lab is still running.",
    errorHint:
      "The public repository connection will retry on the next protocol refresh.",
    constellationDescription:
      "Public GitHub repositories mapped as a forest of technology nodes — every clearing holds an experiment, tool, or a system in progress.",
  },
  about: {
    lead: "7 years of building production AI × Blockchain systems — for paying customers, not on a leaderboard.",
    intro:
      "Currently architecting the AI line of a large enterprise group. Previously led an open consortium chain through national filing and a 16-ministry pilot. I take contracts end-to-end: problem framing, architecture, delivery, hand-off. NDA-friendly, 48-hour reply, remote-first.",
    timelineLabel: "7 years of building",
    timelineTitle: "Career timeline",
    questions: `What I focus on:
End-to-end ownership — not a 200-page architecture deck, a working system.
Production-grade from day one — tests, packaging, KPIs, hand-off.
Explainable models — SHAP, not black boxes.
Cost-aware design — quantization, polling, batching, serverless.
NDA-friendly — you own the IP, I sign your paperwork.`,
    directionLabel: "Tools I reach for:",
    directionsAria: "Tools I reach for",
    creed: "Less conceptual noise, more system certainty. NDA-friendly, 48h reply, remote-first.",
    contractHashLabel: "Capricorn contract hash",
    contractHash: "0xLAOBAI-CONTRACTOR-2026",
  },
  open: {
    githubLabel: "GitHub",
    emailLabel: "Email",
    wechatLabel: "WeChat",
    wechatPrivate: "By request",
    note: "For project inquiries, send the brief below to email — I reply within 48 hours.",
    protocolAria: "Connection protocol status",
    protocolStatus: "> hiring.status = open",
    protocolGithub: "> github.node = {handle}",
    protocolCollaboration: "> collaboration.mode = remote_first",
    protocolName: "> protocol = nda_friendly",
    protocolContact: "> contact.email = {email}",
    protocolWechat: "> wechat = on_request",
    briefLabel: "Project brief template",
    briefHelp: "Send these to the email below. I reply within 48 hours.",
    briefType: "Project type",
    briefTypeHint: "Agent harness / RAG / data pipeline / private AI / on-chain",
    briefBudget: "Budget range",
    briefBudgetHint: "e.g. ¥50k–150k, USD 10k–30k, equity-flexible",
    briefTimeline: "Timeline",
    briefTimelineHint: "MVP in 4 weeks / full delivery in 3 months / ongoing retainer",
    briefStack: "Stack & constraints",
    briefStackHint: "Required languages, infra, on-prem vs cloud, existing systems",
    briefEmailCta: "Email me the brief",
  },
  footer: {
    copyright: "© 2026 0xForge · Laobai. Open to contracts.",
    interface: "Capricorn Protocol Interface",
    contractHashLabel: "Capricorn contract hash",
  },
  metadata: {
    title: "Laobai · AI × Blockchain Architect · Open to Contracts",
    description:
      "Laobai (令帅锋) — 7-year AI × Blockchain architect, currently leading the AI line of a large enterprise group. Open to contracts: AI agent harnesses, multimodal RAG, data pipelines, on-device AI. NDA-friendly, 48h reply, remote-first.",
    ogDescription:
      "AI × Blockchain architect, open to contracts. End-to-end delivery: agent harnesses, RAG, data pipelines, on-device AI.",
    twitterTitle: "Laobai · AI × Blockchain Architect · Open to Contracts",
    twitterDescription:
      "7-year AI × Blockchain architect. Open to contracts — agent harnesses, RAG, data, on-device AI. NDA-friendly, 48h reply.",
  },
};
