import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export function Guest() {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<
    Participants[] | undefined
  >();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then(({ data }) => setParticipants(data.trip));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants?.map((participant, index) => {
          return (
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-green-400 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          );
        })}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Rodrigo Viegas Rodrigues
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              rodrigordgfs@gmail.com
            </span>
          </div>
          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>
      <Button variant="secondary" size="full">
        <UserCog className="size-5 text-zinc-200" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
