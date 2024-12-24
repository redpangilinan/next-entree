import { clerkClient } from "@clerk/nextjs/server"

import { Role } from "./role-based-access-control"

export async function UpdateRole(userId: string, role: Role) {
  const clerk = await clerkClient()
  // Handle Clerk Events
  await clerk.users.updateUser(userId, {
    publicMetadata: {
      roles: [role],
    },
  })
}
