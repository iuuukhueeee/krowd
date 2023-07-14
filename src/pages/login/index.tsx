import { Center } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { GoogleButton } from "@/features/auth/components/GoogleButton";
import { GoogleIcon } from "@/features/auth/components/GoogleIcon";
import useGoogleLogin from "@/features/auth/hooks/useGoogleLogin";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import setIdToken from "@/utils/setIdToken";

export default function Login() {
  const { signInWithGoogle, user } = useGoogleLogin();

  useAsyncEffect(async () => {
    if (user) {
      setIdToken(await user.getIdToken());
      notifications.show({
        icon: <GoogleIcon />,
        message: "Google login successful!",
      });
    }
  }, [user]);

  return (
    <Center w="100vw" h="100vh">
      <GoogleButton onClick={signInWithGoogle}>Login</GoogleButton>
    </Center>
  );
}
