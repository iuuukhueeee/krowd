import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { auth } from "@/features/auth/services/firebase";

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithRedirect(auth, provider);
