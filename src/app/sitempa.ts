import { MetadataRoute } from "next"

import { env } from "@/env.mjs"

// TODO: Update Sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homePage: {
    url: string
    lastModified?: string | Date
    changeFrequency?:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never"
    priority?: number
  } = {
    url: env.NEXT_PUBLIC_APP_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }

  return [homePage]
}
