import { LogOut, Settings, User } from "lucide-react";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/use-auth-context";

export function LinearMenu() {
  const { handleLogOut } = useAuthContext();

  const handleProfile = () => {
    toast.info("Em breve");
  };

  const handleSettings = () => {
    toast.info("Em breve");
  };

  const handleLogOutAndClose = () => {
    handleLogOut();
  };

  return (
    <div
      className="text-zinc-200 flex items-center"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <button
        onClick={handleProfile}
        className="flex items-center gap-2 px-4 py-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <User />
        <p>Profile</p>
      </button>
      <button
        onClick={handleSettings}
        className="flex items-center gap-2 px-4 py-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <Settings />
        <p>Settings</p>
      </button>
      <button
        onClick={handleLogOutAndClose}
        className="flex items-center gap-2 px-4 py-2 text-md rounded-lg text-left hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700 transition-all"
        role="menuitem"
      >
        <LogOut />
        <p>Log Out</p>
      </button>
    </div>
  );
}
