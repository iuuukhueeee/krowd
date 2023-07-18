import { Navigate } from "react-router-dom";

import Login from "@/pages/login";
import SignUp from "@/pages/po/sign-up";
import ProjectView from "@/pages/project/view";
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
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/project/:id",
    element: <ProjectView />,
  },
];
