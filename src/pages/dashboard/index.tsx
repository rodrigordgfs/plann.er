import { Backpack, CircleHelp } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";
import { CreateTripModal } from "./create-travel-modal";
import { useEffect, useState } from "react";
import { TripCard } from "./trip-card";
import { api } from "../../lib/axios";
import useAuthContext from "../../hooks/use-auth-context";
import { LegendModal } from "./legend-modal";
import { Skeleton } from "../../components/skeleton";

type Trip = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  _count: {
    participants: number;
    activities: number;
    links: number;
  };
};

export function DashboardPage() {
  const { isCreateTripModalOpen, handleCreateTripModalOpen } = useTripContext();
  const { userId } = useAuthContext();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const handleLegendOpen = (value: boolean) => {
    setIsLegendOpen(value);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips", {
          params: { user_id: userId },
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [userId]);

  return (
    <>
      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex space-y-2 flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold">Suas viagens</h2>
            <div className="flex flex-row items-center gap-2">
              <Button
                onClick={() => handleCreateTripModalOpen(true)}
                variant="primary"
              >
                <Backpack className="size-5" />
                Cadastrar viagem
              </Button>
              <Button
                onClick={() => handleLegendOpen(true)}
                variant="primary"
                size="icon"
              >
                <CircleHelp className="size-5" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} type="button" height="190px" width="100%" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {trips.map((trip) => (
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
