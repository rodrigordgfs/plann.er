import { Home, LogOut, Menu, Settings, User } from "lucide-react";
import { Button } from "./button";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import useAuthContext from "../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

export function DropdownMenu() {
  const { handleLogOut } = useAuthContext();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfile = () => {
    toast.info("Em breve");
    setShowDropdown(false);
  };

  const handleHome = () => {
    navigate("/dashboard", { replace: true });
    setShowDropdown(false);
  };

  const handleSettings = () => {
    toast.info("Em breve");
    setShowDropdown(false);
  };

  const handleLogOutAndClose = () => {
    handleLogOut();
    setShowDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        size="icon"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Menu className="size-5" />
      </Button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5">
          <div
            className="text-zinc-200"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <button
              onClick={handleHome}
              className="block px-4 py-2 text-md rounded-tl-md rounded-tr-md w-full text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
              role="menuitem"
            >
              <Home className="inline mr-2" /> Início
            </button>
            <button
              onClick={handleProfile}
              className="block px-4 py-2 text-md rounded-tl-md rounded-tr-md w-full text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
              role="menuitem"
            >
              <User className="inline mr-2" /> Perfil
            </button>
            <button
              onClick={handleSettings}
              className="block px-4 py-2 text-md w-full text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
              role="menuitem"
            >
              <Settings className="inline mr-2" /> Configurações
            </button>
            <button
              onClick={handleLogOutAndClose}
              className="block px-4 py-2 text-md rounded-bl-md rounded-br-md w-full text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
              role="menuitem"
            >
              <LogOut className="inline mr-2" /> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
