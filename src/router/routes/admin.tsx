import PrivateRoute from "@/features/auth/components/private-route";
import AdminLayout from "@/features/layout/admin-layout";
import POPage from "@/pages/admin/po";
import ProjectsPage from "@/pages/admin/projects-page";
import { Role } from "@/types/enums/role";
import { AuthRouteObject } from "@/types/route";

export const adminRoutes: AuthRouteObject[] = [
  {
    path: "/admin",
    element: <PrivateRoute requiredRole={[Role.ADMIN]} />,
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
