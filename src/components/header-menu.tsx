import { useNavigate } from "react-router-dom";
import { DropdownMenu } from "./dropdown-menu";
import { LinearMenu } from "./linear-menu";

export function HeaderMenu() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="relative px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex flex-row items-center justify-between">
      <img
        onClick={handleGoToDashboard}
        src="/logo.svg"
        alt="Plann.er logo"
        className="h-8 cursor-pointer"
      />
      <div className="hidden sm:block">
        <LinearMenu />
      </div>
      <div className="block sm:hidden">
        <DropdownMenu />
      </div>
    </div>
  );
}
