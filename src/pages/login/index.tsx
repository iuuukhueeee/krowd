import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center } from "@mantine/core";

import { GoogleButton } from "@/features/auth/components/google-button";
import useGoogleLogin from "@/features/auth/hooks/use-google-login";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { useAuthenticationService, useUserService } from "@/services";
import { Role } from "@/types/enums/role";
import setIdToken from "@/utils/set-id-token";

export default function Login() {
  const { signIn, loading, credential } = useGoogleLogin();
  const { getAuthentication } = useAuthenticationService();
  const { getUser, user } = useUserService();
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    if (!credential) return;

    const idToken = await credential.user.getIdToken();
    setIdToken(idToken);

    await getAuthentication();
    await getUser();
  }, [credential]);

  useEffect(() => {
    if (user?.roleId === Role.ADMIN) navigate("/admin/po");
  }, [navigate, user]);

  return (
    <Center w="100vw" h="100vh">
      <GoogleButton loading={loading} onClick={signIn}>
        Sign in with Google
      </GoogleButton>
    </Center>
  );
}
