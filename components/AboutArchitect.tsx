"use client";

import { ForgeSigil } from "@/components/ForgeSigil";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { ABOUT_DIRECTIONS, ABOUT_TIMELINE } from "@/lib/i18n/contents";
import type { Locale } from "@/lib/i18n/types";

/**
 * 渲染架构师履历铭牌:lead + intro + 7 年时间线 + 工具栈 + 信仰。
 */
export function AboutArchitect(): React.JSX.Element {
  const { locale, t } = useI18n();
  const timeline = ABOUT_TIMELINE[locale as Locale];
  const directions = ABOUT_DIRECTIONS[locale as Locale];
  return (
    <section className="protocol-section about-architect" id="about">
      <SectionHeading index="[04]" eyebrow="ABOUT" title={t("heading.about")} />
      <SectionReveal>
        <article className="architect-plaque">
          <div className="architect-plaque__sigil">
            <ForgeSigil />
          </div>
          <div className="architect-plaque__content">
            <p className="architect-plaque__lead">{t("about.lead")}</p>
            <p className="architect-plaque__intro">{t("about.intro")}</p>
            <p className="architect-plaque__questions">{t("about.questions")}</p>

            <p className="architect-plaque__timeline-label">
              {t("about.timelineTitle")}
            </p>
            <ol className="architect-plaque__timeline" aria-label={t("about.timelineLabel")}>
              {timeline.map((entry) => (
                <li key={`${entry.period}-${entry.role}`} className="architect-plaque__timeline-item">
                  <span className="architect-plaque__timeline-period">{entry.period}</span>
                  <div className="architect-plaque__timeline-body">
                    <span className="architect-plaque__timeline-role">{entry.role}</span>
                    <span className="architect-plaque__timeline-note">{entry.note}</span>
                  </div>
                </li>
              ))}
            </ol>

            <p className="architect-plaque__direction-label">{t("about.directionLabel")}</p>
            <ul className="architect-plaque__directions" aria-label={t("about.directionsAria")}>
              {directions.map((direction) => (
                <li key={direction}>{direction}</li>
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
