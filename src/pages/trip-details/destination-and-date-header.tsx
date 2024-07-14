import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then(({ data }) => setTrip(data.trip))
      .catch((e) => {
        toast.error(e.message);
      });
  }, [tripId]);

  const displayedDate = trip
    ? format(trip?.starts_at, "d' de 'LLLL", { locale: ptBR })
        .concat(" até ")
        .concat(format(trip?.ends_at, "d' de 'LLLL", { locale: ptBR }))
    : null;

  return (
    <div className="px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex flex-col md:flex-row items-center justify-between space-y-2">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100 truncate">{trip?.destination}</span>
      </div>

      <div className="w-full md:w-auto flex flex-col md:flex-row items-center space-x-5 space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100 truncate">{displayedDate}</span>
        </div>

        <div className="md:w-px w-full md:h-6 h-px bg-zinc-800" />

        <Button variant="secondary">
          Alterar Local/Data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
