import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { DEFAULT_LOCALE, HTML_LANG } from "@/lib/i18n/types";
import { GITHUB_PROFILE_URL } from "@/lib/profile";

/**
 * 默认元数据走英文 —— 这样 layout 不读 cookies()，
 * 让 ISR 缓存继续生效。client 端语言切换只影响正文;
 * `<html lang>` 会在 Provider mount 后被 mutate。
 */
export const metadata: Metadata = {
  title: "Laobai | 0xForge · Capricorn Protocol",
  description:
    "Laobai's AI × Blockchain architecture lab 0xForge: build trustworthy intelligent systems — forge AI agents, on-chain data, smart contracts and engineering into production-grade machinery.",
  keywords: [
    "Laobai",
    "老白",
    "0xForge",
    "Capricorn Protocol",
    "摩羯契约",
    "AI Architect",
    "Blockchain Architect",
    "AI Agent",
    "Web3",
    "Smart Contract",
    "RAG",
    "LLM",
    "可信智能系统",
    "Trustworthy Intelligence",
  ],
  authors: [{ name: "Laobai", url: GITHUB_PROFILE_URL }],
  creator: "Laobai · 0xForge",
  openGraph: {
    title: "Laobai | 0xForge · Capricorn Protocol",
    description:
      "AI × Blockchain architecture lab — forging models, chains and engineering into trustworthy intelligent systems.",
    type: "website",
    locale: "en_US",
    siteName: "0xForge · Capricorn Protocol",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laobai | 0xForge · Capricorn Protocol",
    description: "AI × Blockchain architecture lab — entry point for trustworthy intelligence systems.",
  },
  robots: { index: true, follow: true },
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

/** 站点根布局与全局元数据入口。 */
export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang={HTML_LANG[DEFAULT_LOCALE]}>
      <body>
        <I18nProvider initialLocale={DEFAULT_LOCALE}>{children}</I18nProvider>
      </body>
    </html>
  );
}
