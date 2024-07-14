import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface InviteGuestsModalProps {
  handleChangeGuestsModal: (value: boolean) => void;
  handleRemoveEmailsFromIvites: (email: string) => void;
  handleAddEmailsFromIvites: (id: string, email: string) => void;
  participants: Participants[];
}

export function ManageGuestsModal({
  participants,
  handleChangeGuestsModal,
  handleRemoveEmailsFromIvites,
  handleAddEmailsFromIvites,
}: InviteGuestsModalProps) {
  const { tripId } = useParams();

  const handleInviteGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString() || "";

    api
      .post(`/trips/${tripId}/invites`, {
        email,
      })
      .then(({ data }) => {
        handleAddEmailsFromIvites(data.participantId, email);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleRemoveGuest = (participantId: string, email: string) => {
    api
      .delete(`/trips/${tripId}/participants/${participantId}`)
      .then(() => {
        handleRemoveEmailsFromIvites(email);
      })
      .catch((e) => {
        toast.error(e.message);
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
                    type="button"
                    onClick={() =>
                      handleRemoveGuest(participant.id, participant.email)
                    }
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              );
            })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={(event) => handleInviteGuest(event)}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
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
          <button
            type="submit"
            className="bg-lime-300 hover:bg-lime-400 transition-all text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2"
          >
            Convidar
            <Plus className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
