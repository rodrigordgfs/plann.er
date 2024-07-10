import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  handleChangeGuestsModal: (value: boolean) => void;
  handleConfirmTripModal: (value: boolean) => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  emailsToInvite,
  handleChangeGuestsModal,
  handleConfirmTripModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={() => handleChangeGuestsModal(true)}
        className="flex flex-1 items-center justify-start gap-2"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-100 flex-1 text-left">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg text-zinc-400 flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"></div>

      <Button onClick={() => handleConfirmTripModal(true)} variant="primary">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
