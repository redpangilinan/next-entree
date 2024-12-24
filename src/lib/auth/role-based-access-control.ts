import { Comment, RolesWithPermissions, Todo } from "@/types/types"

// Define available roles (user types)
export type Role = "admin" | "moderator" | "user"
type User = { blockedBy: string[]; roles: Role[]; id: string } // Template User

// Define Permissions - This should match the Database entities
export type Permissions = {
  comments: {
    dataType: Comment
    action: "view" | "create" | "update" // Actions available to the entity
  }
  todos: {
    // Can do something like Pick<Todo, "userId"> to get just the rows you use
    dataType: Todo
    action: "view" | "create" | "update" | "delete"
  }
}

// Define Roles and their permissions
const ROLES = {
  admin: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: (user, todo) => todo.completed,
    },
  },
  user: {
    comments: {
      view: (user, comment) => !user.blockedBy.includes(comment.authorId),
      create: true,
      update: (user, comment) => comment.authorId === user.id,
    },
    todos: {
      view: (user, todo) => !user.blockedBy.includes(todo.userId),
      create: true,
      update: (user, todo) =>
        todo.userId === user.id || todo.invitedUsers.includes(user.id),
      delete: (user, todo) =>
        (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        todo.completed,
    },
  },
} as const satisfies RolesWithPermissions

// Handles checking of permissions for each role to a resource
export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

// Handles checking of permissions
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
    if (permission == null) return false

    if (typeof permission === "boolean") return permission
    return data != null && permission(user, data)
  })
}

// USAGE:
// Can create a comment
// hasPermission(user, "comments", "create")

// // Can view the `todo` Todo
// hasPermission(user, "todos", "view", todo)

// // Can view all todos
// hasPermission(user, "todos", "view")
