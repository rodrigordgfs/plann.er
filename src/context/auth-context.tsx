import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

export interface AuthContextType {
  token: string | undefined;
  userId: string | undefined;
  isAuthLoading: boolean;
  handleSetToken: (token: string) => void;
  handleLogin: (
    email: string | undefined,
    password: string | undefined
  ) => void;
  handleRegister: (name: string, email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token") || undefined
  );
  const [userId, setUserId] = useState<string | undefined>(
    localStorage.getItem("userId") || undefined
  );
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  const handleSetToken = (value: string) => {
    setToken(value);
    localStorage.setItem("token", value);
  };

  const handleSetUserId = (value: string) => {
    setUserId(value);
    localStorage.setItem("userId", value);
  };

  const handleLogin = (
    email: string | undefined,
    password: string | undefined
  ) => {
    setIsAuthLoading(true);

    api
      .post("/sign-in", {
        email,
        password,
      })
      .then(({ data }) => {
        handleSetToken(data.token);
        handleSetUserId(data.id);
        toast.success("Login realizado com sucesso!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setIsAuthLoading(true);

    api
      .post("/sign-up", {
        name,
        email,
        password,
      })
      .then(({ data }) => {
        handleSetToken(data.token);
        handleSetUserId(data.id);
        toast.success("Cadastro realizado com sucesso!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        handleSetToken,
        handleLogin,
        isAuthLoading,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
