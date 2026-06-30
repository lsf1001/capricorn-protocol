import { AlertTriangle } from "lucide-react";

import { RepositoryForestMap } from "@/components/RepositoryForestMap";
import { SectionHeading } from "@/components/SectionHeading";
import { getGithubRepos } from "@/lib/github";
import { t_server } from "@/lib/i18n/server";

/**
 * 服务端获取公开仓库,把失败限制在项目星图区块。
 * SSR 阶段使用英文(server components 无法消费 useI18n);
 * 成功路径上的所有 UI 都由 client-side RepositoryForestMap 渲染,
 * 它会跟随用户在 Provider 中的 locale 切换。
 */
export async function RepositoryConstellationSection(): Promise<React.JSX.Element> {
  try {
    const repositories = await getGithubRepos();
    return <RepositoryForestMap repositories={repositories} />;
  } catch (error: unknown) {
    const context = error instanceof Error ? error.message : "Unknown GitHub API error";
    return (
      <div className="repository-constellation">
        <SectionHeading
          index="[02]"
          eyebrow="REPOSITORY CONSTELLATION"
          title={t_server("en", "heading.repositories")}
          description={t_server("en", "repo.constellationDescription")}
        />
        <div className="repository-error" role="status" data-error-context={context}>
          <AlertTriangle size={25} strokeWidth={1.4} aria-hidden="true" />
          <div>
            <strong>{t_server("en", "repo.errorTitle")}</strong>
            <span>{t_server("en", "repo.errorHint")}</span>
          </div>
        </div>
      </div>
    );
  }
}
