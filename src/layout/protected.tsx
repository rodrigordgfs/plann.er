import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/use-auth-context";
import { HeaderMenu } from "../components/header-menu";
import { useEffect } from "react";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <HeaderMenu />
      {element}
    </div>
  );
}
