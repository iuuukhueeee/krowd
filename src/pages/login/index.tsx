import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center } from "@mantine/core";
import { isAxiosError } from "axios";

import { GoogleButton } from "@/features/auth/components/google-button";
import useGoogleLogin from "@/features/auth/hooks/use-google-login";
import { useQueryUser } from "@/services/use-query-user";
import { Role } from "@/types/enums/role";

export default function Login() {
  const { signIn, loading } = useGoogleLogin();
  const { isFetching, data, refetch, error } = useQueryUser();
  const navigate = useNavigate();

  useEffect(() => {
    const user = data?.data;

    if (user?.roleId === Role.ADMIN) return navigate("/admin/po");

    if (!isAxiosError(error)) return;
    const responseError = error?.response?.data?.error;
    if (
      parseInt(responseError.code || "") === 403 &&
      responseError.message === "can't access this api"
    )
      return navigate("/sign-up");
  }, [data?.data, error, navigate]);

  const handleLogin = async () => {
    await signIn();
    refetch();
  };

  return (
    <Center w="100vw" h="100vh">
      <GoogleButton loading={loading || isFetching} onClick={handleLogin}>
        Sign in with Google
      </GoogleButton>
    </Center>
  );
}
