import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@/features/auth/services/firebase";
import { signInWithGoogle } from "@/features/auth/services/google";

export default function useGoogleLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
      },
      (error) => {
        setError(error);
      },
    );
  }, [setUser]);

  return { user, error, signInWithGoogle };
}
