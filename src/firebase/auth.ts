import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const credential = await signInWithPopup(auth, provider);
    const idTokenResult = await credential.user.getIdTokenResult();
    await fetch("/api/login", {
      // TODO: update this to use go backend
      method: "GET",
      headers: {
        Authorization: `Bearer ${idTokenResult.token}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    await fetch("/api/logout", {
      method: "GET",
    });
    window.location.reload();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
