import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { ManageGuestsModal } from "./manage-guests-modal";
interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guest() {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participants[]>([]);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  const handleChangeGuestsModal = (value: boolean) => {
    setIsManageGuestsModalOpen(value);
  };

  const handleRemoveEmailsFromIvites = (email: string) => {
    setParticipants(
      participants?.filter((participant) => participant.email !== email)
    );
  };

  const handleAddEmailsFromIvites = (id: string, email: string) => {
    setParticipants([
      ...participants,
      { id, email, is_confirmed: false, name: null },
    ]);
  };

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then(({ data }) => setParticipants(data));
  }, [tripId]);

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants?.map((participant, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
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
        </div>
        <Button
          onClick={() => handleChangeGuestsModal(true)}
          variant="secondary"
          size="full"
        >
          <UserCog className="size-5 text-zinc-200" />
          Gerenciar convidados
        </Button>
      </div>
      {isManageGuestsModalOpen && (
        <ManageGuestsModal
          participants={participants}
          handleChangeGuestsModal={handleChangeGuestsModal}
          // handleAddEmailToInvite={handleAddEmailToInvite}
          handleRemoveEmailsFromIvites={handleRemoveEmailsFromIvites}
          handleAddEmailsFromIvites={handleAddEmailsFromIvites}
        />
      )}
    </>
  );
}
