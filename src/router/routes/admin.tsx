import AdminLayout from "@/features/layout/admin-layout";
import POPage from "@/pages/admin/po-page";
import ProjectsPage from "@/pages/admin/projects-page";
import { AuthRouteObject } from "@/types/route";

export const adminRoutes: AuthRouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "/admin/projects",
        element: <ProjectsPage />,
        layout: AdminLayout,
      },
      {
        path: "/admin/po",
        element: <POPage />,
        layout: AdminLayout,
      },
    ],
  },
];
