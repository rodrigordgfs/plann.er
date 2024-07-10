import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

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
        <Button
          onClick={() => handleChangeGuestInput(false)}
          variant="secondary"
        >
          Alterar Local/Data
          <Settings2 className="size-5 text-zinc-200" />
        </Button>
      ) : (
        <Button onClick={() => handleChangeGuestInput(true)} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
