import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] =
    useState(false);

  const handleCreateActivityModalOpen = (value: boolean) => {
    setIsCreateActivityModalOpen(value);
  };

  const handleCreateLinkModalOpen = (value: boolean) => {
    setIsCreateLinkModalOpen(value);
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button
              variant="primary"
              onClick={() => handleCreateActivityModalOpen(true)}
            >
              <Plus className="size-5" />
              Cadastrar Atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-full md:w-80 space-y-6">
          <ImportantLinks handleCreateLinkModalOpen={handleCreateLinkModalOpen} />
          <div className="w-full h-px bg-zinc-800" />
          <Guest />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          handleCreateActivityModalOpen={handleCreateActivityModalOpen}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          handleCreateLinkModalOpen={handleCreateLinkModalOpen}
        />
      )}
    </div>
  );
}
