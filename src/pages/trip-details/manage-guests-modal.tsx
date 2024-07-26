import { AtSign, LoaderCircleIcon, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button";
import useTripContext from "../../hooks/use-trip-context";

export function ManageGuestsModal() {
  const { tripId } = useParams();

  const {
    savingGuest,
    handleAddGuestInvite,
    handleChangeGuestsModal,
    participants,
    handleRemoveGuestInvite,
    removingGuestId,
  } = useTripContext();

  const handleInviteGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString() || "";

    if (!email) {
      return toast.warning("Adicione um e-mail para o convidado");
    }

    handleAddGuestInvite(tripId, email);
  };

  const handleRemoveGuest = (participantId: string, email: string) => {
    handleRemoveGuestInvite(email, participantId, tripId);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar convidados</h2>
            <button onClick={() => handleChangeGuestsModal(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Abaixo são os convidados que você adicionou para esta viagem. Caso
            queira adcionar mais convidados basta inserir o e-mail e clicar em
            convidar.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {participants?.map((participant) => {
            return (
              <div
                key={participant?.user?.email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">
                  {participant?.user?.email}
                </span>
                <button
                  disabled={removingGuestId === participant?.id}
                  type="button"
                  onClick={() =>
                    handleRemoveGuest(participant?.id, participant?.user?.email)
                  }
                >
                  {removingGuestId === participant.id ? (
                    <LoaderCircleIcon className="size-4 animate-spin text-zinc-400" />
                  ) : (
                    <X className="size-4 text-zinc-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={(event) => handleInviteGuest(event)}
          className="p-2.5 bg-zinc-950 border shadow-shape border-zinc-800 rounded-lg flex flex-col md:flex-row items-center gap-2"
        >
          <div className="px-2 py-2 md:py-0 flex items-center w-full gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <div className="flex w-full md:hidden">
            <Button
              loading={savingGuest}
              type="submit"
              variant="primary"
              size="full"
            >
              Convidar
              <Plus className="size-5" />
            </Button>
          </div>
          <div className="hidden md:flex">
            <Button
              loading={savingGuest}
              type="submit"
              variant="primary"
              size="default"
            >
              Convidar
              <Plus className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
