import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/use-auth-context";
import { HeaderMenu } from "../components/header-menu";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <HeaderMenu />
      {element}
    </div>
  );
}
