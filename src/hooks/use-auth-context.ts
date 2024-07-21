import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/auth-context";

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useauthContext must be used within a AuthProvider");
  }
  return context;
};

export default useAuthContext;
