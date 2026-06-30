"use client";

import { useEffect, useState } from "react";

import { GitBranch, Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import { ForgeSigil } from "@/components/ForgeSigil";
import { useI18n } from "@/components/I18nProvider";
import { GITHUB_PROFILE_URL } from "@/lib/profile";
import { LOCALE_LABELS } from "@/lib/i18n/types";

interface NavItem {
  href: string;
  labelKey: string;
  sectionId: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: "#home", labelKey: "nav.home", sectionId: "home" },
  { href: "#architecture", labelKey: "nav.architecture", sectionId: "architecture" },
  { href: "#repositories", labelKey: "nav.repositories", sectionId: "repositories" },
  { href: "#stack", labelKey: "nav.stack", sectionId: "stack" },
  { href: "#about", labelKey: "nav.about", sectionId: "about" },
  { href: "#contact", labelKey: "nav.contact", sectionId: "contact" },
];

export function LocaleToggle({ inMobile = false }: { inMobile?: boolean }): React.JSX.Element {
  const { locale, toggle, t } = useI18n();
  const next_locale = locale === "en" ? "zh" : "en";
  return (
    <button
      type="button"
      className={`locale-toggle${inMobile ? " locale-toggle--mobile" : ""}`}
      onClick={toggle}
      aria-label={t("nav.localeSwitchTo", { label: LOCALE_LABELS[next_locale] })}
      title={t("nav.localeToggle")}
    >
      <span aria-hidden="true">{LOCALE_LABELS[locale]}</span>
    </button>
  );
}

/** 全站固定导航，提供活动区块反馈和移动端菜单。 */
export function Navbar(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 24;
    setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.sectionId)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = (): void => setIsMenuOpen(false);

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (!reduceMotion) {
      target.classList.remove("section-scan-active");
      void target.offsetWidth;
      target.classList.add("section-scan-active");
      target.addEventListener(
        "animationend",
        () => target.classList.remove("section-scan-active"),
        { once: true },
      );
    }
    closeMenu();
  };

  return (
    <motion.header
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__inner">
        <a
          className="navbar__brand"
          href="#home"
          aria-label={t("nav.brandAria")}
          onClick={(event) => navigateToSection(event, "#home")}
        >
          <ForgeSigil size={30} compact />
          <span>0xForge</span>
        </a>

        <nav className="navbar__desktop" aria-label={t("nav.desktopAria")}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.sectionId}
              className={`navbar__link ${activeSection === item.sectionId ? "is-active" : ""}`}
              href={item.href}
              onClick={(event) => navigateToSection(event, item.href)}
            >
              {t(item.labelKey)}
            </a>
          ))}
          <LocaleToggle />
          <a className="navbar__github" href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
            <GitBranch size={15} strokeWidth={1.6} aria-hidden="true" />
            GitHub
          </a>
        </nav>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label={isMenuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <motion.nav
          id="mobile-navigation"
          className="navbar__mobile"
          aria-label={t("nav.mobileAria")}
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {NAV_ITEMS.map((item) => (
            <a key={item.sectionId} href={item.href} onClick={(event) => navigateToSection(event, item.href)}>
              <span>{t(item.labelKey)}</span>
              <span aria-hidden="true">{activeSection === item.sectionId ? t("nav.statusActive") : t("nav.statusOpen")}</span>
            </a>
          ))}
          <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
            <span>GitHub</span>
            <span aria-hidden="true">{t("nav.statusExternal")}</span>
          </a>
          <div className="navbar__mobile-locale">
            <LocaleToggle inMobile />
          </div>
        </motion.nav>
      ) : null}
    </motion.header>
  );
}
