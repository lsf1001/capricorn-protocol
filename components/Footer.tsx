"use client";

import { useI18n } from "@/components/I18nProvider";

/**
 * 渲染站点版权与 Capricorn Protocol 标识。
 */
export function Footer(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <footer className="protocol-footer">
      <p className="protocol-footer__copyright">{t("footer.copyright")}</p>
      <p className="protocol-footer__interface">{t("footer.interface")}</p>
      <div className="protocol-footer__contract" aria-label={t("footer.contractHashLabel")}>
        <span>{t("footer.contractHashLabel")}</span>
        <span>{t("about.contractHash")}</span>
      </div>
    </footer>
  );
}
