"use client";

import { GitFork, Mail, RadioTower } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { CONTACT_EMAIL, GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/profile";

const BRIEF_FIELDS = [
  { labelKey: "open.briefType", hintKey: "open.briefTypeHint" },
  { labelKey: "open.briefBudget", hintKey: "open.briefBudgetHint" },
  { labelKey: "open.briefTimeline", hintKey: "open.briefTimelineHint" },
  { labelKey: "open.briefStack", hintKey: "open.briefStackHint" },
] as const;

function build_brief_mailto(locale: string, email: string, briefLabel: string): string {
  const subject = locale === "zh"
    ? "[接活询价] 项目简述"
    : "[Contract Brief] Project Brief";
  const body = locale === "zh"
    ? `你好 老白,

我把项目信息整理如下:

1) 项目类型:
2) 预算区间:
3) 期望时间:
4) 技术栈 / 约束:

— ${briefLabel}`
    : `Hi Laobai,

Here's the project brief:

1) Project type:
2) Budget range:
3) Timeline:
4) Stack & constraints:

— ${briefLabel}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * 渲染开放连接终端 + 询价模板(让私活客户能直接发邮件)。
 */
export function OpenChannel(): React.JSX.Element {
  const { locale, t } = useI18n();
  const briefLabel = t("open.briefLabel");
  const mailto = build_brief_mailto(locale, CONTACT_EMAIL, briefLabel);
  return (
    <section className="protocol-section open-channel" id="contact">
      <SectionHeading index="[05]" eyebrow="OPEN CHANNEL" title={t("heading.contact")} />
      <SectionReveal>
        <div className="channel-terminal">
          <header className="channel-terminal__header">
            <RadioTower aria-hidden="true" size={18} strokeWidth={1.5} />
            <span>{t("open.protocolStatus")}</span>
            <span aria-hidden="true" className="channel-terminal__cursor" />
          </header>
          <dl className="channel-terminal__contacts">
            <div>
              <dt>
                <GitFork aria-hidden="true" size={16} /> {t("open.githubLabel")}:
              </dt>
              <dd>
                <a href={GITHUB_PROFILE_URL} rel="noreferrer" target="_blank" data-cursor="link">
                  {GITHUB_PROFILE_URL}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <Mail aria-hidden="true" size={16} /> {t("open.emailLabel")}:
              </dt>
              <dd>
                <a href={mailto} data-cursor="link">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("open.wechatLabel")}:</dt>
              <dd>{t("open.wechatPrivate")}</dd>
            </div>
          </dl>
          <p className="channel-terminal__note">{t("open.note")}</p>

          <section className="channel-terminal__brief" aria-labelledby="open-channel-brief-heading">
            <header className="channel-terminal__brief-head">
              <span id="open-channel-brief-heading" className="channel-terminal__brief-eyebrow">
                {briefLabel}
              </span>
            </header>
            <p className="channel-terminal__brief-help">{t("open.briefHelp")}</p>
            <dl className="channel-terminal__brief-grid">
              {BRIEF_FIELDS.map((field) => (
                <div key={field.labelKey} className="channel-terminal__brief-cell">
                  <dt>{t(field.labelKey)}</dt>
                  <dd>{t(field.hintKey)}</dd>
                </div>
              ))}
            </dl>
            <a className="channel-terminal__brief-cta" href={mailto} data-cursor="link">
              <Mail aria-hidden="true" size={14} strokeWidth={1.5} />
              <span>{t("open.briefEmailCta")}</span>
            </a>
          </section>

          <div className="channel-terminal__protocol" aria-label={t("open.protocolAria")}>
            <p>{t("open.protocolStatus")}</p>
            <p>{t("open.protocolGithub", { handle: GITHUB_USERNAME })}</p>
            <p>{t("open.protocolCollaboration")}</p>
            <p>{t("open.protocolName")}</p>
            <p>{t("open.protocolContact", { email: CONTACT_EMAIL })}</p>
            <p>{t("open.protocolWechat")}</p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}