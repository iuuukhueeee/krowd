import { NavigateFunction } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { queryClient } from "@/App";
import { auth } from "@/features/auth/services/firebase";

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutWithGoogle = (navigate?: NavigateFunction) => async () => {
  localStorage.removeItem("id-token");
  if (typeof navigate === "function") navigate("/login");
  queryClient.removeQueries({
    queryKey: ["user", "login"],
    exact: true,
  });
  return await signOut(auth);
};
