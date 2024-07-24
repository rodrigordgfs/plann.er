import { Plus } from "lucide-react";
import { useEffect } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guests";
import { Activities } from "./activities";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import useTripContext from "../../hooks/use-trip-context";
import { UpdateActivityModal } from "./update-activity-modal";
import { TripDetails } from "./trip-details";
import { Skeleton } from "../../components/skeleton";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const {
    isActivityModalOpen,
    handleActivityModalOpen,
    isLinkModalOpen,
    handleFetchTripData,
    isLoadingTripData,
    isUpdateActivityModalOpen,
  } = useTripContext();

  useEffect(() => {
    if (tripId) {
      handleFetchTripData(tripId);
    }
  }, [handleFetchTripData, tripId]);

  return (
    <>
      {isLoadingTripData ? (
        <main className="flex flex-col md:flex-row gap-16 px-4">
          <div className="flex-1 space-y-6">
            <Skeleton type="button" width="100%" height="400px" />
          </div>
          <div className="w-full md:w-80 space-y-6">
            <Skeleton type="button" width="100%" height="600px" />
          </div>
        </main>
      ) : (
        <main className="flex flex-col md:flex-row gap-16 px-4">
          <div className="flex-1 space-y-6">
            <div className="flex space-y-2 flex-row items-center justify-between">
              <h2 className="text-3xl font-semibold">Atividades</h2>
              <div className="hidden lg:block">
                <Button
                  variant="primary"
                  onClick={() => handleActivityModalOpen(true)}
                >
                  <Plus className="size-5" />
                  Cadastrar Atividade
                </Button>
              </div>
              <div className="block lg:hidden">
                <Button
                  variant="primary"
                  size="icon"
                  onClick={() => handleActivityModalOpen(true)}
                >
                  <Plus className="size-5" />
                </Button>
              </div>
            </div>

            <Activities />
          </div>

          <div className="w-full md:w-80 space-y-6">
            <TripDetails />
            <div className="w-full h-px bg-zinc-800" />
            <ImportantLinks />
            <div className="w-full h-px bg-zinc-800" />
            <Guest />
          </div>
        </main>
      )}

      {isActivityModalOpen && <CreateActivityModal />}

      {isUpdateActivityModalOpen && <UpdateActivityModal />}

      {isLinkModalOpen && <CreateLinkModal />}
    </>
  );
}
