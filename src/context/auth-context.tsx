import { createContext, FC, ReactNode, useState } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

export interface AuthContextType {
  token: string | undefined;
  userId: string | undefined;
  isAuthLoading: boolean;
  handleSetToken: (token: string) => void;
  handleLogin: (email: string | undefined, password: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  const handleSetToken = (value: string) => {
    setToken(value);
  };

  const handleLogin = (email: string | undefined, password: string | undefined) => {
    setIsAuthLoading(true);
    
    api
      .post('/sign-in', {
        email,
        password,
      })
      .then(({ data }) => {
        setToken(data.token);
        setUserId(data.userId);
        toast.success("Login realizado com sucesso!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        handleSetToken,
        handleLogin,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
