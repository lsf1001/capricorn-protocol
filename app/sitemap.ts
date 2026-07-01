import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/profile";

/**
 * Next.js 自动生成的站点地图。所有 URL 走绝对地址,
 * 主页变更频率与 ISR 一致(`revalidate = 3600`)。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          zh: `${SITE_URL}/`,
        },
      },
    },
  ];
}