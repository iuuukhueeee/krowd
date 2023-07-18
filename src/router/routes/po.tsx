import PrivateRoute from "@/features/auth/components/private-route";
import POLayout from "@/features/layout/po-layout";
import CreateProject from "@/pages/po/create-project";
import ProjectView from "@/pages/po/project-list";
import UpdateProject from "@/pages/po/update-project";
import { Role } from "@/types/enums/role";
import { AuthRouteObject } from "@/types/route";

export const poRoutes: AuthRouteObject[] = [
  {
    path: "/po",
    element: <PrivateRoute requiredRole={[Role.PO]} />,
    children: [
      {
        path: "/po/create",
        element: <CreateProject />,
        layout: POLayout,
      },
      {
        path: "/po/projects",
        element: <ProjectView />,
        layout: POLayout,
      },
      {
        path: "/po/update-project/:id",
        element: <UpdateProject />,
        layout: POLayout,
      },
    ],
  },
];
