import { useState } from "react";
import { Outlet } from "react-router-dom";

import useAsyncEffect from "@/hooks/useAsyncEffect";
import Error404 from "@/pages/error-404";
import { useUserService } from "@/services";
import { Role } from "@/types/enums/role";

interface PrivateRouteProps {
  requiredRole: Role;
}

export default function PrivateRoute({ requiredRole }: PrivateRouteProps) {
  const idToken = localStorage.getItem("id-token");
  const { user, getUser } = useUserService();
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await getUser();
    setLoading(false);
  }, []);

  if (!loading && user?.roleId === requiredRole) return <Outlet />;

  return <Error404 />;
}
