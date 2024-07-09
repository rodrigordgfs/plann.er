import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    "jessica.white44@yahoo.com",
  ]);

  const handleChangeGuestInput = (value: boolean) => {
    setIsGuestsInputOpen(value);
  };

  const handleChangeGuestsModal = (value: boolean) => {
    setIsGuestsModalOpen(value);
  };

  const handleAddEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  };

  const handleRemoveEmailsFromIvites = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (invited) => invited !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src="/logo.svg" alt="Plann.er logo" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Pra onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button
                onClick={() => handleChangeGuestInput(false)}
                className="bg-zinc-800 hover:bg-zinc-700 transition-all text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2"
              >
                Alterar Local/Data
                <Settings2 className="size-5 text-zinc-200" />
              </button>
            ) : (
              <button
                onClick={() => handleChangeGuestInput(true)}
                className="bg-lime-300 hover:bg-lime-400 transition-all text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                type="button"
                onClick={() => handleChangeGuestsModal(true)}
                className="flex flex-1 items-center justify-start gap-2"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 flex-1 text-left">
                  Quem estará na viagem?
                </span>
              </button>

              <div className="w-px h-6 bg-zinc-800"></div>

              <button className="bg-lime-300 hover:bg-lime-400 transition-all text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-small text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button onClick={() => handleChangeGuestsModal(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => {
                return (
                  <div
                    key={email}
                    className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmailsFromIvites(email)}
                    >
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={(event) => handleAddEmailToInvite(event)}
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
      )}
    </div>
  );
}
