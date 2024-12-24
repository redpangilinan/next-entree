import { fileURLToPath } from "node:url"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    // // Supabase
    SUPABASE_URL: z.string().min(1, { message: "SUPABASE_URL is required" }),
    SUPABASE_ANON_KEY: z
      .string()
      .min(1, { message: "SUPABASE_ANON_KEY is required" }),
    // Clerk
    CLERK_SECRET_KEY: z
      .string()
      .min(1, { message: "CLERK_SECRET_KEY is required" }),
    CLERK_SINGING_SECRET: z
      .string()
      .min(1, { message: "CLERK_SECRET_KEY is required" }),
    PHONE_NUMBER: z.string().min(1, { message: "PHONE_NUMBER is required" }),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_APP_URL is required" }),
    NEXT_PUBLIC_BUCKET_NAME: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_BUCKET_NAME is required" }),
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required" }),
    // 3rd Parties
    NEXT_PUBLIC_GA_TAG_ID: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_GA_TAG_ID is required" }),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    DATABASE_URL: process.env.DATABASE_URL,

    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,

    NEXT_PUBLIC_BUCKET_NAME: process.env.NEXT_PUBLIC_BUCKET_NAME,
    PHONE_NUMBER: process.env.PHONE_NUMBER,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_SINGING_SECRET: process.env.CLERK_SINGING_SECRET,

    NEXT_PUBLIC_GA_TAG_ID: process.env.NEXT_PUBLIC_GA_TAG_ID,
  },
})
