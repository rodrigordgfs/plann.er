// src/pages/dashboard/TripCard.tsx

import { isAfter, isBefore, isEqual, parseISO } from "date-fns";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { Calendar, Link2, MapPin, NotebookTabsIcon, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../context/trip-context";

type TripCardProps = {
  trip: Trip;
};

export function TripCard({ trip }: TripCardProps) {
  const navigate = useNavigate();

  const displayedDate =
    trip?.starts_at && trip?.ends_at
      ? format(parseISO(trip.starts_at), "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(
            format(parseISO(trip.ends_at), "d' de 'LLLL", { locale: ptBR })
          )
      : null;

  const tripStatus = () => {
    const startsAt = parseISO(format(parseISO(trip?.starts_at), "yyyy-MM-dd"));
    const endsAt = parseISO(format(parseISO(trip?.ends_at), "yyyy-MM-dd"));
    const currentDate = parseISO(format(new Date(), "yyyy-MM-dd"));

    if (isBefore(currentDate, startsAt)) {
      return "border-l-blue-500";
    } else if (isAfter(currentDate, endsAt)) {
      return "border-l-red-500";
    } else if (
      (isEqual(currentDate, startsAt) || isAfter(currentDate, startsAt)) &&
      (isEqual(currentDate, endsAt) || isBefore(currentDate, endsAt))
    ) {
      return "border-l-green-500";
    } else {
      return "border-l-zinc-900";
    }
  };

  const handleCardClick = () => {
    navigate(`/trips/${trip?.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`shadow-shape bg-zinc-900 hover:bg-zinc-800 transition-all border border-l-4 border-zinc-900 ${tripStatus()} rounded-lg p-4 shadow-shape flex flex-col gap-2 cursor-pointer`}
    >
      <div className="flex flex-row items-center gap-2">
        <MapPin className="size-5" />
        <h3 className="text-lg font-semibold">{trip?.destination}</h3>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Calendar className="size-5" />
        {displayedDate}
      </div>
      <div className="flex flex-row items-center gap-2">
        <NotebookTabsIcon className="size-5" />
        <span>{trip?._count.activities} atividades</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <User2 className="size-5" />
        <span>{trip?._count.participants} participantes</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link2 className="size-5" />
        <span>{trip?._count.links} links</span>
      </div>
    </div>
  );
}
