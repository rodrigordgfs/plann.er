import { Backpack } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";
import { CreateTripModal } from "./create-travel-modal";

export function DashboardPage() {
  const { isCreateTripModalOpen, handleCreateTripModalOpen } = useTripContext();
  return (
    <>
      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex space-y-2 flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold">Suas viagens</h2>
            <Button
              onClick={() => handleCreateTripModalOpen(true)}
              variant="primary"
            >
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

      {isCreateTripModalOpen && <CreateTripModal />}
    </>
  );
}
