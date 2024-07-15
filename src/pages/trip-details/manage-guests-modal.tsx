import { AtSign, LoaderCircleIcon, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface InviteGuestsModalProps {
  handleChangeGuestsModal: (value: boolean) => void;
  handleRemoveGuestInvite: (email: string) => void;
  handleAddGuestInvite: (id: string, email: string) => void;
  participants: Participants[];
}

export function ManageGuestsModal({
  participants,
  handleChangeGuestsModal,
  handleRemoveGuestInvite,
  handleAddGuestInvite,
}: InviteGuestsModalProps) {
  const { tripId } = useParams();

  const [savingGuest, setSavingGuest] = useState(false);
  const [removingGuestId, setRemovingGuestId] = useState<string | null>(null);

  const handleInviteGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString() || "";

    if (!email) {
      return toast.warning("Adicione um e-mail para o convidado");
    }

    setSavingGuest(true);

    api
      .post(`/trips/${tripId}/invites`, {
        email,
      })
      .then(({ data }) => {
        handleAddGuestInvite(data.participantId, email);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingGuest(false);
      });
  };

  const handleRemoveGuest = (participantId: string, email: string) => {
    setRemovingGuestId(participantId);
    api
      .delete(`/trips/${tripId}/participants/${participantId}`)
      .then(() => {
        handleRemoveGuestInvite(email);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setRemovingGuestId(null);
      });
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
          {participants &&
            participants.map((participant) => {
              return (
                <div
                  key={participant.email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{participant.email}</span>
                  <button
                    disabled={removingGuestId === participant.id}
                    type="button"
                    onClick={() =>
                      handleRemoveGuest(participant.id, participant.email)
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
          className="p-2.5 bg-zinc-950 border shadow-shape border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
            />
          </div>
          <Button
            loading={savingGuest}
            type="submit"
            variant="primary"
            size="default"
          >
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
