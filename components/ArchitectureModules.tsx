"use client";

import { Blocks, BrainCircuit, ChartNoAxesCombined, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ProtocolBadge } from "@/components/ProtocolBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";

interface ArchitectureModuleDef {
  titleKey: string;
  descriptionKey: string;
  statusKey: string;
  icon: LucideIcon;
}

const ARCHITECTURE_MODULES: readonly ArchitectureModuleDef[] = [
  { titleKey: "module.aiTitle", descriptionKey: "module.aiDesc", statusKey: "module.aiStatus", icon: BrainCircuit },
  { titleKey: "module.chainTitle", descriptionKey: "module.chainDesc", statusKey: "module.chainStatus", icon: Blocks },
  { titleKey: "module.agentTitle", descriptionKey: "module.agentDesc", statusKey: "module.agentStatus", icon: Workflow },
  { titleKey: "module.dataTitle", descriptionKey: "module.dataDesc", statusKey: "module.dataStatus", icon: ChartNoAxesCombined },
];

/**
 * 渲染四个可信智能系统架构模块。
 */
export function ArchitectureModules(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <section className="protocol-section architecture-modules" id="architecture">
      <SectionHeading index="[01]" eyebrow="ARCHITECTURE MODULES" title={t("heading.architecture")} />
      <div className="architecture-modules__grid">
        {ARCHITECTURE_MODULES.map((architecture_module, index) => {
          const Icon = architecture_module.icon;
          return (
            <SectionReveal key={architecture_module.titleKey} delay={index * 0.08}>
              <article className="architecture-module" data-cursor="card">
                <div className="architecture-module__header">
                  <Icon aria-hidden="true" className="architecture-module__icon" size={24} strokeWidth={1.5} />
                  <ProtocolBadge>{t(architecture_module.statusKey)}</ProtocolBadge>
                </div>
                <h3 className="architecture-module__title">{t(architecture_module.titleKey)}</h3>
                <p className="architecture-module__description">{t(architecture_module.descriptionKey)}</p>
                <span aria-hidden="true" className="architecture-module__node-pattern" />
              </article>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
