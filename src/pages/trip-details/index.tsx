import { CalendarCheck, Plus, X } from "lucide-react";
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
import useAuthContext from "../../hooks/use-auth-context";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const {
    participants,
    isActivityModalOpen,
    handleActivityModalOpen,
    isLinkModalOpen,
    handleFetchTripData,
    isLoadingTripData,
    isUpdateActivityModalOpen,
    loadingConfirmParticipation,
    handleConfirmParticipation,
    handleShowConfirmParticipationModal,
    isConfirmParticipationModalOpen,
  } = useTripContext();
  const { userId } = useAuthContext();

  useEffect(() => {
    if (tripId) {
      handleFetchTripData(tripId);
    }
  }, [handleFetchTripData, tripId]);

  const showConfirmParticipation = () => {
    const guest = participants.find(
      (participant) => participant?.user?.id === userId
    );

    if (guest && !guest.is_owner) {
      return !guest.is_confirmed;
    }
    return false
  };

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
                <div className="flex items-center gap-2">
                  {showConfirmParticipation() && (
                    <Button
                      onClick={() => handleShowConfirmParticipationModal(true)}
                      variant="primary"
                    >
                      <CalendarCheck className="size-5" />
                      Confirmar participação
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => handleActivityModalOpen(true)}
                  >
                    <Plus className="size-5" />
                    Cadastrar Atividade
                  </Button>
                </div>
              </div>
              <div className="block lg:hidden">
                <div className="flex items-center gap-2">
                  {showConfirmParticipation() && (
                    <Button
                      onClick={() => handleShowConfirmParticipationModal(true)}
                      variant="primary"
                      size="icon"
                    >
                      <CalendarCheck className="size-5" />
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="icon"
                    onClick={() => handleActivityModalOpen(true)}
                  >
                    <Plus className="size-5" />
                  </Button>
                </div>
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

      {isConfirmParticipationModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar Participação
                </h2>
                <button
                  onClick={() => handleShowConfirmParticipationModal(false)}
                >
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Tem certeza de que deseja confirmar sua participação nesta
                viagem?
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Button
                onClick={() => handleShowConfirmParticipationModal(false)}
                type="button"
                variant="secondary"
                size="full"
              >
                Fechar
              </Button>
              <Button
                loading={loadingConfirmParticipation}
                onClick={() => handleConfirmParticipation(tripId)}
                type="button"
                variant="primary"
                size="full"
              >
                Confirmar participação
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
