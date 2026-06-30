"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { translations } from "@/lib/i18n/dicts";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  LOCALE_STORAGE_KEY,
  parse_locale,
  translate,
  type Locale,
} from "@/lib/i18n/types";

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggle: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function read_persisted_locale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return parse_locale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return null;
  }
}

function write_persisted_locale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // 隐身模式或存储满;忽略,刷新后下次访问回退到默认 locale。
  }
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

/**
 * 提供 locale state、字典查找与 localStorage 持久化。
 * mount 时读取一次持久化值,并跟随 <html lang>。
 */
export function I18nProvider({
  children,
  initialLocale,
}: I18nProviderProps): React.JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);

  useEffect(() => {
    const persisted = read_persisted_locale();
    if (persisted && persisted !== locale) {
      setLocaleState(persisted);
    }
    // 仅在 mount 读取一次;Locale 的更新是用户主动行为,不应被持久化值覆盖。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = HTML_LANG[locale];
    }
    write_persisted_locale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (LOCALES.includes(next)) {
      setLocaleState(next);
    }
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((current) => (current === "en" ? "zh" : "en"));
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const raw = translate(translations, locale, key);
      return interpolate(raw, params);
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggle, t }),
    [locale, setLocale, toggle, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n 必须在 I18nProvider 内部使用");
  }
  return ctx;
}
