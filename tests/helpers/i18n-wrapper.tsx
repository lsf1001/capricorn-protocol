import type { ReactElement, ReactNode } from "react";

import { I18nProvider } from "@/components/I18nProvider";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";

interface I18nHarnessProps {
  children: ReactNode;
  locale?: Locale;
}

/**
 * 测试用 I18nProvider wrapper。
 * 默认锁定到与生产一致的 DEFAULT_LOCALE("en"),
 * 除非显式传入另一个 locale(用于测试中文分支时)。
 */
export function I18nHarness({ children, locale = DEFAULT_LOCALE }: I18nHarnessProps): ReactElement {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
