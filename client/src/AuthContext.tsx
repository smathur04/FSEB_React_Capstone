import { createContext, useContext, useState, type ReactNode } from "react";
import userService from "./utils/userService"; // adjust path to match your project
import type { User } from "./shared.types";

type LoginCredentials = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (creds: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => userService.getUser());

  async function login(creds: LoginCredentials) {
    await userService.login(creds); 
    setUser(userService.getUser());
  }

  function logout() {
    userService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}