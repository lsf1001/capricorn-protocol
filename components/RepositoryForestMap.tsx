"use client";

import { useEffect, useMemo, useState } from "react";

import { ChevronDown, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/components/I18nProvider";
import {
  filterRepositories,
  sortRepositories,
} from "@/lib/repositories";
import type { GithubRepo, RepositoryLanguage, RepositorySort } from "@/types/github";

interface RepositoryForestMapProps {
  repositories: GithubRepo[];
}

interface OrbPosition {
  x: number; // 0-100 percent
  y: number; // 0-100 percent
}

interface LanguageOption {
  labelKey: string;
  value: RepositoryLanguage;
}

const LANGUAGE_OPTIONS: ReadonlyArray<LanguageOption> = [
  { labelKey: "repo.lang.all", value: "All" },
  { labelKey: "repo.lang.ts", value: "TypeScript" },
  { labelKey: "repo.lang.js", value: "JavaScript" },
  { labelKey: "repo.lang.python", value: "Python" },
  { labelKey: "repo.lang.java", value: "Java" },
  { labelKey: "repo.lang.solidity", value: "Solidity" },
  { labelKey: "repo.lang.go", value: "Go" },
  { labelKey: "repo.lang.rust", value: "Rust" },
  { labelKey: "repo.lang.other", value: "Other" },
];

/** 每种语言在森林图谱里的色相:暗绿/琥珀/靛蓝/紫/青/金,刻意避免纯亮色,贴合奇幻夜色。 */
const GROVE: Record<string, { core: string; glow: string; edge: string }> = {
  All:        { core: "rgba(196, 230, 198, 0.85)", glow: "rgba(196, 230, 198, 0.45)", edge: "rgba(140, 200, 150, 0.55)" },
  TypeScript: { core: "rgba(34, 211, 238, 0.92)",  glow: "rgba(34, 211, 238, 0.55)",  edge: "rgba(34, 211, 238, 0.75)" },
  JavaScript: { core: "rgba(245, 196, 81, 0.9)",   glow: "rgba(245, 196, 81, 0.5)",   edge: "rgba(245, 196, 81, 0.7)" },
  Python:     { core: "rgba(139, 92, 246, 0.9)",   glow: "rgba(139, 92, 246, 0.5)",   edge: "rgba(139, 92, 246, 0.7)" },
  Java:       { core: "rgba(248, 113, 113, 0.85)", glow: "rgba(248, 113, 113, 0.45)", edge: "rgba(248, 113, 113, 0.65)" },
  Solidity:   { core: "rgba(180, 200, 220, 0.9)",  glow: "rgba(180, 200, 220, 0.5)",  edge: "rgba(180, 200, 220, 0.7)" },
  Go:         { core: "rgba(99, 179, 237, 0.9)",   glow: "rgba(99, 179, 237, 0.5)",   edge: "rgba(99, 179, 237, 0.7)" },
  Rust:       { core: "rgba(217, 119, 87, 0.9)",   glow: "rgba(217, 119, 87, 0.5)",   edge: "rgba(217, 119, 87, 0.7)" },
  Other:      { core: "rgba(196, 181, 253, 0.85)", glow: "rgba(196, 181, 253, 0.45)", edge: "rgba(196, 181, 253, 0.65)" },
};

function groveFor(language: string): { core: string; glow: string; edge: string } {
  return GROVE[language] ?? GROVE.Other!;
}

/** 简单确定性 hash -> 0-1 浮点 */
function hash01(seed: number, salt: number): number {
  const v = (seed * 2654435761) ^ (salt * 1597334677);
  return ((v >>> 0) % 100000) / 100000;
}

/**
 * 把仓库 id 映射到森林图谱的二维坐标。
 * 排除中心 18% 圆心(给罗盘/标题用),边缘 6% 收一点避免被树挡。
 * 使用简单 grid + hash 抖动,保证节点分散又不会太随机。
 */
function positionFor(id: number, total: number, index: number): OrbPosition {
  const cols = Math.max(2, Math.ceil(Math.sqrt(total)));
  const rows = Math.max(2, Math.ceil(total / cols));
  const col = index % cols;
  const row = Math.floor(index / cols);
  const baseX = (col + 0.5) / cols;
  const baseY = (row + 0.5) / rows;
  const jx = (hash01(id, 17) - 0.5) * (0.7 / cols);
  const jy = (hash01(id, 91) - 0.5) * (0.7 / rows);
  return {
    x: Math.max(0.06, Math.min(0.94, baseX + jx)),
    y: Math.max(0.12, Math.min(0.88, baseY + jy)),
  };
}

/** 用仓库对之间的位置 + 语言相似度计算路径强度 */
function pathStrength(
  a: GithubRepo,
  b: GithubRepo,
  pa: OrbPosition,
  pb: OrbPosition,
): number {
  const dx = pa.x - pb.x;
  const dy = pa.y - pb.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const distanceScore = Math.max(0, 1 - dist * 1.4);
  const sameLang = a.language === b.language ? 0.5 : 0;
  const shared = a.topics.filter((t) => b.topics.includes(t)).length;
  const topicScore = Math.min(0.4, shared * 0.15);
  return Math.min(1, distanceScore * 0.55 + sameLang * 0.3 + topicScore);
}

/** 奇幻森林图谱:每个仓库是图上的一个发光节点,点击展开详情。 */
export function RepositoryForestMap({ repositories }: RepositoryForestMapProps): React.JSX.Element {
  const [language, setLanguage] = useState<RepositoryLanguage>("All");
  const [sort, setSort] = useState<RepositorySort>("updated");
  const [active_id, setActiveId] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

  const visibleRepositories = useMemo(
    () => sortRepositories(filterRepositories(repositories, language), sort),
    [language, repositories, sort],
  );

  // 坐标在排序/筛选后保持稳定:用 repo.id 决定 index,而不是数组 index
  const positions = useMemo(() => {
    const sortedAll = sortRepositories(repositories, sort);
    const indexById = new Map<number, number>();
    sortedAll.forEach((repo, index) => indexById.set(repo.id, index));
    const map = new Map<number, OrbPosition>();
    sortedAll.forEach((repo) => {
      const idx = indexById.get(repo.id) ?? 0;
      map.set(repo.id, positionFor(repo.id, sortedAll.length, idx));
    });
    return map;
  }, [repositories, sort]);

  const links = useMemo(() => {
    const result: Array<{ from: GithubRepo; to: GithubRepo; strength: number }> = [];
    for (let i = 0; i < visibleRepositories.length; i++) {
      for (let j = i + 1; j < visibleRepositories.length; j++) {
        const a = visibleRepositories[i]!;
        const b = visibleRepositories[j]!;
        const pa = positions.get(a.id);
        const pb = positions.get(b.id);
        if (!pa || !pb) continue;
        const strength = pathStrength(a, b, pa, pb);
        if (strength > 0.42) {
          result.push({ from: a, to: b, strength });
        }
      }
    }
    return result;
  }, [positions, visibleRepositories]);

  const activeRepo = useMemo(
    () => visibleRepositories.find((r) => r.id === active_id) ?? null,
    [active_id, visibleRepositories],
  );

  const clearing_count = visibleRepositories.length;
  const clearing_label = clearing_count === 1
    ? t("repo.clearingOne", { count: clearing_count })
    : t("repo.clearingOther", { count: clearing_count });

  useEffect(() => {
    if (!activeRepo) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeRepo]);

  return (
    <div className="repository-constellation">
      <SectionHeading
        index="[02]"
        eyebrow="REPOSITORY CONSTELLATION"
        title={t("heading.repositories")}
        description={t("repo.constellationDescription")}
      />

      <div className="repository-toolbar">
        <div className="repository-filters" aria-label={t("repo.toolbarAria")}>
          {LANGUAGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={language === option.value ? "is-active" : ""}
              type="button"
              aria-pressed={language === option.value}
              onClick={() => setLanguage(option.value)}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
        <label className="repository-sort">
          <span className="sr-only">{t("repo.sortAria")}</span>
          <select
            value={sort}
            aria-label={t("repo.sortAria")}
            onChange={(event) => setSort(event.target.value as RepositorySort)}
          >
            <option value="updated">{t("repo.sortUpdated")}</option>
            <option value="stars">{t("repo.sortStars")}</option>
            <option value="name">{t("repo.sortName")}</option>
          </select>
          <ChevronDown size={15} aria-hidden="true" />
        </label>
      </div>

      {visibleRepositories.length === 0 ? (
        <div className="repository-empty">
          <Sparkles size={28} strokeWidth={1.25} aria-hidden="true" />
          <p>{t("repo.emptyTitle")}</p>
          <span>{t("repo.emptyHint")}</span>
        </div>
      ) : (
        <div className="repository-forest" role="region" aria-label={t("repo.forestAria")}>
          {/* 背景层:森林 */}
          <svg className="repository-forest__bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="forest-ambient" cx="50%" cy="55%" r="75%">
                <stop offset="0%" stopColor="#0b1a26" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#06121b" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#020610" stopOpacity="1" />
              </radialGradient>
              <radialGradient id="forest-mist-a" cx="20%" cy="30%" r="40%">
                <stop offset="0%" stopColor="#3a6b8a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#3a6b8a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="forest-mist-b" cx="80%" cy="70%" r="45%">
                <stop offset="0%" stopColor="#2d4a3a" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2d4a3a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="forest-mist-c" cx="55%" cy="20%" r="35%">
                <stop offset="0%" stopColor="#4a5a3a" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#4a5a3a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="tree-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#03101a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0a1e2c" stopOpacity="0.7" />
              </linearGradient>
              <radialGradient id="compass-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(245, 196, 81, 0.2)" />
                <stop offset="100%" stopColor="rgba(245, 196, 81, 0)" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="600" fill="url(#forest-ambient)" />
            <rect x="0" y="0" width="1000" height="600" fill="url(#forest-mist-a)" />
            <rect x="0" y="0" width="1000" height="600" fill="url(#forest-mist-b)" />
            <rect x="0" y="0" width="1000" height="600" fill="url(#forest-mist-c)" />

            <g opacity="0.4" fill="url(#tree-grad)">
              <polygon points="40,520 60,420 80,520" />
              <polygon points="95,540 120,400 145,540" />
              <polygon points="155,530 175,440 195,530" />
              <polygon points="220,540 245,410 270,540" />
              <polygon points="800,520 820,420 840,520" />
              <polygon points="855,540 880,400 905,540" />
              <polygon points="915,530 935,440 955,530" />
              <polygon points="200,140 215,80 230,140" />
              <polygon points="780,160 800,90 820,160" />
              <polygon points="830,170 845,110 860,170" />
            </g>

            <g fill="url(#tree-grad)">
              <polygon points="-10,580 35,360 80,580" />
              <polygon points="60,600 110,340 160,600" />
              <polygon points="140,590 175,380 210,590" />
              <polygon points="195,600 240,330 285,600" />
              <polygon points="900,600 945,340 990,600" />
              <polygon points="850,580 895,360 940,580" />
              <polygon points="800,600 840,350 880,600" />
              <polygon points="755,590 790,380 825,590" />
              <polygon points="-20,200 10,90 40,200" />
              <polygon points="965,220 985,100 1005,220" />
              <polygon points="0,300 20,210 40,300" />
              <polygon points="960,320 980,220 1000,320" />
            </g>

            <g transform="translate(900, 540)" opacity="0.7">
              <circle r="38" fill="url(#compass-grad)" />
              <circle r="32" fill="none" stroke="rgba(245, 196, 81, 0.45)" strokeWidth="0.6" />
              <circle r="22" fill="none" stroke="rgba(245, 196, 81, 0.3)" strokeWidth="0.4" />
              <polygon points="0,-30 4,0 0,4 -4,0" fill="rgba(245, 196, 81, 0.85)" />
              <polygon points="0,30 4,0 0,-4 -4,0" fill="rgba(245, 196, 81, 0.35)" />
              <polygon points="-30,0 0,4 4,0 0,-4" fill="rgba(148, 163, 184, 0.5)" />
              <polygon points="30,0 0,4 -4,0 0,-4" fill="rgba(148, 163, 184, 0.5)" />
              <text y="-34" textAnchor="middle" fill="rgba(245, 196, 81, 0.7)" fontSize="8" fontFamily="var(--font-mono)">N</text>
              <text y="44" textAnchor="middle" fill="rgba(148, 163, 184, 0.55)" fontSize="7" fontFamily="var(--font-mono)">S</text>
              <text x="38" y="3" textAnchor="middle" fill="rgba(148, 163, 184, 0.5)" fontSize="7" fontFamily="var(--font-mono)">E</text>
              <text x="-38" y="3" textAnchor="middle" fill="rgba(148, 163, 184, 0.5)" fontSize="7" fontFamily="var(--font-mono)">W</text>
            </g>

            <g transform="translate(40, 555)" opacity="0.6" fill="rgba(196, 181, 253, 0.65)" fontFamily="var(--font-mono)" fontSize="8">
              <text>FOREST ATLAS · 0xFORGE</text>
              <text y="14" fontSize="6" opacity="0.7">scale 1 : 100n</text>
            </g>

            <g className="repository-forest__fireflies" aria-hidden="true">
              {Array.from({ length: 22 }).map((_, i) => {
                const x = (hash01(i, 7) * 96 + 2).toFixed(1);
                const y = (hash01(i, 19) * 80 + 8).toFixed(1);
                const delay = (hash01(i, 31) * 6).toFixed(2);
                const size = (1.4 + hash01(i, 43) * 1.4).toFixed(2);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={size}
                    fill="rgba(216, 247, 255, 0.9)"
                    style={{ animationDelay: `${delay}s` }}
                  />
                );
              })}
            </g>
          </svg>

          {/* 路径层 */}
          <svg className="repository-forest__paths" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            {links.map((link, i) => {
              const pa = positions.get(link.from.id)!;
              const pb = positions.get(link.to.id)!;
              const ax = pa.x;
              const ay = pa.y * 0.6;
              const bx = pb.x;
              const by = pb.y * 0.6;
              const mx = (ax + bx) / 2;
              const my = (ay + by) / 2 - 4;
              const op = 0.15 + link.strength * 0.45;
              return (
                <path
                  key={`link-${link.from.id}-${link.to.id}-${i}`}
                  d={`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`}
                  fill="none"
                  stroke="rgba(196, 230, 198, 0.7)"
                  strokeWidth={0.18 + link.strength * 0.22}
                  strokeOpacity={op}
                  strokeDasharray={link.strength > 0.75 ? "none" : "0.8 0.6"}
                />
              );
            })}
          </svg>

          {/* 节点层 */}
          <ul className="repository-forest__nodes" aria-label={t("repo.nodesAria")}>
            {visibleRepositories.map((repo) => {
              const pos = positions.get(repo.id);
              if (!pos) return null;
              const colors = groveFor(repo.language);
              const isActive = active_id === repo.id;
              return (
                <li
                  key={repo.id}
                  className={`repository-forest__node${isActive ? " is-active" : ""}`}
                  data-testid="repository-card"
                  data-cursor="card"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    ["--orb-core" as string]: colors.core,
                    ["--orb-glow" as string]: colors.glow,
                    ["--orb-edge" as string]: colors.edge,
                  }}
                >
                  <button
                    type="button"
                    className="repository-forest__orb"
                    onClick={() => setActiveId(repo.id)}
                    aria-label={t("repo.viewDetails", { name: repo.name })}
                  >
                    <span className="repository-forest__aura" aria-hidden="true" />
                    <span className="repository-forest__core" aria-hidden="true" />
                  </button>
                  <span className="repository-forest__label">
                    <span className="repository-forest__name">{repo.name}</span>
                    <span className="repository-forest__lang">{repo.language}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="repository-forest__overlay" aria-hidden="true">
            <div className="repository-forest__title">
              <span>{t("repo.overlayTitle")}</span>
              <strong>{clearing_label}</strong>
            </div>
            <div className="repository-forest__legend">
              {(["TypeScript", "JavaScript", "Python", "Solidity", "Rust", "Go", "Other"] as const).map((lang) => {
                const c = groveFor(lang);
                return (
                  <span key={lang} style={{ ["--orb-core" as string]: c.core }}>
                    <i />
                    {lang}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeRepo ? (
        <div className="repository-drawer" role="dialog" aria-label={t("repo.drawerAria", { name: activeRepo.name })}>
          <button
            type="button"
            className="repository-drawer__scrim"
            aria-label={t("repo.closeAria")}
            onClick={() => setActiveId(null)}
          />
          <motion.aside
            className="repository-drawer__panel"
            initial={reduceMotion ? false : { x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="repository-drawer__close"
              aria-label={t("repo.closeAria")}
              onClick={() => setActiveId(null)}
              data-cursor="orb"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <ProjectCard repository={activeRepo} />
          </motion.aside>
        </div>
      ) : null}
    </div>
  );
}
