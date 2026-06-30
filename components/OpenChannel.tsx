"use client";

import { GitFork, Mail, RadioTower } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/components/I18nProvider";
import { CONTACT_EMAIL, GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/profile";

/**
 * 渲染开放连接终端及公开联系入口。
 */
export function OpenChannel(): React.JSX.Element {
  const { t } = useI18n();
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
                <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="link">
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
