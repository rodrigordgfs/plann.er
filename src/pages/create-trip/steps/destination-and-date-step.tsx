import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  handleChangeGuestInput: (value: boolean) => void;
}

export function DestinationAndDateStep({
  handleChangeGuestInput,
  isGuestsInputOpen,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartAndDates, setEventStartAndDates] = useState<
    DateRange | undefined
  >(undefined);

  const handleDatePicker = (value: boolean) => {
    return setIsDatePickerOpen(value);
  };

  const displayedDate =
    eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to
      ? format(eventStartAndDates.from, "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(
            format(eventStartAndDates.to, "d' de 'LLLL", { locale: ptBR })
          )
      : null;

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
      <button
        onClick={() => handleDatePicker(true)}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 outline-none text-left w-[260px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

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

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={() => handleDatePicker(false)}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndDates}
              onSelect={setEventStartAndDates}
            />
          </div>
        </div>
      )}
    </div>
  );
}
