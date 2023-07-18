import { createBrowserRouter, Navigate } from "react-router-dom";

import Error404 from "@/pages/error-404";
import { adminRoutes } from "@/router/routes/admin";
import { poRoutes } from "@/router/routes/po";
import { publicRoutes } from "@/router/routes/public";
import { AuthRouteObject } from "@/types/route";

export const resolveAllRoutes = (...routes: AuthRouteObject[]): AuthRouteObject[] => {
  return routes.map((route) => {
    // route.errorElement = <ErrorBoundary />;
    if (route.layout)
      route.element = <route.layout priviliges={route.priviliges}>{route.element}</route.layout>;
    if (route.children) route.children = resolveAllRoutes(...route.children);
    return route;
  });
};

export const resolvedRoutes = resolveAllRoutes(
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    children: publicRoutes,
  },
  ...adminRoutes,
  ...poRoutes,
  // guestRoute,
  // allRoute,
  // userRoute,
  // adminRoute,
  // studentRoute,
  {
    path: "*",
    element: <Error404 />,
  },
);

export const browserRouter = createBrowserRouter(resolvedRoutes);
