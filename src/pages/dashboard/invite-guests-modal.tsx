import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import useTripContext from "../../hooks/use-trip-context";
import { toast } from "react-toastify";

interface InviteGuestsModalProps {
  handleRemoveEmailsFromIvites: (newEmailList: string[]) => void;
  handleAddEmailToInvite: (email: string) => void;
  emailsToInvite: string[];
}

export function InviteGuestsModal({
  emailsToInvite,
  handleAddEmailToInvite,
  handleRemoveEmailsFromIvites,
}: InviteGuestsModalProps) {
  const { handleGuestsModalOpen } = useTripContext();

  const handleSubmitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      toast.warning("Por favor, preencha um email para adicionar");
      return;
    }

    if (emailsToInvite.includes(email)) {
      toast.warning("Email já inserido");
      return;
    }

    handleAddEmailToInvite(email);

    event.currentTarget.reset();
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (invited) => invited !== emailToRemove
    );
    handleRemoveEmailsFromIvites(newEmailList);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={() => handleGuestsModalOpen(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => {
              return (
                <div
                  key={email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-zinc-500 text-sm">
              Por favor, digite o email abaixo para convidar um participante
            </p>
          )}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={(event) => handleSubmitEmail(event)}
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
