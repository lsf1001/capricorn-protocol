import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CapricornConstellation } from "@/components/CapricornConstellation";

describe("CapricornConstellation", () => {
  it("使用参考图渲染动态摩羯星兽且不保留代码星兽", () => {
    const { container } = render(<CapricornConstellation />);

    expect(screen.getByRole("img", { name: "摩羯座动物形态星系图" })).toBeInTheDocument();
    expect(container.querySelector(".constellation__artwork-image")).toBeInTheDocument();
    expect(container.querySelector("[data-testid='capricorn-beast-svg']")).not.toBeInTheDocument();
    expect(container.querySelectorAll("[data-beast-layer]")).toHaveLength(0);
    expect(screen.getByText("CAPRICORN CONSTELLATION · ACTIVE")).toBeInTheDocument();
    expect(screen.getAllByText("SIGNING · 0xCAPRICORN").length).toBeGreaterThanOrEqual(1);
    expect(container.querySelector(".constellation__corner")).not.toBeInTheDocument();
    expect(container.querySelector(".constellation__title-block")).not.toBeInTheDocument();
    expect(container.querySelector(".constellation__fragments")).not.toBeInTheDocument();
    expect(container.querySelector(".constellation__hud--left")).not.toBeInTheDocument();
    expect(container.querySelector(".constellation__hud--right")).not.toBeInTheDocument();
  });

  it("点击后显示短暂的星图验证状态", () => {
    vi.useFakeTimers();
    render(<CapricornConstellation />);

    fireEvent.click(screen.getByTestId("capricorn-constellation"));
    expect(screen.getByText("CAPRICORN CONSTELLATION VERIFIED")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(700));
    expect(screen.getByText("CAPRICORN CONSTELLATION · ACTIVE")).toBeInTheDocument();
    vi.useRealTimers();
  });

});
