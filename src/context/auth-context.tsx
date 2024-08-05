import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

export interface AuthContextType {
  user: User | undefined;
  token: string | undefined;
  userId: string | undefined;
  isAuthLoading: boolean;
  isAccountCreatedModalOpen: boolean;
  isLoadingUser: boolean;
  isLaodingUpdateUser: boolean;
  handleSetToken: (token: string) => void;
  handleLogin: (
    email: string | undefined,
    password: string | undefined
  ) => void;
  handleRegister: (name: string, email: string, password: string) => void;
  handleCreatedAccountModalOpen: (value: boolean) => void;
  handleLogOut: () => void;
  handelGetUser: (userId: string | undefined) => void;
  handleUpdateUserData: (name: string, photo: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token") || undefined
  );
  const [userId, setUserId] = useState<string | undefined>(
    localStorage.getItem("userId") || undefined
  );
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isAccountCreatedModalOpen, setIsAccountCreatedModalOpen] =
    useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [isLaodingUpdateUser, setIsLoadingUpdateUser] =
    useState<boolean>(false);

  const handleSetToken = (value: string) => {
    setToken(value);
    localStorage.setItem("token", value);
  };

  const handleSetUserId = (value: string) => {
    setUserId(value);
    localStorage.setItem("userId", value);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const handelGetUser = useCallback(async (userId: string | undefined) => {
    setIsLoadingUser(true);

    try {
      const { data } = await api.get(`/users/${userId}`);

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        image: data.image_url,
      });
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response.data.message);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const handleUpdateUserData = (name: string, photo: string | null) => {
    setIsLoadingUpdateUser(true);
    const formData = new FormData();

    formData.append("name", name);

    if (photo) {
      formData.append("image", photo);
    }

    api
      .put(`/users/${userId}`, formData)
      .then(({ data }) => {
        setUser(data);
        toast.success("Dados atualizados com sucesso!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsLoadingUpdateUser(false);
      });
  };

  const handleLogin = (
    email: string | undefined,
    password: string | undefined
  ) => {
    setIsAuthLoading(true);

    api
      .post("/auth/login", {
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
      .post("/auth/register", {
        name,
        email,
        password,
      })
      .then(() => {
        handleCreatedAccountModalOpen(true);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleCreatedAccountModalOpen = (value: boolean) => {
    setIsAccountCreatedModalOpen(value);
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
        user,
        token,
        userId,
        handleSetToken,
        handleLogin,
        isAuthLoading,
        handleRegister,
        isAccountCreatedModalOpen,
        handleCreatedAccountModalOpen,
        handleLogOut,
        isLoadingUser,
        handelGetUser,
        handleUpdateUserData,
        isLaodingUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
