"use client";

import { Box, BrainCircuit, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { PROTOCOL_LAYERS } from "@/lib/i18n/contents";
import type { Locale } from "@/lib/i18n/types";

interface LayerPresentation {
  ariaKey: string;
  icon: LucideIcon;
  tone: string;
  index: number;
}

const LAYER_PRESENTATION: ReadonlyArray<LayerPresentation> = [
  { ariaKey: "stack.aiAria", icon: BrainCircuit, tone: "ai", index: 0 },
  { ariaKey: "stack.chainAria", icon: Link2, tone: "chain", index: 1 },
  { ariaKey: "stack.engineeringAria", icon: Box, tone: "engineering", index: 2 },
];

/**
 * 渲染 AI、Chain 与 Engineering 三层协议栈。
 */
export function ProtocolStack(): React.JSX.Element {
  const { locale, t } = useI18n();
  const layers = PROTOCOL_LAYERS[locale as Locale];
  return (
    <section className="protocol-section protocol-stack" id="stack">
      <SectionHeading index="[03]" eyebrow="PROTOCOL STACK" title={t("heading.stack")} />
      <div className="protocol-stack__layers">
        {layers.map((protocol_layer, index) => {
          const presentation = LAYER_PRESENTATION[index];
          if (!presentation) {
            return null;
          }
          const Icon = presentation.icon;
          return (
            <SectionReveal key={protocol_layer.name} delay={index * 0.08}>
              <article className={`protocol-layer protocol-layer--${presentation.tone}`}>
                <header className="protocol-layer__header">
                  <Icon aria-hidden="true" className="protocol-layer__icon" size={22} strokeWidth={1.5} />
                  <h3 className="protocol-layer__title">{protocol_layer.name}</h3>
                </header>
                <ul className="protocol-layer__technologies" aria-label={t(presentation.ariaKey)}>
                  {protocol_layer.technologies.map((technology) => (
                    <li className="protocol-layer__technology" key={technology}>
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
