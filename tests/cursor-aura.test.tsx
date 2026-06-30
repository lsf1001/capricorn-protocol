import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CursorAura } from "@/components/CursorAura";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";

interface MediaQueryOptions {
  mobile?: boolean;
  reducedMotion?: boolean;
}

interface MutableMediaQueryList extends MediaQueryList {
  emit_change: (matches: boolean) => void;
}

function install_match_media(options: MediaQueryOptions = {}): void {
  vi.stubGlobal("matchMedia", vi.fn((query: string): MediaQueryList => {
    const matches =
      query === REDUCED_MOTION_QUERY
        ? Boolean(options.reducedMotion)
        : query === MOBILE_QUERY
          ? Boolean(options.mobile)
          : false;
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      emit_change: () => undefined,
    } as MutableMediaQueryList;
  }));
}

describe("CursorAura", () => {
  beforeEach(() => {
    install_match_media();
  });

  it("reduced-motion 命中时隐藏 root、不挂监听、不启动 RAF", () => {
    install_match_media({ reducedMotion: true });
    const add_event = vi.spyOn(window, "addEventListener");
    const raf = vi.spyOn(window, "requestAnimationFrame");

    const { container } = render(<CursorAura />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.display).toBe("none");
    expect(add_event).not.toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(add_event).not.toHaveBeenCalledWith("click", expect.any(Function));
    expect(raf).not.toHaveBeenCalled();
  });

  it("mobile 命中时同样提前退出", () => {
    install_match_media({ mobile: true });
    const raf = vi.spyOn(window, "requestAnimationFrame");
    const add_event = vi.spyOn(window, "addEventListener");

    const { container } = render(<CursorAura />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.display).toBe("none");
    expect(raf).not.toHaveBeenCalled();
    expect(add_event).not.toHaveBeenCalledWith("pointermove", expect.any(Function));
  });

  it("正常情况下注册 pointermove / click / pointerover 监听并启动 RAF 主循环", () => {
    const add_event = vi.spyOn(window, "addEventListener");
    const raf = vi.spyOn(window, "requestAnimationFrame");

    render(<CursorAura />);

    expect(add_event).toHaveBeenCalledWith("pointermove", expect.any(Function), expect.anything());
    expect(add_event).toHaveBeenCalledWith("click", expect.any(Function));
    expect(add_event).toHaveBeenCalledWith("pointerover", expect.any(Function));
    expect(raf).toHaveBeenCalledTimes(1);
  });

  it("卸载时取消 RAF 主循环并移除所有 window 监听", () => {
    const remove_event = vi.spyOn(window, "removeEventListener");
    const raf_cancel = vi.spyOn(window, "cancelAnimationFrame");

    const { unmount } = render(<CursorAura />);
    const raf_cancel_count_before_unmount = raf_cancel.mock.calls.length;
    unmount();

    expect(remove_event).toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(remove_event).toHaveBeenCalledWith("click", expect.any(Function));
    expect(remove_event).toHaveBeenCalledWith("pointerover", expect.any(Function));
    expect(remove_event).toHaveBeenCalledWith("pointerout", expect.any(Function));
    expect(raf_cancel.mock.calls.length).toBeGreaterThan(raf_cancel_count_before_unmount);
  });

  it("点击会创建 ripple span 并启动清理 RAF 链", () => {
    const raf = vi.spyOn(window, "requestAnimationFrame");
    const initial_raf_count = 0;

    const { container } = render(<CursorAura />);
    const root = container.firstElementChild as HTMLElement;

    window.dispatchEvent(new MouseEvent("click", { clientX: 50, clientY: 80 }));
    expect(root.querySelectorAll(".cursor-aura__ripple").length).toBeGreaterThanOrEqual(1);
    // 主循环(1) + ripple cleanup(>=1) 至少为 2 次
    expect(raf.mock.calls.length).toBeGreaterThan(initial_raf_count + 1);
  });

  it("卸载时会取消 ripple 的 RAF 链,不再有遗留帧", () => {
    const raf_cancel = vi.spyOn(window, "cancelAnimationFrame");

    const { container, unmount } = render(<CursorAura />);
    const root = container.firstElementChild as HTMLElement;

    window.dispatchEvent(new MouseEvent("click", { clientX: 60, clientY: 60 }));
    const ripple_count = root.querySelectorAll(".cursor-aura__ripple").length;
    expect(ripple_count).toBeGreaterThanOrEqual(1);

    const raf_cancel_count_before = raf_cancel.mock.calls.length;
    unmount();

    // 主循环的 cancel + 至少 1 次 ripple 取消
    expect(raf_cancel.mock.calls.length - raf_cancel_count_before).toBeGreaterThanOrEqual(ripple_count);
  });
});