import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UpdateDestinationAndTripDateModal } from "./updated-destination-and-trip-date-Modal";

export function TripDetails() {
  const {
    trip,
    handleUpdateDestinationAndTripDateModalOpen,
    isUpdateDestinationTripDateModalOpen,
  } = useTripContext();

  const displayedDate =
    trip?.starts_at && trip?.ends_at
      ? format(trip?.starts_at, "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(format(trip?.ends_at, "d' de 'LLLL", { locale: ptBR }))
      : null;

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Detalhes da viagem</h2>
        <div className="space-y-5 flex items-center">
          <div className="space-y-2">
            <div className="flex flex-row gap-4 items-center">
              <MapPin className="size-5 text-zinc-400 shrink-0" />
              <span className="block font-medium text-zinc-100">
                {trip?.destination}
              </span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Calendar className="size-5 text-zinc-400 shrink-0" />
              <span className="block text-zinc-400 truncate hover:text-zinc-200 transition-all">
                {displayedDate}
              </span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => handleUpdateDestinationAndTripDateModalOpen(true)}
          variant="secondary"
          size="full"
        >
          <Settings2 className="size-5" />
          Alterar Local/Data
        </Button>
      </div>

      {isUpdateDestinationTripDateModalOpen && (
        <UpdateDestinationAndTripDateModal />
      )}
    </>
  );
}
