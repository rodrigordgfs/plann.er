import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  handleConfirmTripModal: (value: boolean) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  handleCreateTrip: (event: FormEvent<HTMLFormElement>) => void;
  loadingConfirmTrip: boolean;
}

export function ConfirmTripModal({
  handleConfirmTripModal,
  handleCreateTrip,
  setOwnerEmail,
  setOwnerName,
  loadingConfirmTrip,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={() => handleConfirmTripModal(false)}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-100 font-semibold">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="text-zinc-100 font-semibold">
              16 a 27 de Agosto de 2024
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={handleCreateTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button
            loading={loadingConfirmTrip}
            type="submit"
            variant="primary"
            size="full"
          >
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
