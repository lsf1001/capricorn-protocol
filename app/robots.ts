import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/profile";

/**
 * robots.txt:允许全部抓取(主页 + sitemap),把 sitemap 指到生产域名。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}