import { User, onAuthStateChanged } from "firebase/auth";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthContextValue {
  currentUser: User | null;
}
export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
});
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
