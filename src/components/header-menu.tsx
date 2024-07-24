import { Menu } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export function HeaderMenu() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex flex-row items-center justify-between">
      <img
        onClick={handleGoToDashboard}
        src="/logo.svg"
        alt="Plann.er logo"
        className="h-8 cursor-pointer"
      />
      <Button variant="primary" size="icon">
        <Menu className="size-5" />
      </Button>
    </div>
  );
}
