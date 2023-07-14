import Login from "@/pages/login";
import { AuthRouteObject } from "@/types/route";

export const publicRoutes: AuthRouteObject[] = [
  {
    path: "/home",
    element: <h1>page</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
