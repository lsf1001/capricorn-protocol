/**
 * 集中维护对外公开的身份与联系方式常量。
 * 任何对 GitHub 用户名 / 邮箱的改动只动这一个文件即可。
 */

/** GitHub 用户名（小写用户名段），用于构建仓库 API 与 profile URL。 */
export const GITHUB_USERNAME = "lsf1001";

/** 完整的 GitHub profile URL，UI 中所有外链/OG 元数据都引用这里。 */
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

/** 公开的联系邮箱。占位阶段使用 example.com；真实邮箱只在这里维护。 */
export const CONTACT_EMAIL = "yexiaobai1001@gmail.com";

/** 生产站点绝对 URL(用于 OG、JSON-LD、sitemap 拼接绝对地址)。 */
export const SITE_URL = "https://capricorn-protocol.vercel.app";

/** 站点品牌名(用于 OG、JSON-LD、SEO 标题统一)。 */
export const SITE_BRAND = "0xForge · Capricorn Protocol";

/** 公开姓名的姓 + 名(用于 Person schema,只挂个人身份,不挂在职公司)。 */
export const PERSON_FULL_NAME = "令帅锋";

/** 公开使用的对外代号(英文)。 */
export const PERSON_HANDLE = "Laobai";

/** 公开职业头衔。 */
export const PERSON_JOB_TITLE = "AI × Blockchain Architect · Open to Contracts";
