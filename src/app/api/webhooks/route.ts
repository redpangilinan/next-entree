import { headers } from "next/headers"
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from "svix"

import { env } from "@/env.mjs"

export async function POST(req: Request) {
  const SIGNING_SECRET = env.CLERK_SINGING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    )
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let webEvent: WebhookEvent

  // Verify payload with headers
  try {
    webEvent = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error: Could not verify webhook:", err)
    return new Response("Error: Verification error", {
      status: 400,
    })
  }

  const clerk = await clerkClient()
  switch (webEvent.type) {
    case "user.created":
      await clerk.users.updateUser(webEvent.data.id, {
        publicMetadata: {
          roles: ["user"],
        },
      })
      break
  }

  return new Response("Webhook received", { status: 200 })
}
