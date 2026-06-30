import { Suspense } from "react";

import { AboutArchitect } from "@/components/AboutArchitect";
import { ArchitectureModules } from "@/components/ArchitectureModules";
import { CapricornProtocolBackground } from "@/components/CapricornProtocolBackground";
import { CursorAura } from "@/components/CursorAura";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { OpenChannel } from "@/components/OpenChannel";
import { ProtocolStack } from "@/components/ProtocolStack";
import { RepositoryConstellationSection } from "@/components/RepositoryConstellationSection";
import { RepositorySkeleton } from "@/components/RepositorySkeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { t_server } from "@/lib/i18n/server";

export const revalidate = 3600;

/**
 * 仓库星图加载期间的 SSR fallback。
 * 用英文固定文案,避免 page.tsx 调用 cookies() 让 route 变 dynamic、放弃 ISR;
 * 加载完成后 client-side RepositoryForestMap 会跟着用户 locale 切换。
 */
function RepositoryLoadingSection(): React.JSX.Element {
  return (
    <div className="repository-constellation">
      <SectionHeading
        index="[02]"
        eyebrow="REPOSITORY CONSTELLATION"
        title={t_server("en", "heading.repositories")}
        description={t_server("en", "repo.constellationDescription")}
      />
      <RepositorySkeleton />
    </div>
  );
}

/** 0xForge 摩羯契约单页协议界面。 */
export default function Page(): React.JSX.Element {
  return (
    <div className="site-shell">
      <CapricornProtocolBackground />
      <CursorAura />
      <Navbar />
      <main className="site-main">
        <Hero />
        <ArchitectureModules />
        <section id="repositories" className="protocol-section" aria-label={t_server("en", "heading.repositories")}>
          <Suspense fallback={<RepositoryLoadingSection />}>
            <RepositoryConstellationSection />
          </Suspense>
        </section>
        <ProtocolStack />
        <AboutArchitect />
        <OpenChannel />
      </main>
      <Footer />
    </div>
  );
}
