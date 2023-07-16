import { useCallback, useState } from "react";
import { UserCredential } from "firebase/auth";

import { signInWithGoogle } from "@/features/auth/services/google";

export default function useGoogleLogin() {
  const [credential, setCredential] = useState<UserCredential | null>(null);
  const [error, setError] = useState<Error | unknown>(undefined);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async () => {
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      setCredential(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { credential, error, signIn, loading };
}
