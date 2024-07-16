import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { ManageGuestsModal } from "./manage-guests-modal";
import useTripContext from "../../hooks/use-trip-context";

interface ParticipantsProps {
  handleRemoveGuestInvite: (email: string) => void;
  handleAddGuestInvite: (id: string, email: string) => void;
}

export function Guest({
  handleRemoveGuestInvite,
  handleAddGuestInvite,
}: ParticipantsProps) {
  const { participants } = useTripContext();

  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  const handleChangeGuestsModal = (value: boolean) => {
    setIsManageGuestsModalOpen(value);
  };

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
          handleRemoveGuestInvite={handleRemoveGuestInvite}
          handleAddGuestInvite={handleAddGuestInvite}
        />
      )}
    </>
  );
}
