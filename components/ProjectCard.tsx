"use client";

import { ExternalLink, GitFork, Globe2, Star } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { type GithubRepo } from "@/types/github";
import type { Locale } from "@/lib/i18n/types";

interface ProjectCardProps {
  repository: GithubRepo;
}

function formatUpdatedDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));
}

function createDecorativeHash(id: number): string {
  return `0x${((id * 2654435761) >>> 0).toString(16).slice(0, 3).toUpperCase().padEnd(3, "0")}`;
}

/** 映射为仓库星图节点的项目卡片。 */
export function ProjectCard({ repository }: ProjectCardProps): React.JSX.Element {
  const { locale, t } = useI18n();
  const date_label = formatUpdatedDate(repository.updated_at, locale);
  return (
    <article className="project-card" data-testid="repository-card" data-cursor="card">
      <div className="project-card__scan" aria-hidden="true" />
      <div className="project-card__network" aria-hidden="true">
        <i /><i /><i />
      </div>
      <header className="project-card__header">
        <div>
          <span className="project-card__type">{t("repo.githubRepoCard.type")}</span>
          <h3>{repository.name}</h3>
        </div>
        <span className="project-card__hash" aria-hidden="true">
          {t("repo.githubRepoCard.nodePrefix")} {createDecorativeHash(repository.id)}
        </span>
      </header>

      <p className="project-card__description">{repository.description}</p>

      {repository.topics.length > 0 ? (
        <div className="project-card__topics" aria-label={t("repo.githubRepoCard.topicsAria")}>
          {repository.topics.slice(0, 4).map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      ) : null}

      <footer className="project-card__footer">
        <div className="project-card__metrics">
          <span className="language-mark"><i aria-hidden="true" />{repository.language}</span>
          <span><Star size={14} aria-hidden="true" />{repository.stargazers_count}</span>
          <span><GitFork size={14} aria-hidden="true" />{repository.forks_count}</span>
        </div>
        <time dateTime={repository.updated_at}>
          {t("repo.githubRepoCard.updatedAt", { date: date_label })}
        </time>
      </footer>

      <div className="project-card__links">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label={t("repo.githubRepoCard.viewOnGithub", { name: repository.name })}
          data-cursor="link"
        >
          {t("repo.githubRepoCard.githubLabel")}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        {repository.homepage ? (
          <a
            href={repository.homepage}
            target="_blank"
            rel="noreferrer"
            aria-label={t("repo.githubRepoCard.viewHomepage", { name: repository.name })}
            data-cursor="link"
          >
            <Globe2 size={14} aria-hidden="true" />
            {t("repo.githubRepoCard.liveLabel")}
          </a>
        ) : null}
      </div>
    </article>
  );
}
