"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

import { merge_class_names } from "@/lib/utils";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * 在内容进入视口时执行一次克制的上线动效，并尊重减少动态效果偏好。
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps): React.JSX.Element {
  const should_reduce_motion = useReducedMotion();

  return (
    <motion.div
      className={merge_class_names("section-reveal", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: should_reduce_motion ? 0 : 0.55, delay: should_reduce_motion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
