import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CapricornProtocolBackground } from "@/components/CapricornProtocolBackground";

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(max-width: 1023px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const NETWORK_LINE_COLOR = "rgba(87, 170, 190, 0.12)";
const DATA_LINE_COLOR = "rgba(34, 211, 238, 0.34)";
const GRID_PACKET_COLOR = "rgba(34, 211, 238, 0.16)";

interface MediaQueryOptions {
  mobile?: boolean;
  reducedMotion?: boolean;
  tablet?: boolean;
}

interface MutableMediaQueryList extends MediaQueryList {
  emit_change: (matches: boolean) => void;
}

interface CanvasMock {
  context: CanvasRenderingContext2D;
  stroke_styles: string[];
}

interface RafMock {
  cancel: ReturnType<typeof vi.spyOn>;
  request: ReturnType<typeof vi.spyOn>;
  run_latest: (time?: number) => void;
}

let media_queries: Map<string, MutableMediaQueryList>;

function initial_query_match(query: string, options: MediaQueryOptions): boolean {
  if (query === MOBILE_QUERY) {
    return Boolean(options.mobile);
  }
  if (query === TABLET_QUERY) {
    return Boolean(options.tablet || options.mobile);
  }
  return query === REDUCED_MOTION_QUERY && Boolean(options.reducedMotion);
}

function install_match_media(options: MediaQueryOptions = {}): void {
  media_queries = new Map();
  vi.stubGlobal("matchMedia", vi.fn((query: string): MediaQueryList => {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const media_query = {
      addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      }),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      emit_change(matches: boolean): void {
        Object.defineProperty(media_query, "matches", { configurable: true, value: matches });
        const event = { matches, media: query } as MediaQueryListEvent;
        listeners.forEach((listener) => listener(event));
      },
      matches: initial_query_match(query, options),
      media: query,
      onchange: null,
      removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      }),
      removeListener: vi.fn(),
    } as MutableMediaQueryList;
    media_queries.set(query, media_query);
    return media_query;
  }));
}

function install_canvas_context(): CanvasMock {
  const gradient = { addColorStop: vi.fn() } as unknown as CanvasGradient;
  const stroke_styles: string[] = [];
  const context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    createRadialGradient: vi.fn(() => gradient),
    fill: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    restore: vi.fn(),
    save: vi.fn(),
    setTransform: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
  Object.defineProperty(context, "strokeStyle", {
    configurable: true,
    set: (value: string): void => {
      stroke_styles.push(value);
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context);
  return { context, stroke_styles };
}

function install_raf(): RafMock {
  const callbacks = new Map<number, FrameRequestCallback>();
  let next_id = 1;
  const request = vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    const id = next_id;
    next_id += 1;
    callbacks.set(id, callback);
    return id;
  });
  const cancel = vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
    callbacks.delete(id);
  });
  return {
    cancel,
    request,
    run_latest(time = 1_000): void {
      const id = Math.max(...callbacks.keys());
      const callback = callbacks.get(id);
      if (!callback) {
        throw new Error("没有待执行的动画帧");
      }
      callbacks.delete(id);
      callback(time);
    },
  };
}

function count_style(stroke_styles: string[], style: string): number {
  return stroke_styles.filter((stroke_style) => stroke_style === style).length;
}

