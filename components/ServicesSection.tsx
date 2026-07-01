"use client";

import { ArrowUpRight, Cpu, Database, HardDrive, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ProtocolBadge } from "@/components/ProtocolBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { GITHUB_PROFILE_URL } from "@/lib/profile";

/**
 * 4 类可接私活服务卡片。文案与图标都从字典读取，方便后续加 key / 调序。
 */

interface ServiceDef {
  id: "agent" | "rag" | "data" | "privateai";
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  metricKey: string;
  caseKey: string;
}

const SERVICES: readonly ServiceDef[] = [
  {
    id: "agent",
    icon: Cpu,
    titleKey: "services.agent.title",
    descKey: "services.agent.desc",
    metricKey: "services.agent.metric",
    caseKey: "services.agent.caseLabel",
  },
  {
    id: "rag",
    icon: Network,
    titleKey: "services.rag.title",
    descKey: "services.rag.desc",
    metricKey: "services.rag.metric",
    caseKey: "services.rag.caseLabel",
  },
  {
    id: "data",
    icon: Database,
    titleKey: "services.data.title",
    descKey: "services.data.desc",
    metricKey: "services.data.metric",
    caseKey: "services.data.caseLabel",
  },
  {
    id: "privateai",
    icon: HardDrive,
    titleKey: "services.privateai.title",
    descKey: "services.privateai.desc",
    metricKey: "services.privateai.metric",
    caseKey: "services.privateai.caseLabel",
  },
];

export function ServicesSection(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <section className="protocol-section services-section" id="services" aria-labelledby="services-heading">
      <SectionHeading
        index={t("services.indexLabel")}
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        description={t("services.intro")}
      />
      <ProtocolBadge className="services-section__nda">{t("services.nda")}</ProtocolBadge>
      <div className="services-section__grid">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <SectionReveal key={service.id} delay={index * 0.06}>
              <article className="service-card" data-cursor="card" data-service={service.id}>
                <div className="service-card__header">
                  <Icon aria-hidden="true" className="service-card__icon" size={26} strokeWidth={1.5} />
                  <span className="service-card__index">0{index + 1}</span>
                </div>
                <h3 className="service-card__title">{t(service.titleKey)}</h3>
                <p className="service-card__description">{t(service.descKey)}</p>
                <div className="service-card__metric" aria-label={t(service.metricKey)}>
                  <span className="service-card__metric-dot" aria-hidden="true" />
                  <span className="service-card__metric-text">{t(service.metricKey)}</span>
                </div>
                <p className="service-card__case">{t(service.caseKey)}</p>
                <a
                  className="service-card__link"
                  href="#contact"
                  onClick={(event) => {
                    const target = document.getElementById("contact");
                    if (target) {
                      event.preventDefault();
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <span>{t("services.ctaBrief")}</span>
                  <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.6} />
                </a>
              </article>
            </SectionReveal>
          );
        })}
      </div>
      <p className="services-section__footnote">
        <a
          className="services-section__github-link"
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
        >
          {t("services.ctaGithub")} <ArrowUpRight aria-hidden="true" size={12} strokeWidth={1.6} />
        </a>
      </p>
    </section>
  );
}
