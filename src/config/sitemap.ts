export const siteMapData = {
  Home: {
    path: "/",
    title: "Home",
    description: "Welcome to our website",
  },
  Auth: {
    path: "/auth",
    title: "Authentication",
    description: "Login or register to access your account",
  },
  AdminPanel: {
    path: "/admin",
    title: "Admin ",
    description: "Admin Panel",
  },
  Dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    description: "Your personal dashboard",
    children: {
      Profile: {
        path: "/dashboard/profile",
        title: "Profile",
        description: "Manage your profile settings",
      },
    },
  },
  About: {
    path: "/education",
    title: "Education",
    description: "Department of Education",
  },
  Contact: {
    path: "/health",
    title: "Health",
    description: "Department of Health",
  },
}
