import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

import { I18nHarness } from "@/tests/helpers/i18n-wrapper";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
});

describe("Navbar", () => {
  it("展开移动菜单并支持 Escape 关闭", () => {
    render(
      <I18nHarness>
        <Navbar />
      </I18nHarness>,
    );
    const menuButton = screen.getByRole("button", { name: "Open navigation menu" });

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("提供页面锚点和安全的 GitHub 外链", () => {
    render(
      <I18nHarness>
        <Navbar />
      </I18nHarness>,
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#repositories");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/lsf1001");
  });

  it("使用平滑滚动并触发目标模块扫描线", () => {
    const target = document.createElement("section");
    target.id = "repositories";
    target.scrollIntoView = vi.fn();
    document.body.append(target);
    render(
      <I18nHarness>
        <Navbar />
      </I18nHarness>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Projects" }));

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(target).toHaveClass("section-scan-active");
    target.remove();
  });
});

describe("Hero", () => {
  it("展示主标题、品牌定位和接活入口的四个主要操作(英文)", () => {
    render(
      <I18nHarness>
        <Hero />
      </I18nHarness>,
    );
    expect(
      screen.getByRole("heading", { name: /I take AI × Blockchain contracts\./ }),
    ).toBeInTheDocument();
    expect(screen.getByText("LAOBAI · CONTRACTING")).toBeInTheDocument();
    expect(screen.getByText("CAPRICORN PROTOCOL · HIRING MODE")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Services" })).toHaveAttribute("href", "#services");
    expect(screen.getByRole("link", { name: "Case Studies" })).toHaveAttribute("href", "#cases");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/lsf1001");
    expect(screen.getByRole("link", { name: "Hire Me" })).toHaveAttribute("href", "#contact");
  });
});
