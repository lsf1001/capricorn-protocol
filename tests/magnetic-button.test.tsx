import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MagneticButton } from "@/components/MagneticButton";

const FEEDBACK_DURATION_MS = 1100;

describe("MagneticButton", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("渲染基础结构、class 与内部锚点属性", () => {
    render(<MagneticButton href="#contact">联系我</MagneticButton>);

    const link = screen.getByRole("link", { name: "联系我" });
    expect(link).toHaveAttribute("href", "#contact");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
    expect(link).toHaveClass("magnetic-button", "magnetic-button--primary");
    expect(link).toHaveAttribute("data-cursor", "button");
  });

  it("以 https 开头的 href 自动加上 target=_blank rel=noreferrer", () => {
    render(
      <MagneticButton external href="https://github.com/lsf1001">
        GitHub
      </MagneticButton>,
    );

    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("external prop 对内部锚点也强制新标签打开", () => {
    render(
      <MagneticButton external href="#contact">
        强制外链
      </MagneticButton>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noreferrer");
  });

  it("点击后展示 feedback toast 并在 FEEDBACK_DURATION_MS 后消失", () => {
    render(
      <MagneticButton href="#contact" feedback="OPENING CHANNEL">
        联系我
      </MagneticButton>,
    );

    fireEvent.click(screen.getByRole("link", { name: "联系我" }));
    const toast = screen.getByText("OPENING CHANNEL");
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveClass("is-visible");

    act(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    });
    expect(screen.queryByText("OPENING CHANNEL")).not.toBeInTheDocument();
  });

  it("连击时会清掉上一次的 feedback timer,避免 toast 提前消失", () => {
    render(
      <MagneticButton href="#contact" feedback="OPENING">
        联系我
      </MagneticButton>,
    );

    const link = screen.getByRole("link", { name: "联系我" });
    fireEvent.click(link);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    // 第二次点击应当清除首次 timer；FEEDBACK_DURATION_MS - 400ms 之后旧 timer 不再触发
    fireEvent.click(link);
    act(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS - 400 + 50);
    });
    // 新 timer 还没到点
    expect(screen.getByText("OPENING")).toBeInTheDocument();
    // 再前进剩余时间
    act(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    });
    expect(screen.queryByText("OPENING")).not.toBeInTheDocument();
  });

  it("卸载时悬挂的 feedback timer 不会再 setState", () => {
    const console_error_spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = render(
      <MagneticButton href="#contact" feedback="PENDING">
        卸载测试
      </MagneticButton>,
    );
    fireEvent.click(screen.getByRole("link", { name: "卸载测试" }));
    expect(screen.getByText("PENDING")).toBeInTheDocument();

    unmount();

    expect(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    }).not.toThrow();
    expect(console_error_spy).not.toHaveBeenCalled();

    console_error_spy.mockRestore();
  });

  it("没有 feedback 时点击不会进入 is-visible toast 状态", () => {
    render(<MagneticButton href="#contact">静音</MagneticButton>);

    fireEvent.click(screen.getByRole("link", { name: "静音" }));

    const feedback_span = document.querySelector(".magnetic-button__feedback");
    expect(feedback_span).not.toHaveClass("is-visible");
    expect(feedback_span?.textContent).toBe("");
  });
});