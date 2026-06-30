/**
 * 极简客户端 i18n。
 *
 * 字典是嵌套的对象,键以点号路径访问(`t("hero.bootlog")`)。locale 之间切换靠
 * {@link I18nProvider} 持有的 state;`localStorage` 持久化用户偏好。
 */

export const LOCALES = ["en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** 切换 locale 时持久化的 key,放在一个 namespace 下避免与其它库冲突。 */
export const LOCALE_STORAGE_KEY = "capricorn.locale";

/** UI 上对外展示的语言标签,使用本地文字增强可读性。 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** 写入 `<html lang>` 时使用的 BCP-47 标签。 */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

/** 字典节点:可嵌套对象或叶子字符串。 */
export type DictNode = string | { [key: string]: DictNode };

/** 单语言字典:全树叶子都是字符串。 */
export interface Dict {
  [section: string]: string | { [key: string]: string | Dict };
}

/** 当前 locale 字典未命中时,fallback 到英文。 */
export type DictMap = Record<Locale, Dict>;

/**
 * 沿点号路径查找字典值;任一段失败返回 undefined。
 */
export function lookup_dict(dict: Dict | undefined, path: string): string | undefined {
  if (!dict) {
    return undefined;
  }
  const segments = path.split(".");
  let current: DictNode | undefined = dict;
  for (const segment of segments) {
    if (current === undefined || typeof current === "string") {
      return undefined;
    }
    current = (current as { [key: string]: DictNode })[segment];
  }
  return typeof current === "string" ? current : undefined;
}

/**
 * 组合 lookup:先查当前 locale,再 fallback 到英文,最后回退到 key 自身(避免 silent bug)。
 */
export function translate(
  translations: DictMap,
  locale: Locale,
  key: string,
): string {
  const primary = lookup_dict(translations[locale], key);
  if (primary !== undefined) {
    return primary;
  }
  if (locale !== DEFAULT_LOCALE) {
    const fallback = lookup_dict(translations[DEFAULT_LOCALE], key);
    if (fallback !== undefined) {
      return fallback;
    }
  }
  return key;
}

/** 解析 localStorage / cookie 中存储的 locale,无法识别时返回 null。 */
export function parse_locale(value: string | null | undefined): Locale | null {
  if (value === "en" || value === "zh") {
    return value;
  }
  return null;
}
