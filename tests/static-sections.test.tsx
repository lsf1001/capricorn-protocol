import { render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { AboutArchitect } from "@/components/AboutArchitect";
import { ArchitectureModules } from "@/components/ArchitectureModules";
import { Footer } from "@/components/Footer";
import { ForgeSigil } from "@/components/ForgeSigil";
import { OpenChannel } from "@/components/OpenChannel";
import { ProtocolBadge } from "@/components/ProtocolBadge";
import { ProtocolStack } from "@/components/ProtocolStack";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

import { I18nHarness } from "@/tests/helpers/i18n-wrapper";

beforeAll(() => {
  class IntersectionObserverStub {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds: readonly number[] = [0];

    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  globalThis.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver;
});

function withLocale(node: React.ReactNode, locale?: "en" | "zh"): React.ReactElement {
  return <I18nHarness locale={locale}>{node}</I18nHarness>;
}

describe("协议视觉原语", () => {
  it("渲染可访问性隐藏的品牌印记与状态标签", () => {
    const { container } = render(
      <I18nHarness>
        <>
          <ForgeSigil />
          <ProtocolBadge>AI CORE ONLINE</ProtocolBadge>
        </>
      </I18nHarness>,
    );

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("AI CORE ONLINE")).toBeInTheDocument();
  });

  it("按接口渲染章节编号、眉题、标题和说明", () => {
    render(
      <I18nHarness>
        <SectionHeading
          index="[09]"
          eyebrow="SYSTEM MODULE"
          title="系统模块"
          description="模块说明"
        />
      </I18nHarness>,
    );

    expect(screen.getByText("[09]")).toBeInTheDocument();
    expect(screen.getByText("SYSTEM MODULE")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "系统模块" })).toBeInTheDocument();
    expect(screen.getByText("模块说明")).toBeInTheDocument();
  });

  it("多个品牌印记使用独立渐变标识", () => {
    const { container } = render(
      <I18nHarness>
        <>
          <ForgeSigil />
          <ForgeSigil />
        </>
      </I18nHarness>,
    );
    const gradient_ids = Array.from(container.querySelectorAll("linearGradient"), (gradient) => gradient.id);
    expect(new Set(gradient_ids).size).toBe(2);
  });

  it("静态呈现 reveal 内容", () => {
    render(
      <I18nHarness>
        <SectionReveal>稳定呈现</SectionReveal>
      </I18nHarness>,
    );
    expect(screen.getByText("稳定呈现")).toBeInTheDocument();
  });
});

describe("静态协议模块", () => {
  it("呈现四个架构模块及其状态", () => {
    render(withLocale(<ArchitectureModules />));

    const expected_modules = [
      ["AI Architecture", "STATUS: ACTIVE"],
      ["Blockchain Architecture", "STATUS: VERIFIED"],
      ["Agent Engineering", "STATUS: ROUTING"],
      ["Data-driven Products", "STATUS: LEARNING"],
    ];

    for (const [title, status] of expected_modules) {
      const module_title = screen.getByRole("heading", { name: title });
      const module_card = module_title.closest("article");
      expect(module_card).not.toBeNull();
      expect(within(module_card as HTMLElement).getByText(status)).toBeInTheDocument();
    }
  });

  it("呈现完整的 AI、Chain 与 Engineering 协议栈(英文)", () => {
    render(withLocale(<ProtocolStack />));

    expect(screen.getByRole("heading", { name: "AI Layer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Chain Layer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Engineering Layer" })).toBeInTheDocument();
    expect(screen.getByText("Local Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Trusted Protocol")).toBeInTheDocument();
    expect(screen.getByText("Production-grade Delivery")).toBeInTheDocument();
  });

  it("呈现架构师介绍、研究方向和契约 hash", () => {
    render(withLocale(<AboutArchitect />));

    expect(screen.getByText("I am Laobai — blockchain architect × AI architect.")).toBeInTheDocument();
    expect(screen.getByText("AI Agent engineering")).toBeInTheDocument();
    expect(
      screen.getByText("Capricorn engineering creed: less conceptual noise, more system certainty."),
    ).toBeInTheDocument();
    expect(screen.getByText("0xCAPRICORN-ARCHITECT-2026")).toBeInTheDocument();
  });

  it("提供可点击的 GitHub 与邮箱连接", () => {
    render(withLocale(<OpenChannel />));

    expect(screen.getByRole("link", { name: "https://github.com/lsf1001" })).toHaveAttribute(
      "href",
      "https://github.com/lsf1001",
    );
    expect(screen.getByRole("link", { name: "yexiaobai1001@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:yexiaobai1001@gmail.com",
    );
    expect(screen.getByText("> wechat = private")).toBeInTheDocument();
    expect(screen.getByText("Private")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "https://github.com/lsf1001" })).toHaveAttribute(
      "rel",
      "noreferrer",
    );
  });

  it("呈现 2026 年版权与协议界面名称", () => {
    render(withLocale(<Footer />));

    expect(screen.getByText("© 2026 0xForge. Built by Laobai.")).toBeInTheDocument();
    expect(screen.getByText("Capricorn Protocol Interface")).toBeInTheDocument();
    expect(screen.getByText("0xCAPRICORN-ARCHITECT-2026")).toBeInTheDocument();
  });
});
