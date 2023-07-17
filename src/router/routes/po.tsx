import PrivateRoute from "@/features/auth/components/private-route";
import AdminLayout from "@/features/layout/admin-layout";
import CreateProject from "@/pages/po/create-project";
import { Role } from "@/types/enums/role";
import { AuthRouteObject } from "@/types/route";

export const adminRoutes: AuthRouteObject[] = [
  {
    path: "/po",
    element: <PrivateRoute requiredRole={Role.PO} />,
    children: [
      {
        path: "/po/create",
        element: <CreateProject />,
        layout: AdminLayout,
      },
    ],
  },
];
