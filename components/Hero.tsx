"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { motion, useMotionValue, useReducedMotion } from "motion/react";

import { BlockReveal, TextReveal } from "@/components/TextReveal";
import { CapricornConstellation } from "@/components/CapricornConstellation";
import { ForgeSigil } from "@/components/ForgeSigil";
import { MagneticButton } from "@/components/MagneticButton";
import { useI18n } from "@/components/I18nProvider";
import { GITHUB_PROFILE_URL } from "@/lib/profile";

const BOOT_INTERVAL_MS = 280;
const MOBILE_QUERY = "(max-width: 767px)";

function BootSequence(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const boot_lines = useMemo(
    () => [
      t("hero.bootLine1"),
      t("hero.bootLine2"),
      t("hero.bootLine3"),
      t("hero.bootLine4"),
    ],
    [t],
  );
  const [visible_lines, set_visible_lines] = useState(reduceMotion ? boot_lines.length : 0);
  const tick_ref = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      set_visible_lines(boot_lines.length);
      return undefined;
    }
    const clear_scheduled_tick = (): void => {
      if (tick_ref.current !== null) {
        window.clearTimeout(tick_ref.current);
        tick_ref.current = null;
      }
    };
    const tick = (): void => {
      tick_ref.current = null;
      set_visible_lines((current) => {
        if (current >= boot_lines.length) {
          return current;
        }
        return current + 1;
      });
      tick_ref.current = window.setTimeout(tick, BOOT_INTERVAL_MS);
    };
    tick_ref.current = window.setTimeout(tick, BOOT_INTERVAL_MS);
    return clear_scheduled_tick;
  }, [boot_lines, reduceMotion]);

  return (
    <div className="boot-sequence" aria-label={t("hero.bootlogAria")} data-testid="hero-boot-sequence">
      <span aria-hidden="true" className="boot-sequence__label">{t("hero.bootlogLabel")}</span>
      <ul className="boot-sequence__lines">
        {boot_lines.slice(0, visible_lines).map((line, index) => (
          <li
            key={line}
            className="boot-sequence__line"
            data-state={index === boot_lines.length - 1 ? "ready" : "running"}
          >
            <span className="boot-sequence__index">{(index + 1).toString().padStart(2, "0")}</span>
            <span className="boot-sequence__text">{line}</span>
          </li>
        ))}
      </ul>
      <span className="boot-sequence__cursor" aria-hidden="true" />
    </div>
  );
}

function HeroIdentityHeading(): React.JSX.Element {
  const { t } = useI18n();
  return (
    <div className="hero__identity-heading">
      <h2 className="hero__identity-title">
        <TextReveal text={t("hero.identityBlockchain")} delay={120} />
        <span className="hero__identity-mark" aria-hidden="true">×</span>
        <TextReveal text={t("hero.identityAi")} delay={420} />
      </h2>
    </div>
  );
}

/** Hero 主视觉：左侧身份系统 + 启动终端，右侧 Capricorn Constellation。 */
export function Hero(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const hero_ref = useRef<HTMLDivElement>(null);
  const tilt_x = useMotionValue(0);
  const tilt_y = useMotionValue(0);
  const { t } = useI18n();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (reduceMotion || window.matchMedia(MOBILE_QUERY).matches) {
      return undefined;
    }
    const node = hero_ref.current;
    if (!node) {
      return undefined;
    }
    const handle = (event: PointerEvent): void => {
      const rect = node.getBoundingClientRect();
      const offset_x = (event.clientX - rect.left) / rect.width - 0.5;
      const offset_y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt_x.set(offset_y * -2);
      tilt_y.set(offset_x * 2);
    };
    const reset = (): void => {
      tilt_x.set(0);
      tilt_y.set(0);
    };
    node.addEventListener("pointermove", handle, { passive: true });
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", handle);
      node.removeEventListener("pointerleave", reset);
    };
  }, [reduceMotion, tilt_x, tilt_y]);

  return (
    <section id="home" ref={hero_ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__protocol-strip" aria-hidden="true">
        <span className="hero__protocol-mark">
          <ForgeSigil size={26} compact />
          <span>{t("hero.protocolMark")}</span>
        </span>
        <span className="hero__protocol-line" />
        <span className="hero__protocol-meta">{t("hero.protocolMeta")}</span>
      </div>

      <div className="hero__grid">
        <motion.div
          className="hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__brand-tags">
            <span className="hero__brand-tag">
              <span className="hero__brand-prefix">{t("hero.brandPrefix")}</span>
              <span className="hero__brand-value hero__brand-value--protocol">{t("hero.brandValue")}</span>
            </span>
          </div>

          <h1 id="hero-title" className="hero__title" aria-label={t("hero.titleAccessible")}>
            <BlockReveal>
              <span className="hero__title-text">{t("hero.titleAccessible")}</span>
            </BlockReveal>
            <span className="hero__title-glow" aria-hidden="true" />
          </h1>

          <HeroIdentityHeading />

          <div className="hero__lab-meta">
            <span className="hero__lab-line">
              <span className="hero__lab-prefix">{t("hero.labPrefixEn")}</span>
              <span className="hero__lab-text">{t("hero.labTextEn")}</span>
            </span>
            <span className="hero__lab-line">
              <span className="hero__lab-prefix">{t("hero.labPrefixCn")}</span>
              <span className="hero__lab-text">{t("hero.labTextCn")}</span>
            </span>
          </div>

          <p className="hero__statement">{t("hero.statement")}</p>

          <div className="hero__actions">
            <MagneticButton
              variant="primary"
              href="#services"
              feedback={t("hero.feedbackRepos")}
            >
              {t("hero.ctaRepos")}
            </MagneticButton>
            <MagneticButton
              variant="text"
              href="#cases"
              feedback={t("hero.feedbackCase")}
            >
              {t("hero.ctaCase")}
            </MagneticButton>
            <MagneticButton
              variant="github"
              external
              href={GITHUB_PROFILE_URL}
              feedback={t("hero.feedbackGithub")}
            >
              {t("hero.ctaGithub")}
            </MagneticButton>
            <MagneticButton
              variant="text"
              href="#contact"
              feedback={t("hero.feedbackContact")}
            >
              {t("hero.ctaContact")}
            </MagneticButton>
          </div>

          <motion.div
            className="hero__terminal"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <BootSequence />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          style={{ rotateX: reduceMotion ? 0 : tilt_x, rotateY: reduceMotion ? 0 : tilt_y }}
        >
          <div className="hero__visual-shell">
            <CapricornConstellation />
            <div className="hero__visual-overlay" aria-hidden="true">
              <span className="hero__visual-label">{t("hero.visualLabel")}</span>
              <span className="hero__visual-status">
                <span className="hero__visual-pulse" />
                {t("hero.visualStatus")}
              </span>
            </div>
          </div>
          <span className="hero__connector hero__connector--vertical" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
