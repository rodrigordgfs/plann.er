import { Home, LogOut, Settings, User } from "lucide-react";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

export function LinearMenu() {
  const navigate = useNavigate();
  const { handleLogOut } = useAuthContext();

  const handleProfile = () => {
    toast.info("Em breve");
  };

  const handleSettings = () => {
    toast.info("Em breve");
  };

  const handleHome = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleLogOutAndClose = () => {
    handleLogOut();
  };

  return (
    <div
      className="text-zinc-200 flex items-center gap-2"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <button
        onClick={handleHome}
        className="flex items-center gap-2 p-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <Home />
        <p>Inicio</p>
      </button>
      <button
        onClick={handleProfile}
        className="flex items-center gap-2 p-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <User />
        <p>Perfil</p>
      </button>
      <button
        onClick={handleSettings}
        className="flex items-center gap-2 p-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <Settings />
        <p>Configurações</p>
      </button>
      <button
        onClick={handleLogOutAndClose}
        className="flex items-center gap-2 p-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <LogOut />
        <p>Sair</p>
      </button>
    </div>
  );
}
