import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/RepositoryConstellationSection", () => ({
  RepositoryConstellationSection: () => <div>Repository stub</div>,
}));

import RootLayout, { metadata } from "@/app/layout";
import Page, * as page_module from "@/app/page";

import { I18nHarness } from "@/tests/helpers/i18n-wrapper";

describe("站点 Metadata", () => {
  it("声明 Laobai 品牌标题与英文架构实验室描述", () => {
    expect(metadata.title).toBe("Laobai | 0xForge · Capricorn Protocol");
    expect(metadata.description).toContain("AI × Blockchain architecture lab");
    expect(metadata.keywords).toContain("AI Architect");
    expect(metadata.keywords).toContain("Trustworthy Intelligence");
  });
});

describe("页面结构", () => {
  it("启用一小时页面级增量缓存且不强制动态渲染", () => {
    expect(page_module.revalidate).toBe(3600);
    expect("dynamic" in page_module).toBe(false);
  });

  it("按协议顺序组合全部内容区块", () => {
    const { container } = render(
      <I18nHarness>
        <Page />
      </I18nHarness>,
    );
    expect(container.querySelector("#home")).toBeInTheDocument();
    expect(container.querySelector("#architecture")).toBeInTheDocument();
    expect(container.querySelector("#repositories")).toBeInTheDocument();
    expect(container.querySelector("#stack")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByText("Repository stub")).toBeInTheDocument();
    expect(screen.getByText("© 2026 0xForge. Built by Laobai.")).toBeInTheDocument();
  });

  it("根布局默认声明英文 html lang", () => {
    const layout = RootLayout({ children: <div>content</div> });
    expect(layout.props.lang).toBe("en");
  });
});
