import * as React from "react";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext({ token: null });

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (token: string) => {
    setToken(token);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
