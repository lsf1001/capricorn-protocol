import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { I18nProvider, useI18n } from "@/components/I18nProvider";
import { LocaleToggle } from "@/components/Navbar";
import { lookup_dict, parse_locale, translate, type Dict } from "@/lib/i18n/types";
import { translations } from "@/lib/i18n/dicts";

/**
 * 在 jsdom 中 `localStorage` 默认不存在;用一个最小内存版 stub 它,
 * 让 I18nProvider 的持久化与读取都能在测试里走完整路径。
 */
class MemoryStorage implements Storage {
  private data = new Map<string, string>();

  clear(): void {
    this.data.clear();
  }

  getItem(key: string): string | null {
    return this.data.has(key) ? (this.data.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null;
  }

  get length(): number {
    return this.data.size;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    writable: true,
    value: new MemoryStorage(),
  });
});

describe("字典工具与 fallback", () => {
  it("lookup_dict 沿点号路径查找", () => {
    const dict: Dict = {
      nav: {
        home: "Home",
        deep: { deeper: "Bottom" },
      },
    };
    expect(lookup_dict(dict, "nav.home")).toBe("Home");
    expect(lookup_dict(dict, "nav.deep.deeper")).toBe("Bottom");
    expect(lookup_dict(dict, "nav.missing")).toBeUndefined();
    expect(lookup_dict(dict, "missing.deep")).toBeUndefined();
    expect(lookup_dict(undefined, "nav.home")).toBeUndefined();
  });

  it("translate 在缺 key 时回退到英文,再回退到 key 自身", () => {
    expect(translate(translations, "en", "nav.home")).toBe("Home");
    expect(translate(translations, "zh", "nav.home")).toBe("首页");
    expect(translate(translations, "en", "nope.does.not.exist")).toBe(
      "nope.does.not.exist",
    );
  });

  it("translate 当 zh 缺 key 时回退到 en 的 fallback 链", () => {
    const partial_zh: Dict = {};
    const partial_map = { en: translations.en, zh: partial_zh } as typeof translations;
    expect(translate(partial_map, "zh", "missing.completely.unknown")).toBe(
      "missing.completely.unknown",
    );
  });

  it("parse_locale 只接受合法 locale", () => {
    expect(parse_locale("en")).toBe("en");
    expect(parse_locale("zh")).toBe("zh");
    expect(parse_locale("fr")).toBeNull();
    expect(parse_locale(null)).toBeNull();
    expect(parse_locale(undefined)).toBeNull();
    expect(parse_locale("")).toBeNull();
  });
});

describe("I18nProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  function Probe(): React.JSX.Element {
    const { locale, t, toggle } = useI18n();
    return (
      <div>
        <span data-testid="probe-locale">{locale}</span>
        <span data-testid="probe-home">{t("nav.home")}</span>
        <span data-testid="probe-interp">
          {t("open.protocolGithub", { handle: "lsf1001" })}
        </span>
        <button data-testid="probe-toggle" type="button" onClick={toggle}>
          switch
        </button>
      </div>
    );
  }

  it("默认 locale 为英文,t() 返回英文副本", () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByTestId("probe-locale")).toHaveTextContent("en");
    expect(screen.getByTestId("probe-home")).toHaveTextContent("Home");
  });

  it("initialLocale=zh 切换上下文语言", () => {
    render(
      <I18nProvider initialLocale="zh">
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByTestId("probe-locale")).toHaveTextContent("zh");
    expect(screen.getByTestId("probe-home")).toHaveTextContent("首页");
  });

  it("toggle 在 en / zh 之间切换并更新副本", () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByTestId("probe-home")).toHaveTextContent("Home");

    act(() => {
      fireEvent.click(screen.getByTestId("probe-toggle"));
    });
    expect(screen.getByTestId("probe-locale")).toHaveTextContent("zh");
    expect(screen.getByTestId("probe-home")).toHaveTextContent("首页");

    act(() => {
      fireEvent.click(screen.getByTestId("probe-toggle"));
    });
    expect(screen.getByTestId("probe-locale")).toHaveTextContent("en");
    expect(screen.getByTestId("probe-home")).toHaveTextContent("Home");
  });

  it("interpolation 把 {handle} 占位符替换成入参", () => {
    render(
      <I18nProvider initialLocale="en">
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByTestId("probe-interp")).toHaveTextContent(
      "> github.node = lsf1001",
    );
  });

  it("切换语言时把 <html lang> 改为对应 BCP-47 标签", () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );
    expect(document.documentElement.lang).toBe("en");

    act(() => {
      fireEvent.click(screen.getByTestId("probe-toggle"));
    });
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("切换语言时写 localStorage,刷新后保持偏好", () => {
    const { unmount } = render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId("probe-toggle"));
    });
    expect(window.localStorage.getItem("capricorn.locale")).toBe("zh");

    unmount();
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );
    expect(screen.getByTestId("probe-locale")).toHaveTextContent("zh");
  });
});

describe("Navbar LocaleToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("渲染当前 locale 标签并把切换目标描述到 aria-label", () => {
    render(
      <I18nProvider initialLocale="en">
        <LocaleToggle />
      </I18nProvider>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("English");
    expect(button).toHaveAccessibleName("Switch to 中文");
  });

  it("点击切换 locale", () => {
    render(
      <I18nProvider initialLocale="en">
        <LocaleToggle />
      </I18nProvider>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("中文");
    expect(screen.getByRole("button")).toHaveAccessibleName("切换到 English");
  });
});
