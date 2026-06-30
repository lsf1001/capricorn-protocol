"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { ArrowDownRight, ArrowUpRight, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";

import { merge_class_names } from "@/lib/utils";

type Variant = "primary" | "ghost" | "github" | "text";

interface BaseProps {
  children?: ReactNode;
  variant?: Variant;
  feedback?: string;
  className?: string;
  magnetic?: boolean;
  iconAfter?: LucideIcon;
  iconBefore?: LucideIcon;
}

type MagneticButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
    external?: boolean;
  };

const FEEDBACK_DURATION_MS = 1100;
const MAGNETIC_RANGE_PX = 70;
const MAGNETIC_STRENGTH = 0.18;
const MOBILE_QUERY = "(max-width: 767px)";

function read_is_mobile(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * 磁性按钮：magnetic attraction、边框流光、点击瞬间的能量反馈。
 * 移动端退化为普通 active 状态。
 */
export function MagneticButton({
  children,
  variant = "primary",
  feedback,
  className,
  magnetic = true,
  iconAfter,
  iconBefore,
  href,
  external = false,
  onClick,
  ...rest
}: MagneticButtonProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const anchor_ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [toast, setToast] = useState<string | null>(null);
  const toast_timeout_ref = useRef<number | null>(null);

  // 卸载时清理悬挂的 feedback timer，避免在已卸载节点上 setState。
  useEffect(() => {
    return () => {
      if (toast_timeout_ref.current !== null) {
        window.clearTimeout(toast_timeout_ref.current);
      }
    };
  }, []);

  const handle_pointer_move = useCallback(
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (!magnetic || reduceMotion || read_is_mobile()) {
        return;
      }
      const node = anchor_ref.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const center_x = rect.left + rect.width / 2;
      const center_y = rect.top + rect.height / 2;
      const offset_x = event.clientX - center_x;
      const offset_y = event.clientY - center_y;
      const distance = Math.hypot(offset_x, offset_y);
      const pull = Math.max(0, 1 - distance / MAGNETIC_RANGE_PX);
      x.set(offset_x * pull * MAGNETIC_STRENGTH);
      y.set(offset_y * pull * MAGNETIC_STRENGTH);
    },
    [magnetic, reduceMotion, x, y],
  );

  const handle_pointer_leave = useCallback((): void => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handle_click = useCallback(
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (feedback) {
        setToast(feedback);
        if (toast_timeout_ref.current !== null) {
          window.clearTimeout(toast_timeout_ref.current);
        }
        toast_timeout_ref.current = window.setTimeout(() => {
          setToast(null);
          toast_timeout_ref.current = null;
        }, FEEDBACK_DURATION_MS);
      }
      onClick?.(event);
    },
    [feedback, onClick],
  );

  const variant_class = `magnetic-button--${variant}`;
  const trailing_icon = iconAfter ?? (variant === "github" ? GitBranch : ArrowDownRight);
  const is_external = external || /^https?:\/\//.test(href);
  const target_attr = is_external ? { target: "_blank", rel: "noreferrer" } : {};
  const LeadingIcon = iconBefore;
  const TrailingIcon = trailing_icon;

  return (
    <motion.span
      className="magnetic-button__wrapper"
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <a
        ref={anchor_ref}
        href={href}
        onClick={handle_click}
        onMouseMove={handle_pointer_move}
        onMouseLeave={handle_pointer_leave}
        className={merge_class_names("magnetic-button", variant_class, className)}
        data-cursor="button"
        {...target_attr}
        {...rest}
      >
        {LeadingIcon ? (
          <LeadingIcon size={16} strokeWidth={1.6} aria-hidden="true" />
        ) : null}
        <span className="magnetic-button__label">{children}</span>
        {TrailingIcon ? (
          <TrailingIcon
            className="magnetic-button__trailing-icon"
            size={variant === "github" ? 15 : 17}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        ) : (
          variant === "text" && <ArrowUpRight className="magnetic-button__trailing-icon" size={14} strokeWidth={1.6} aria-hidden="true" />
        )}
        <span aria-hidden="true" className="magnetic-button__edge" />
      </a>
      <span
        aria-hidden="true"
        className={merge_class_names("magnetic-button__feedback", toast ? "is-visible" : "")}
      >
        {toast ?? ""}
      </span>
    </motion.span>
  );
}
