import { Menu } from "lucide-react";
import { Button } from "./button";

export function HeaderMenu() {
  return (
    <div className="px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex flex-row items-center justify-between">
      <img src="/logo.svg" alt="Plann.er logo" className="h-8" />
      <Button variant="primary" size="icon">
        <Menu className="size-5" />
      </Button>
    </div>
  );
}
