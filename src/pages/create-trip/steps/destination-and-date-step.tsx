import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  handleChangeGuestInput: (value: boolean) => void;
  setDestination: (destination: string) => void;
  setEventStartAndDates: (dates: DateRange | undefined) => void;
  eventStartAndDates: DateRange | undefined;
  destination: string;
}

export function DestinationAndDateStep({
  handleChangeGuestInput,
  isGuestsInputOpen,
  setDestination,
  eventStartAndDates,
  destination,
  setEventStartAndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const handleContinue = () => {
    if (!destination) {
      return toast.warning("Por favor, preencha o destino");
    } else if (
      !eventStartAndDates ||
      !eventStartAndDates.from ||
      !eventStartAndDates.to
    ) {
      return toast.warning("Por favor, selecione as datas de inicio e fim");
    } else {
      handleChangeGuestInput(true);
    }
  };

  return (
    <div className=" bg-zinc-900 px-4 rounded-xl flex flex-col md:flex-row py-3 items-center shadow-shape gap-3">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Pra onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none md:flex-1 w-44"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <span
        onClick={() => handleDatePicker(true)}
        className="flex-1 text-center md:text-left flex items-center justify-center md:justify-start gap-2 cursor-pointer"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="flex-1 text-lg text-zinc-400">
          {displayedDate || "Quando?"}
        </span>
      </span>

      <div className="md:w-px w-full md:h-6 h-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button
          onClick={() => handleChangeGuestInput(false)}
          variant="secondary"
        >
          Alterar Local/Data
          <Settings2 className="size-5 text-zinc-200" />
        </Button>
      ) : (
        <Button onClick={handleContinue} variant="primary">
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
