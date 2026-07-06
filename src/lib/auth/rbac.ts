// ======================
// Role-Based Access Control
// ======================

export type RoleName = "super_admin" | "admin" | "editor" | "user" | "api_user";

export interface RolePermissions {
  resources: string[];
  actions: string[];
}

export const ROLE_PERMISSIONS: Record<RoleName, RolePermissions> = {
  super_admin: {
    resources: ["*"],
    actions: ["*"],
  },
  admin: {
    resources: ["users", "blogs", "categories", "templates", "analytics", "settings", "contacts", "newsletter", "seo", "languages"],
    actions: ["create", "read", "update", "delete", "export"],
  },
  editor: {
    resources: ["blogs", "categories", "templates", "seo"],
    actions: ["create", "read", "update"],
  },
  user: {
    resources: ["barcodes", "qrcodes", "favorites", "history", "templates"],
    actions: ["create", "read", "update", "delete"],
  },
  api_user: {
    resources: ["barcodes", "qrcodes", "batch"],
    actions: ["create", "read"],
  },
};

export function hasPermission(role: RoleName, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;

  const hasResource = permissions.resources.includes("*") || permissions.resources.includes(resource);
  const hasAction = permissions.actions.includes("*") || permissions.actions.includes(action);

  return hasResource && hasAction;
}

export function isAdmin(role: string): boolean {
  return role === "super_admin" || role === "admin";
}
