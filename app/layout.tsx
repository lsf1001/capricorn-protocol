import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { DEFAULT_LOCALE, HTML_LANG } from "@/lib/i18n/types";
import {
  CONTACT_EMAIL,
  GITHUB_PROFILE_URL,
  PERSON_FULL_NAME,
  PERSON_HANDLE,
  PERSON_JOB_TITLE,
  SITE_BRAND,
  SITE_URL,
} from "@/lib/profile";

const TITLE = "Laobai · AI × Blockchain Architect · Open to Contracts";
const DESCRIPTION =
  "Laobai (令帅锋) — 7-year AI × Blockchain architect, currently leading the AI line of a large enterprise group. Open to contracts: AI agent harnesses, multimodal RAG, data pipelines, on-device AI. NDA-friendly, 48h reply, remote-first.";
const OG_DESCRIPTION =
  "AI × Blockchain architect, open to contracts. End-to-end delivery: agent harnesses, RAG, data pipelines, on-device AI.";

/**
 * 默认元数据走英文 —— 这样 layout 不读 cookies()，
 * 让 ISR 缓存继续生效。client 端语言切换只影响正文；
 * `<html lang>` 会在 Provider mount 后被 mutate。
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${PERSON_HANDLE}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_BRAND,
  keywords: [
    "Laobai",
    "老白",
    "令帅锋",
    "0xForge",
    "Capricorn Protocol",
    "摩羯契约",
    "AI Architect",
    "Blockchain Architect",
    "AI Agent",
    "Multi-Agent Harness",
    "Web3",
    "Smart Contract",
    "RAG",
    "Multimodal RAG",
    "LLM",
    "On-device AI",
    "Data Pipeline",
    "LightGBM",
    "Freelance",
    "Open to Contracts",
  ],
  authors: [{ name: PERSON_HANDLE, url: GITHUB_PROFILE_URL }],
  creator: `${PERSON_HANDLE} · 0xForge`,
  publisher: PERSON_HANDLE,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "zh-CN": SITE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    siteName: SITE_BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
    creator: `@${PERSON_HANDLE}`,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#02030a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_FULL_NAME,
  alternateName: PERSON_HANDLE,
  jobTitle: PERSON_JOB_TITLE,
  description: DESCRIPTION,
  url: SITE_URL,
  sameAs: [
    GITHUB_PROFILE_URL,
    `mailto:${CONTACT_EMAIL}`,
  ],
  knowsAbout: [
    "AI Agent Engineering",
    "Multi-Agent Harness",
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "Blockchain Architecture",
    "Smart Contracts",
    "On-device AI",
    "Data Engineering",
    "Machine Learning",
  ],
  workLocation: {
    "@type": "Place",
    name: "Remote",
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_BRAND,
  alternateName: "0xForge",
  url: SITE_URL,
  inLanguage: ["en-US", "zh-CN"],
  description: DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: PERSON_HANDLE,
    url: GITHUB_PROFILE_URL,
  },
};

const PROFESSIONAL_SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${PERSON_HANDLE} · AI × Blockchain Contracting`,
  url: SITE_URL,
  description: OG_DESCRIPTION,
  areaServed: "Worldwide",
  serviceType: [
    "AI Agent Harness",
    "Multi-Agent Systems",
    "Multimodal RAG Knowledge Base",
    "Data Pipeline & ML Modeling",
    "On-device AI Deployment",
    "Blockchain Architecture",
  ],
  provider: {
    "@type": "Person",
    name: PERSON_HANDLE,
    url: SITE_URL,
  },
};

/** 站点根布局与全局元数据入口。 */
export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang={HTML_LANG[DEFAULT_LOCALE]}>
      <body>
        <I18nProvider initialLocale={DEFAULT_LOCALE}>{children}</I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_SERVICE_JSON_LD) }}
        />
      </body>
    </html>
  );
}