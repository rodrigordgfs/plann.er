import { CheckCircle2, CircleDashed, User, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { ManageGuestsModal } from "./manage-guests-modal";
import useTripContext from "../../hooks/use-trip-context";

export function Guest() {
  const {
    participants,
    isManageGuestsModalOpen,
    handleChangeGuestsModal,
    isParticipantUnconfirmed,
  } = useTripContext();

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants?.map((participant, index) => {
            return (
              <div
                key={participant.id}
                className="flex items-center justify-between gap-4"
              >
                {participant.user.image_url ? (
                  <img
                    src={participant.user.image_url}
                    alt="Avatar"
                    className="w-11 h-11 rounded-full"
                  />
                ) : (
                  <div className="w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="size-6 text-gray-500" />
                  </div>
                )}
                <div className="flex items-center justify-between flex-1">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {participant?.user?.name ?? `Convidado ${index}`}
                    </span>
                    <span className="block text-sm text-zinc-400 truncate">
                      {participant?.user?.email}
                    </span>
                  </div>
                  {participant?.is_confirmed ? (
                    <CheckCircle2 className="size-5 text-green-400 shrink-0" />
                  ) : (
                    <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!isParticipantUnconfirmed() && (
          <Button
            onClick={() => handleChangeGuestsModal(true)}
            variant="secondary"
            size="full"
          >
            <UserCog className="size-5 text-zinc-200" />
            Gerenciar convidados
          </Button>
        )}
      </div>
      {isManageGuestsModalOpen && <ManageGuestsModal />}
    </>
  );
}
