import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { initializeMockData, findUserByEmail, createUser, type MockUser } from "../data/mockData";

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, remember?: boolean) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  updateProfile: (updates: Partial<Pick<MockUser, "name" | "phone">>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = "trendify_session";
const REMEMBER_KEY = "trendify_remember";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    initializeMockData();
    const stored = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Verify user still exists
        const existing = findUserByEmail(parsed.email);
        if (existing && existing.password === parsed.password) {
          setUser(existing);
        } else {
          localStorage.removeItem(SESSION_KEY);
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback((email: string, password: string, remember = false) => {
    const found = findUserByEmail(email);
    if (!found) return { success: false, error: "No account found with this email." };
    if (found.password !== password) return { success: false, error: "Incorrect password. Please try again." };

    setUser(found);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify({ email: found.email, password: found.password }));
    if (remember) {
      localStorage.setItem(REMEMBER_KEY, email);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
    return { success: true };
  }, []);

  const signUp = useCallback((name: string, email: string, password: string) => {
    if (!name.trim()) return { success: false, error: "Name is required." };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { success: false, error: "Please enter a valid email address." };
    if (password.length < 8) return { success: false, error: "Password must be at least 8 characters." };

    const newUser: MockUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    const created = createUser(newUser);
    if (!created) return { success: false, error: "An account with this email already exists." };

    setUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: newUser.email, password: newUser.password }));
    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }, []);

  const updateProfile = useCallback((updates: Partial<Pick<MockUser, "name" | "phone">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      // Persist to users list
      const users = JSON.parse(localStorage.getItem("trendify_users") || "[]");
      const idx = users.findIndex((u: MockUser) => u.id === updated.id);
      if (idx >= 0) {
        users[idx] = updated;
        localStorage.setItem("trendify_users", JSON.stringify(users));
      }
      // Update session
      const sessionKey = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage;
      sessionKey.setItem(SESSION_KEY, JSON.stringify({ email: updated.email, password: updated.password }));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getRememberedEmail(): string {
  return localStorage.getItem(REMEMBER_KEY) || "";
}
