// Templated Role Based Access Control
// Source: https://www.youtube.com/watch?v=5GG-VUvruzE&t=180s

import {
  PermissionCheck,
  Permissions,
  Role,
} from "@/lib/auth/role-based-access-control"

export type Comment = {
  id: string
  body: string
  authorId: string
  createdAt: Date
}

export type Todo = {
  id: string
  title: string
  userId: string
  completed: boolean
  invitedUsers: string[]
}

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}
