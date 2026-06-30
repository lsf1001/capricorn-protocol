"use client";

import { useEffect, useId, useState } from "react";

import { merge_class_names } from "@/lib/utils";

interface ForgeSigilProps {
  className?: string;
  compact?: boolean;
  size?: number;
  withReveal?: boolean;
}

/**
 * 渲染融合双角、0x 节点与熔炉结构的品牌几何印记。
 * `withReveal` 为真时，在挂载时做一次 stroke-dash 契约绘制动画。
 */
export function ForgeSigil({
  className,
  compact = false,
  size = 40,
  withReveal = false,
}: ForgeSigilProps): React.JSX.Element {
  const gradient_id = `forge-sigil-flow-${useId().replaceAll(":", "")}`;
  const [animate, set_animate] = useState(false);

  useEffect(() => {
    if (!withReveal) {
      return undefined;
    }
    const start = window.setTimeout(() => set_animate(true), 80);
    const stop = window.setTimeout(() => set_animate(false), 1400);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [withReveal]);

  return (
    <svg
      aria-hidden="true"
      className={merge_class_names("forge-sigil", compact && "forge-sigil--compact", className)}
      height={size}
      viewBox="0 0 64 64"
      width={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradient_id} x1="9" y1="10" x2="54" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--cyan-core)" />
          <stop offset="0.58" stopColor="var(--violet-core)" />
          <stop offset="1" stopColor="var(--gold-star)" />
        </linearGradient>
      </defs>
      <g
        className="forge-sigil__trace"
        stroke={`url(#${gradient_id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M13 25C10 14 17 8 25 13C18 15 17 22 22 27" pathLength={1} className={animate ? "is-drawing" : undefined} />
        <path d="M51 25C54 14 47 8 39 13C46 15 47 22 42 27" pathLength={1} className={animate ? "is-drawing" : undefined} />
        <path d="M22 27L32 20L42 27L46 43L32 53L18 43L22 27Z" pathLength={1} className={animate ? "is-drawing" : undefined} />
        <path d="M24 37L40 37M32 20V53" opacity="0.58" />
        <path d="M10 32H18M46 32H54" opacity="0.72" />
      </g>
      <g className="forge-sigil__nodes" fill="var(--bg-void)" stroke="var(--gold-star)" strokeWidth="1.8">
        <circle cx="10" cy="32" r="2.5" />
        <circle cx="32" cy="20" r="2.5" />
        <circle cx="54" cy="32" r="2.5" />
        <circle cx="32" cy="53" r="2.5" />
      </g>
    </svg>
  );
}
