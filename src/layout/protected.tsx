import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/use-auth-context";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
