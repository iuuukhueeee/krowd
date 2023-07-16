import { Navigate } from "react-router-dom";

import Login from "@/pages/login";
import { AuthRouteObject } from "@/types/route";

export const publicRoutes: AuthRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
