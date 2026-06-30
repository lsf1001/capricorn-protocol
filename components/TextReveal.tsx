"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

import { merge_class_names } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * 角色级 mask reveal：中文按下标或按字符显现，
 * 完成后保持稳定，避免持续抖动。
 */
export function TextReveal({ text, className, delay = 0 }: TextRevealProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const characters = Array.from(text);
  const [visible_count, set_visible_count] = useState(reduceMotion ? characters.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      set_visible_count(characters.length);
      return undefined;
    }
    let frame = 0;
    let index = 0;
    const step = (): void => {
      index += 1;
      set_visible_count(index);
      if (index >= characters.length) {
        window.cancelAnimationFrame(frame);
        return;
      }
      frame = window.requestAnimationFrame(() => {
        window.setTimeout(step, reduceMotion ? 0 : 60);
      });
    };
    const start = window.setTimeout(() => {
      step();
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.cancelAnimationFrame(frame);
    };
  }, [characters.length, delay, reduceMotion]);

  return (
    <span
      className={merge_class_names("text-reveal", className)}
      aria-label={text}
      data-testid="text-reveal"
    >
      <span aria-hidden="true" className="text-reveal__shade">
        {characters.map((char, index) => (
          <span
            key={`shade-${index}`}
            className="text-reveal__char"
            data-visible={index < visible_count || undefined}
          >
            {char}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="text-reveal__accessible">
        {text}
      </span>
    </span>
  );
}

interface BlockRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * 整块 clip-path 横向扫描显现。给标题或品牌印记用。
 */
export function BlockReveal({ children, className, delay = 0 }: BlockRevealProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={merge_class_names("block-reveal", className)}
      initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0.6 }}
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block-reveal__content">{children}</span>
    </motion.div>
  );
}
