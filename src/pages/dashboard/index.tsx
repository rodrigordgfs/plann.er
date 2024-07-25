import { CircleHelp, Frown, PlusIcon } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";
import { CreateTripModal } from "./create-travel-modal";
import { useEffect, useState } from "react";
import { TripCard } from "./trip-card";
import useAuthContext from "../../hooks/use-auth-context";
import { LegendModal } from "./legend-modal";
import { Skeleton } from "../../components/skeleton";

export function DashboardPage() {
  const {
    isCreateTripModalOpen,
    handleCreateTripModalOpen,
    handleGeUserTrips,
    trips,
    loadingTrips,
  } = useTripContext();
  const { userId } = useAuthContext();
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const handleLegendOpen = (value: boolean) => {
    setIsLegendOpen(value);
  };

  useEffect(() => {
    handleGeUserTrips(userId);
  }, [userId, handleGeUserTrips]);

  return (
    <>
      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex space-y-2 flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold">Suas viagens</h2>
            <div className="flex flex-row items-center gap-2">
              <div className="hidden sm:block">
                <Button
                  onClick={() => handleCreateTripModalOpen(true)}
                  variant="primary"
                >
                  <PlusIcon className="size-5" />
                  Cadastrar viagem
                </Button>
              </div>
              <div className="block sm:hidden">
                <Button
                  onClick={() => handleCreateTripModalOpen(true)}
                  variant="primary"
                  size="icon"
                >
                  <PlusIcon className="size-5" />
                </Button>
              </div>
              <Button
                onClick={() => handleLegendOpen(true)}
                variant="primary"
                size="icon"
              >
                <CircleHelp className="size-5" />
              </Button>
            </div>
          </div>

          {loadingTrips ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  type="button"
                  height="190px"
                  width="100%"
                />
              ))}
            </div>
          ) : trips?.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
              <Frown className="size-7" />
              <p className="text-lg text-gray-300">
                Você ainda não tem viagens cadastradas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trips?.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </main>

      {isCreateTripModalOpen && <CreateTripModal />}

      {isLegendOpen && <LegendModal handleLegendOpen={handleLegendOpen} />}
    </>
  );
}
