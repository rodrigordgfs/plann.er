import { LoaderCircleIcon, Plus } from "lucide-react";
import { useEffect } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import useTripContext from "../../hooks/use-trip-context";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const {
    isActivityModalOpen,
    handleActivityModalOpen,
    isLinkModalOpen,
    handleFetchTripData,
    isLoadingTripData,
  } = useTripContext();

  useEffect(() => {
    if (tripId) {
      handleFetchTripData(tripId);
    }
  }, [handleFetchTripData, tripId]);

  return (
    <>
      {isLoadingTripData ? (
        <div className="w-full h-screen bg-zinc-900 flex flex-col items-center justify-center gap-2">
          <LoaderCircleIcon className="size-10 animate-spin" />
          <p className="text-lg font-semibold">
            Carregando dados da viagem! Por favor, aguarde!
          </p>
        </div>
      ) : (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
          <DestinationAndDateHeader />

          <main className="flex flex-col md:flex-row gap-16 px-4">
            <div className="flex-1 space-y-6">
              <div className="flex space-y-2 flex-col sm:flex-row items-center justify-between">
                <h2 className="text-3xl font-semibold">Atividades</h2>
                <Button
                  variant="primary"
                  onClick={() => handleActivityModalOpen(true)}
                >
                  <Plus className="size-5" />
                  Cadastrar Atividade
                </Button>
              </div>

              <Activities />
            </div>

            <div className="w-full md:w-80 space-y-6">
              <ImportantLinks />
              <div className="w-full h-px bg-zinc-800" />
              <Guest />
            </div>
          </main>

          {isActivityModalOpen && <CreateActivityModal />}

          {isLinkModalOpen && <CreateLinkModal />}
        </div>
      )}
    </>
  );
}
