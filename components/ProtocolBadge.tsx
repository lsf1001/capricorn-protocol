import type { ReactNode } from "react";

import { merge_class_names } from "@/lib/utils";

interface ProtocolBadgeProps {
  children?: ReactNode;
  className?: string;
  label?: string;
}

/**
 * 渲染统一的协议状态标签。
 */
export function ProtocolBadge({ children, className, label }: ProtocolBadgeProps): React.JSX.Element {
  return (
    <span className={merge_class_names("protocol-badge", className)}>
      <span aria-hidden="true" className="protocol-badge__indicator" />
      <span className="protocol-badge__label">{label ?? children}</span>
    </span>
  );
}
