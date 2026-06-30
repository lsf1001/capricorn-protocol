import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RepositoryForestMap } from "@/components/RepositoryForestMap";
import { RepositorySkeleton } from "@/components/RepositorySkeleton";
import type { GithubRepo } from "@/types/github";

import { I18nHarness } from "@/tests/helpers/i18n-wrapper";

const REPOSITORIES: GithubRepo[] = [
  {
    id: 1,
    name: "chain-indexer",
    description: "链上索引实验",
    language: "Python",
    stargazers_count: 3,
    forks_count: 1,
    updated_at: "2026-01-01T00:00:00Z",
    topics: ["blockchain", "indexer"],
    html_url: "https://github.com/lsf1001/chain-indexer",
    homepage: null,
    fork: false,
  },
  {
    id: 2,
    name: "agent-router",
    description: "多模型路由器",
    language: "TypeScript",
    stargazers_count: 9,
    forks_count: 2,
    updated_at: "2026-03-01T00:00:00Z",
    topics: [],
    html_url: "https://github.com/lsf1001/agent-router",
    homepage: "https://example.com/agent-router",
    fork: false,
  },
  {
    id: 3,
    name: "forge-contracts",
    description: "可信合约节点",
    language: "Solidity",
    stargazers_count: 5,
    forks_count: 0,
    updated_at: "2026-02-01T00:00:00Z",
    topics: ["contracts"],
    html_url: "https://github.com/lsf1001/forge-contracts",
    homepage: null,
    fork: false,
  },
];

function renderForrest(locale?: "en" | "zh") {
  return render(
    <I18nHarness locale={locale}>
      <RepositoryForestMap repositories={REPOSITORIES} />
    </I18nHarness>,
  );
}

describe("RepositoryConstellation", () => {
  it("默认按最近更新时间显示仓库", () => {
    renderForrest();
    const cards = screen.getAllByTestId("repository-card");
    expect(within(cards[0]).getByText("agent-router")).toBeInTheDocument();
    expect(within(cards[2]).getByText("chain-indexer")).toBeInTheDocument();
  });

  it("按语言筛选并按 Stars 排序", () => {
    renderForrest();

    fireEvent.click(screen.getByRole("button", { name: "Python" }));
    expect(screen.getByText("chain-indexer")).toBeInTheDocument();
    expect(screen.queryByText("agent-router")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Repository sort" }), { target: { value: "stars" } });
    const cards = screen.getAllByTestId("repository-card");
    expect(within(cards[0]).getByText("agent-router")).toBeInTheDocument();
  });

  it("点击节点后展开抽屉,在抽屉内显示 topics 与项目主页", () => {
    renderForrest();

    expect(screen.queryByText("blockchain")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "View chain-indexer details" }));
    expect(screen.getByText("blockchain")).toBeInTheDocument();

    // 抽屉有两个关闭入口(scrim + 角标按钮),它们共享同一个 aria-label。
    const close_buttons = screen.getAllByRole("button", { name: "Close" });
    fireEvent.click(close_buttons[0]!);
    fireEvent.click(screen.getByRole("button", { name: "View agent-router details" }));
    expect(screen.getByRole("link", { name: "Visit agent-router homepage" })).toHaveAttribute(
      "href",
      "https://example.com/agent-router",
    );
    expect(screen.getByRole("link", { name: "View agent-router on GitHub" })).toHaveAttribute(
      "rel",
      "noreferrer",
    );
  });

  it("中文 locale 下 chip 与抽屉文本本地化", () => {
    renderForrest("zh");

    expect(screen.getByRole("button", { name: "全部" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "All" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "查看 chain-indexer 详情" }));
    expect(screen.getByRole("link", { name: "在 GitHub 查看 chain-indexer" })).toBeInTheDocument();
  });

  it("为空结果显示明确状态", () => {
    render(
      <I18nHarness>
        <RepositoryForestMap repositories={[]} />
      </I18nHarness>,
    );
    expect(screen.getByText("No public repositories to display.")).toBeInTheDocument();
  });
});

describe("RepositorySkeleton", () => {
  it("展示六个与项目卡片一致的骨架节点", () => {
    const { container } = render(
      <I18nHarness>
        <RepositorySkeleton />
      </I18nHarness>,
    );
    expect(screen.getAllByTestId("repository-skeleton-card")).toHaveLength(6);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
