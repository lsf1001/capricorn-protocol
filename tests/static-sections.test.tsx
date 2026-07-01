import { render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { AboutArchitect } from "@/components/AboutArchitect";
import { CaseStudies } from "@/components/CaseStudies";
import { Footer } from "@/components/Footer";
import { ForgeSigil } from "@/components/ForgeSigil";
import { OpenChannel } from "@/components/OpenChannel";
import { ProtocolBadge } from "@/components/ProtocolBadge";
import { ProtocolStack } from "@/components/ProtocolStack";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { ServicesSection } from "@/components/ServicesSection";

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
  it("呈现四个接活服务卡片与首屏 CTA", () => {
    render(withLocale(<ServicesSection />));

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /AI Agent Harness/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Multimodal RAG/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Data Governance/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /On-device AI/i })).toBeInTheDocument();
    expect(screen.getByText("NDA-friendly · 48h reply · remote-first")).toBeInTheDocument();
    expect(screen.getByText("Reference: Nexus (open source)")).toBeInTheDocument();
  });

  it("呈现四个案例卡(open source 案例带 GitHub 链接)", () => {
    render(withLocale(<CaseStudies />));

    expect(screen.getByRole("heading", { name: /Nexus/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Furion/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /qiqi-voice/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /National-pilot/i })).toBeInTheDocument();

    const github_links = screen.getAllByRole("link", { name: /View on GitHub/i });
    expect(github_links.length).toBe(3);
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

  it("呈现架构师介绍、常用工具和契约 hash", () => {
    render(withLocale(<AboutArchitect />));

    expect(
      screen.getByText(/7 years of building production AI × Blockchain systems/),
    ).toBeInTheDocument();
    expect(screen.getByText(/LangGraph \/ DeepAgents/)).toBeInTheDocument();
    expect(
      screen.getByText(/Less conceptual noise, more system certainty\./),
    ).toBeInTheDocument();
    expect(screen.getByText("0xLAOBAI-CONTRACTOR-2026")).toBeInTheDocument();
  });

  it("提供可点击的 GitHub 与邮箱连接", () => {
    render(withLocale(<OpenChannel />));

    expect(screen.getByRole("link", { name: "https://github.com/lsf1001" })).toHaveAttribute(
      "href",
      "https://github.com/lsf1001",
    );
    expect(screen.getByRole("link", { name: "yexiaobai1001@gmail.com" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:yexiaobai1001@gmail\.com\?/),
    );
    expect(screen.getByText("> wechat = on_request")).toBeInTheDocument();
    expect(screen.getByText("By request")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "https://github.com/lsf1001" })).toHaveAttribute(
      "rel",
      "noreferrer",
    );
  });

  it("呈现 2026 年版权与协议界面名称", () => {
    render(withLocale(<Footer />));

    expect(screen.getByText("© 2026 0xForge · Laobai. Open to contracts.")).toBeInTheDocument();
    expect(screen.getByText("Capricorn Protocol Interface")).toBeInTheDocument();
    expect(screen.getByText("0xLAOBAI-CONTRACTOR-2026")).toBeInTheDocument();
  });
});
