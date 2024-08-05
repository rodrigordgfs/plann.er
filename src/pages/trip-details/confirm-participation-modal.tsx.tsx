import { X } from "lucide-react";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";
import useAuthContext from "../../hooks/use-auth-context";

export function ConfirmParticipationModal() {
  const {
    loadingConfirmParticipation,
    handleConfirmParticipation,
    handleShowConfirmParticipationModal,
  } = useTripContext();

  const { userId } = useAuthContext()

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar Participação</h2>
            <button onClick={() => handleShowConfirmParticipationModal(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Tem certeza de que deseja confirmar sua participação nesta viagem?
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Button
            onClick={() => handleShowConfirmParticipationModal(false)}
            type="button"
            variant="secondary"
            size="full"
          >
            Fechar
          </Button>
          <Button
            loading={loadingConfirmParticipation}
            onClick={() => handleConfirmParticipation(userId)}
            type="button"
            variant="primary"
            size="full"
          >
            Confirmar participação
          </Button>
        </div>
      </div>
    </div>
  );
}
