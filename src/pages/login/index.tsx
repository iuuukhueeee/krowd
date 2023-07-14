import { Center } from "@mantine/core";

import { GoogleButton } from "@/features/auth/components/GoogleButton";
import useGoogleLogin from "@/features/auth/hooks/useGoogleLogin";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { useAuthenticationService, useUserService } from "@/services";
import setIdToken from "@/utils/setIdToken";

export default function Login() {
  const { signInWithGoogle, user } = useGoogleLogin();
  const { getAuthentication, authentication } = useAuthenticationService();
  const { getUser } = useUserService();

  useAsyncEffect(async () => {
    if (!user) return;
    setIdToken(await user.getIdToken());
    getAuthentication();
    getUser();
  }, [user]);

  return (
    <Center w="100vw" h="100vh">
      <GoogleButton loading={authentication.fetching} onClick={signInWithGoogle}>
        Login
      </GoogleButton>
    </Center>
  );
}
