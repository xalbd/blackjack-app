// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import React from "react";

export default function useFirebase() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAWtbx1gSMh8TAqQBMbOhJK-nJDxRurq1Q",
      authDomain: "blackjack-622c8.firebaseapp.com",
      projectId: "blackjack-622c8",
      storageBucket: "blackjack-622c8.appspot.com",
      messagingSenderId: "412666873171",
      appId: "1:412666873171:web:ce8fcf8eeb4cf331f94da6",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (u) => {
      if (!u) {
        signInAnonymously(auth);
      }
      setUser(u);
    });
  }, []);

  return user;
}
