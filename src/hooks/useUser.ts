import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export function useUser() {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
