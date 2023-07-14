import AdminLayout from "@/features/layout/admin-layout";
import Projects from "@/pages/admin/projects";
import { data } from "@/router/routes/mock";
import { AuthRouteObject } from "@/types/route";

export const adminRoutes: AuthRouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "/admin/projects",
        element: <Projects data={data} />,
        layout: AdminLayout,
      },
    ],
  },
];
