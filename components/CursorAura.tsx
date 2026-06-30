"use client";

import { useEffect, useRef } from "react";

const RIPPLE_LIFETIME_MS = 600;
const TRAIL_DURATION_MS = 320;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";

interface CursorState {
  button: boolean;
  card: boolean;
  link: boolean;
  reactor: boolean;
  visible: boolean;
}

/**
 * 全站鼠标光晕与点击涟漪。
 * - 默认暗淡光晕。
 * - 悬停按钮/链接/卡片/反应炉时切换形态。
 * - 点击产生微小 ripple。
 * - 关闭 reduced-motion。
 * - 移动端不挂载。
 */
export function CursorAura(): React.JSX.Element | null {
  const root_ref = useRef<HTMLDivElement | null>(null);
  const layer_ref = useRef<HTMLDivElement | null>(null);
  const trail_ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const root = root_ref.current;
    const layer = layer_ref.current;
    const trail = trail_ref.current;
    if (!root || !layer || !trail) {
      return undefined;
    }

    const reduced_motion = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobile = window.matchMedia(MOBILE_QUERY);
    if (reduced_motion.matches || mobile.matches) {
      root.style.display = "none";
      return undefined;
    }

    const state: CursorState = {
      button: false,
      card: false,
      link: false,
      reactor: false,
      visible: false,
    };

    let target_x = 0;
    let target_y = 0;
    let current_x = 0;
    let current_y = 0;
    let trail_x = 0;
    let trail_y = 0;
    let raf_id = 0;
    let last_move = 0;
    const ripple_frames = new Set<number>();

    const render_loop = (time: number): void => {
      const easing = 0.32;
      current_x += (target_x - current_x) * easing;
      current_y += (target_y - current_y) * easing;
      trail_x += (target_x - trail_x) * (easing * 0.55);
      trail_y += (target_y - trail_y) * (easing * 0.55);
      const visible = state.visible || time - last_move < TRAIL_DURATION_MS;
      layer.style.transform = `translate3d(${current_x}px, ${current_y}px, 0)`;
      layer.dataset.visible = visible ? "true" : "false";
      trail.style.transform = `translate3d(${trail_x}px, ${trail_y}px, 0)`;
      trail.dataset.visible = visible ? "true" : "false";
      raf_id = window.requestAnimationFrame(render_loop);
    };

    const apply_data_mode = (): void => {
      const mode = state.reactor
        ? "reactor"
        : state.button
          ? "button"
          : state.card
            ? "card"
            : state.link
              ? "link"
              : "default";
      if (mode !== layer.dataset.mode) {
        layer.dataset.mode = mode;
        trail.dataset.mode = mode;
      }
    };

    const handle_pointer_move = (event: PointerEvent): void => {
      target_x = event.clientX;
      target_y = event.clientY;
      last_move = performance.now();
      if (!state.visible) {
        state.visible = true;
        layer.dataset.visible = "true";
        trail.dataset.visible = "true";
      }
    };

    const handle_pointer_over = (event: PointerEvent): void => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }
      const host = target.closest<HTMLElement>("[data-cursor]");
      if (!host) {
        return;
      }
      const mode = host.dataset.cursor;
      if (mode === "button") {
        state.button = true;
      } else if (mode === "card") {
        state.card = true;
      } else if (mode === "link") {
        state.link = true;
      } else if (mode === "reactor") {
        state.reactor = true;
      }
      apply_data_mode();
    };

    const handle_pointer_out = (event: PointerEvent): void => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }
      const host = target.closest<HTMLElement>("[data-cursor]");
      if (!host || host.dataset.cursor === undefined) {
        return;
      }
      const mode = host.dataset.cursor;
      if (mode === "button") {
        state.button = false;
      } else if (mode === "card") {
        state.card = false;
      } else if (mode === "link") {
        state.link = false;
      } else if (mode === "reactor") {
        state.reactor = false;
      }
      apply_data_mode();
    };

    const spawn_ripple = (event: MouseEvent): void => {
      if (reduced_motion.matches) {
        return;
      }
      const ripple = document.createElement("span");
      ripple.className = "cursor-aura__ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      root.appendChild(ripple);
      const expires_at = performance.now() + RIPPLE_LIFETIME_MS;
      let pending_id: number | null = null;
      const cleanup = (): void => {
        if (pending_id !== null) {
          ripple_frames.delete(pending_id);
          pending_id = null;
        }
        if (performance.now() < expires_at) {
          pending_id = window.requestAnimationFrame(cleanup);
          ripple_frames.add(pending_id);
          return;
        }
        ripple.remove();
      };
      cleanup();
    };

    const handle_pointer_leave = (): void => {
      state.visible = false;
      layer.dataset.visible = "false";
      trail.dataset.visible = "false";
    };

    const teardown_preference = (): void => {
      if (reduced_motion.matches || mobile.matches) {
        window.removeEventListener("pointermove", handle_pointer_move);
        window.removeEventListener("click", spawn_ripple);
        window.removeEventListener("pointerover", handle_pointer_over);
        window.removeEventListener("pointerout", handle_pointer_out);
        window.removeEventListener("blur", handle_pointer_leave);
        document.removeEventListener("mouseleave", handle_pointer_leave);
        cancelAnimationFrame(raf_id);
        root.style.display = "none";
      }
    };

    const setup_listeners = (): void => {
      window.addEventListener("pointermove", handle_pointer_move, { passive: true });
      window.addEventListener("click", spawn_ripple);
      window.addEventListener("pointerover", handle_pointer_over);
      window.addEventListener("pointerout", handle_pointer_out);
      window.addEventListener("blur", handle_pointer_leave);
      document.addEventListener("mouseleave", handle_pointer_leave);
      reduced_motion.addEventListener("change", teardown_preference);
      mobile.addEventListener("change", teardown_preference);
    };

    raf_id = window.requestAnimationFrame(render_loop);
    setup_listeners();

    return (): void => {
      window.removeEventListener("pointermove", handle_pointer_move);
      window.removeEventListener("click", spawn_ripple);
      window.removeEventListener("pointerover", handle_pointer_over);
      window.removeEventListener("pointerout", handle_pointer_out);
      window.removeEventListener("blur", handle_pointer_leave);
      document.removeEventListener("mouseleave", handle_pointer_leave);
      reduced_motion.removeEventListener("change", teardown_preference);
      mobile.removeEventListener("change", teardown_preference);
      cancelAnimationFrame(raf_id);
      ripple_frames.forEach((id) => window.cancelAnimationFrame(id));
      ripple_frames.clear();
    };
  }, []);

  return (
    <div ref={root_ref} className="cursor-aura" aria-hidden="true">
      <div ref={trail_ref} className="cursor-aura__trail" data-visible="false" data-mode="default" />
      <div ref={layer_ref} className="cursor-aura__core" data-visible="false" data-mode="default" />
    </div>
  );
}
