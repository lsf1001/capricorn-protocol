"use client";

import { ForgeSigil } from "@/components/ForgeSigil";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { RESEARCH_DIRECTIONS } from "@/lib/i18n/contents";
import type { Locale } from "@/lib/i18n/types";

/**
 * 渲染架构师协议铭牌和核心研究方向。
 */
export function AboutArchitect(): React.JSX.Element {
  const { locale, t } = useI18n();
  const directions = RESEARCH_DIRECTIONS[locale as Locale];
  return (
    <section className="protocol-section about-architect" id="about">
      <SectionHeading index="[04]" eyebrow="ABOUT THE ARCHITECT" title={t("heading.about")} />
      <SectionReveal>
        <article className="architect-plaque">
          <div className="architect-plaque__sigil">
            <ForgeSigil />
          </div>
          <div className="architect-plaque__content">
            <p className="architect-plaque__lead">{t("about.lead")}</p>
            <p>{t("about.intro")}</p>
            <p className="architect-plaque__questions">{t("about.questions")}</p>
            <p className="architect-plaque__direction-label">{t("about.directionLabel")}</p>
            <ul className="architect-plaque__directions" aria-label={t("about.directionsAria")}>
              {directions.map((research_direction) => (
                <li key={research_direction}>{research_direction}</li>
              ))}
            </ul>
            <p className="architect-plaque__creed">{t("about.creed")}</p>
          </div>
          <div className="architect-plaque__contract" aria-label={t("about.contractHashLabel")}>
            <span>{t("about.contractHashLabel")}</span>
            <span>{t("about.contractHash")}</span>
          </div>
        </article>
      </SectionReveal>
    </section>
  );
}
