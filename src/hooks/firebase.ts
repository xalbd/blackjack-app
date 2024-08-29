// Import the functions you need from the SDKs you need
import { generateRandomUsername } from "@/utils/username";
import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
  User,
} from "firebase/auth";
import React from "react";

export default function useFirebase() {
  const [user, setUser] = React.useState<User | null>(null);
  const [auth, setAuth] = React.useState<Auth | null>(null);

  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    setAuth(auth);

    onAuthStateChanged(auth, (u) => {
      if (!u) {
        signInAnonymously(auth).then((u) => {
          updateProfile(u.user, { displayName: generateRandomUsername() });
        });
      } else if (!u.displayName) {
        updateProfile(u, { displayName: generateRandomUsername() });
      }

      setUser(u);
    });
  }, []);

  return { user, auth };
}
