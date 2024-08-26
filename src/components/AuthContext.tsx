import { Auth, User } from "firebase/auth";
import React from "react";

export const AuthContext = React.createContext<{
  auth: Auth | null;
  user: User | null;
}>({ auth: null, user: null });
