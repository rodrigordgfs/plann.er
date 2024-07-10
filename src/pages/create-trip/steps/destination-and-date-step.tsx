import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  handleChangeGuestInput: (value: boolean) => void;
}

export function DestinationAndDateStep({
  handleChangeGuestInput,
  isGuestsInputOpen,
}: DestinationAndDateStepProps) {
  return (
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
  );
}
