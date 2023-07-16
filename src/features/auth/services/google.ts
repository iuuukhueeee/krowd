import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/features/auth/services/firebase";

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
