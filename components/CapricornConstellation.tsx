"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import capricorn_reference from "@/image.png";

/** 展示融合参考图的动态摩羯星兽。 */
export function CapricornConstellation(): React.JSX.Element {
  const scene_ref = useRef<HTMLButtonElement>(null);
  const reset_timer_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [is_verified, set_is_verified] = useState(false);

  useEffect(() => () => {
    if (reset_timer_ref.current) clearTimeout(reset_timer_ref.current);
  }, []);

  const verify_constellation = (): void => {
    if (reset_timer_ref.current) clearTimeout(reset_timer_ref.current);
    set_is_verified(true);
    reset_timer_ref.current = setTimeout(() => set_is_verified(false), 620);
  };

  const update_parallax = (event: React.PointerEvent<HTMLButtonElement>): void => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x_ratio = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y_ratio = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x_ratio * 7}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${y_ratio * -5}deg`);
    event.currentTarget.style.setProperty("--light-x", `${(x_ratio + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${(y_ratio + 0.5) * 100}%`);
  };

  const reset_parallax = (): void => {
    scene_ref.current?.style.setProperty("--pointer-x", "0deg");
    scene_ref.current?.style.setProperty("--pointer-y", "0deg");
  };

  return (
    <button
      type="button"
      ref={scene_ref}
      className="constellation constellation--image"
      data-testid="capricorn-constellation"
      data-verified={is_verified || undefined}
      aria-label="验证摩羯星兽图谱"
      onClick={verify_constellation}
      onPointerMove={update_parallax}
      onPointerLeave={reset_parallax}
    >
      <div className="constellation__artwork">
        <Image
          className="constellation__artwork-image"
          src={capricorn_reference}
          alt="摩羯座动物形态星系图"
          fill
          priority
          sizes="(max-width: 820px) 100vw, 620px"
        />
        <span className="constellation__image-sheen" aria-hidden="true" />
        <span className="constellation__image-orbit" aria-hidden="true" />
        <span className="constellation__image-pulse" aria-hidden="true" />
      </div>

      <div className="constellation__status" aria-live="polite">
        {is_verified ? "CAPRICORN CONSTELLATION VERIFIED" : "CAPRICORN CONSTELLATION · ACTIVE"}
      </div>
      <span className="constellation__signing"><i aria-hidden="true" />SIGNING · 0xCAPRICORN</span>
    </button>
  );
}
