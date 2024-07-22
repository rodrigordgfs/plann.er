import { Backpack, Menu } from "lucide-react";
import { Button } from "../../components/button";

export function DashboardPage() {
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex flex-row items-center justify-between">
        <img src="/logo.svg" alt="Plann.er logo" className="h-8" />
        <Button variant="primary" size="icon">
          <Menu className="size-5" />
        </Button>
      </div>

      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex space-y-2 flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold">Suas viagens</h2>
            <Button variant="primary">
              <Backpack className="size-5" />
              Cadastrar viagem
            </Button>
          </div>

          {/* <Activities /> */}
        </div>

        {/* <div className="w-full md:w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guest />
        </div> */}
      </main>
    </div>
  );
}
