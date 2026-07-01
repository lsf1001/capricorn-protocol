"use client";

import { ArrowUpRight, Award, Cpu, Database, HardDrive, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";

/**
 * 案例集。每个案例 = 问题 / 方案 / 技术栈 / 结果 四段式。
 * 现公司项目已脱敏(只挂数字),开源项目挂 GitHub 链接。
 */

interface CaseDef {
  id: "nexus" | "furion" | "qiqi" | "chain";
  icon: LucideIcon;
  titleKey: string;
  problemKey: string;
  solutionKey: string;
  stackKey: string;
  resultsKey: string;
  linkKey?: string;
}

const CASES: readonly CaseDef[] = [
  {
    id: "nexus",
    icon: Cpu,
    titleKey: "cases.nexus.title",
    problemKey: "cases.nexus.problem",
    solutionKey: "cases.nexus.solution",
    stackKey: "cases.nexus.stack",
    resultsKey: "cases.nexus.results",
    linkKey: "cases.nexus.link",
  },
  {
    id: "furion",
    icon: Database,
    titleKey: "cases.furion.title",
    problemKey: "cases.furion.problem",
    solutionKey: "cases.furion.solution",
    stackKey: "cases.furion.stack",
    resultsKey: "cases.furion.results",
    linkKey: "cases.furion.link",
  },
  {
    id: "qiqi",
    icon: HardDrive,
    titleKey: "cases.qiqi.title",
    problemKey: "cases.qiqi.problem",
    solutionKey: "cases.qiqi.solution",
    stackKey: "cases.qiqi.stack",
    resultsKey: "cases.qiqi.results",
    linkKey: "cases.qiqi.link",
  },
  {
    id: "chain",
    icon: Award,
    titleKey: "cases.chain.title",
    problemKey: "cases.chain.problem",
    solutionKey: "cases.chain.solution",
    stackKey: "cases.chain.stack",
    resultsKey: "cases.chain.results",
  },
];

export function CaseStudies(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <section className="protocol-section case-studies" id="cases" aria-labelledby="cases-heading">
      <SectionHeading
        index={t("cases.indexLabel")}
        eyebrow={t("cases.eyebrow")}
        title={t("cases.title")}
        description={t("cases.intro")}
      />
      <div className="case-studies__list">
        {CASES.map((case_study, index) => {
          const Icon = case_study.icon;
          const link = case_study.linkKey ? t(case_study.linkKey) : null;
          return (
            <SectionReveal key={case_study.id} delay={index * 0.05}>
              <article className="case-card" data-cursor="card">
                <header className="case-card__header">
                  <Icon aria-hidden="true" className="case-card__icon" size={22} strokeWidth={1.5} />
                  <h3 className="case-card__title">{t(case_study.titleKey)}</h3>
                  {link ? (
                    <a
                      className="case-card__github"
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("cases.linkGithub")}
                    >
                      <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.6} />
                      <span>{t("cases.linkGithub")}</span>
                    </a>
                  ) : null}
                </header>
                <dl className="case-card__grid">
                  <div className="case-card__row">
                    <dt>{t("cases.problem")}</dt>
                    <dd>{t(case_study.problemKey)}</dd>
                  </div>
                  <div className="case-card__row">
                    <dt>{t("cases.solution")}</dt>
                    <dd>{t(case_study.solutionKey)}</dd>
                  </div>
                  <div className="case-card__row">
                    <dt>{t("cases.stack")}</dt>
                    <dd className="case-card__stack">{t(case_study.stackKey)}</dd>
                  </div>
                  <div className="case-card__row case-card__row--result">
                    <dt>{t("cases.results")}</dt>
                    <dd>{t(case_study.resultsKey)}</dd>
                  </div>
                </dl>
              </article>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
