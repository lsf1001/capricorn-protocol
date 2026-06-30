import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  parse_locale,
  translate,
  type Locale,
} from "@/lib/i18n/types";

import { translations } from "@/lib/i18n/dicts";

/**
 * 仅在 server component 中使用:根据 cookie 决定当前 locale。
 * 因为 Next.js metadata、<html lang> 与 SSR fallback 都依赖这个值,
 * 所以 layout / page / 异步 server component 都会调用它。
 */
export async function read_server_locale(): Promise<Locale> {
  const store = await cookies();
  return parse_locale(store.get(LOCALE_STORAGE_KEY)?.value) ?? DEFAULT_LOCALE;
}

/**
 * 服务端版的字典查找:不带插值,因为所有 server-side 文案都是静态字段。
 * 复用 {@link translate} 的 fallback 链。
 */
export function t_server(locale: Locale, key: string): string {
  return translate(translations, locale, key);
}