describe("CapricornProtocolBackground", () => {
  beforeEach(() => {
    install_match_media();
    install_canvas_context();
    Object.defineProperty(window, "devicePixelRatio", { configurable: true, value: 3 });
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 960 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 540 });
  });

  it("挂载时初始化高清 Canvas，卸载时清理窗口、媒体监听和动画帧", () => {
    const raf = install_raf();
    const add_event_listener = vi.spyOn(window, "addEventListener");
    const remove_event_listener = vi.spyOn(window, "removeEventListener");

    const { container, unmount } = render(<CapricornProtocolBackground />);
    const canvas = container.querySelector("canvas");

    expect(canvas).toHaveClass("protocol-background");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas).toHaveProperty("width", 1920);
    expect(canvas).toHaveProperty("height", 1080);
    expect(raf.request).toHaveBeenCalledOnce();
    expect(add_event_listener).toHaveBeenCalledWith("resize", expect.any(Function));
    for (const media_query of media_queries.values()) {
      expect(media_query.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    }

    unmount();

    expect(raf.cancel).toHaveBeenCalledOnce();
    expect(remove_event_listener).toHaveBeenCalledWith("resize", expect.any(Function));
    for (const media_query of media_queries.values()) {
      expect(media_query.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    }
  });

  it("减少动态效果时只绘制稳定静态帧", () => {
    install_match_media({ reducedMotion: true });
    const { context } = install_canvas_context();
    const raf = install_raf();

    render(<CapricornProtocolBackground />);

    expect(context.clearRect).toHaveBeenCalledOnce();
    expect(raf.request).not.toHaveBeenCalled();
  });

  it.each([
    ["桌面", {}, 104, 17],
    ["平板", { tablet: true }, 74, 12],
    ["手机", { mobile: true }, 50, 7],
  ] as const)("%s档减少粒子与网络连接", (_label, options, arc_count, connection_count) => {
    install_match_media(options);
    const { context, stroke_styles } = install_canvas_context();
    const raf = install_raf();

    const { unmount } = render(<CapricornProtocolBackground />);
    raf.run_latest();

    expect(context.arc).toHaveBeenCalledTimes(arc_count);
    expect(count_style(stroke_styles, NETWORK_LINE_COLOR)).toBe(connection_count);
    unmount();
  });

  it("resize 跨入手机断点时重建低密度场景", () => {
    const { context, stroke_styles } = install_canvas_context();
    const raf = install_raf();
    render(<CapricornProtocolBackground />);
    raf.run_latest();
    vi.mocked(context.arc).mockClear();
    stroke_styles.length = 0;

    media_queries.get(MOBILE_QUERY)?.emit_change(true);
    media_queries.get(TABLET_QUERY)?.emit_change(true);
    window.dispatchEvent(new Event("resize"));
    raf.run_latest();

    expect(context.arc).toHaveBeenCalledTimes(50);
    expect(count_style(stroke_styles, NETWORK_LINE_COLOR)).toBe(7);
  });

  it("运行期切换 reduced-motion 时停止并恢复 RAF", () => {
    const raf = install_raf();
    render(<CapricornProtocolBackground />);
    const reduced_motion_query = media_queries.get(REDUCED_MOTION_QUERY);

    reduced_motion_query?.emit_change(true);
    expect(raf.cancel).toHaveBeenCalledOnce();
    const request_count = raf.request.mock.calls.length;

    reduced_motion_query?.emit_change(false);
    expect(raf.request).toHaveBeenCalledTimes(request_count + 1);
  });

  it("移动与平板媒体查询变化时动态切换密度且不重复启动 RAF", () => {
    const { context, stroke_styles } = install_canvas_context();
    const raf = install_raf();
    render(<CapricornProtocolBackground />);
    const initial_request_count = raf.request.mock.calls.length;

    media_queries.get(TABLET_QUERY)?.emit_change(true);
    raf.run_latest();
    expect(context.arc).toHaveBeenCalledTimes(74);
    expect(count_style(stroke_styles, NETWORK_LINE_COLOR)).toBe(12);
    expect(raf.request).toHaveBeenCalledTimes(initial_request_count + 1);

    vi.mocked(context.arc).mockClear();
    stroke_styles.length = 0;
    media_queries.get(MOBILE_QUERY)?.emit_change(true);
    raf.run_latest();
    expect(context.arc).toHaveBeenCalledTimes(50);
    expect(count_style(stroke_styles, NETWORK_LINE_COLOR)).toBe(7);
  });

  it("协议网格与连接上的数据包均绘制为微亮短线段", () => {
    const { context, stroke_styles } = install_canvas_context();
    const raf = install_raf();
    render(<CapricornProtocolBackground />);

    raf.run_latest();

    expect(stroke_styles).toContain(GRID_PACKET_COLOR);
    expect(count_style(stroke_styles, DATA_LINE_COLOR)).toBe(17);
    expect(context.lineTo).toHaveBeenCalled();
    expect(context.arc).toHaveBeenCalledTimes(104);
  });

  it("协议网格数据包仅在周期窗口内偶发闪现", () => {
    const { stroke_styles } = install_canvas_context();
    const raf = install_raf();
    render(<CapricornProtocolBackground />);

    raf.run_latest(1_000);
    expect(stroke_styles).toContain(GRID_PACKET_COLOR);
    stroke_styles.length = 0;

    raf.run_latest(4_000);
    expect(stroke_styles).not.toContain(GRID_PACKET_COLOR);
  });
});
