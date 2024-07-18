import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import useTripContext from "../../hooks/use-trip-context";

export function UpdateDestinationAndTripDateModal() {
  const { tripId } = useParams();

  const {
    trip,
    handleUpdateDestinationAndTripDateModalOpen,
    updatingTrip,
    handleUpdateTrip,
  } = useTripContext();

  const today = new Date();

  const [newDestination, setNewDestination] = useState(trip?.destination);
  const [newEventStartAndDates, setNewEventStartAndDates] = useState<
    DateRange | undefined
  >({
    from: new Date(trip?.starts_at || today),
    to: new Date(trip?.ends_at || today),
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayedDate =
    newEventStartAndDates &&
    newEventStartAndDates.from &&
    newEventStartAndDates.to
      ? format(newEventStartAndDates.from, "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(
            format(newEventStartAndDates.to, "d' de 'LLLL", { locale: ptBR })
          )
      : null;

  const updateTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleUpdateTrip(
      tripId,
      newDestination,
      newEventStartAndDates?.from,
      newEventStartAndDates?.to
    );
  };

  const handleDatePicker = (value: boolean) => {
    return setIsDatePickerOpen(value);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Alterar local e data da viagem
              </h2>
              <button
                onClick={() =>
                  handleUpdateDestinationAndTripDateModalOpen(false)
                }
              >
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              As novas datas não devem conflitar com as atividades ja criadas.
            </p>
          </div>

          <form onSubmit={updateTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 shadow-shape rounded-lg flex items-center gap-2">
              <Tag className="size-5 text-zinc-400" />
              <input
                value={newDestination}
                type="text"
                placeholder="Pra onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none md:flex-1 w-44"
                onChange={(event) => setNewDestination(event.target.value)}
              />
            </div>
            <span
              onClick={() => handleDatePicker(true)}
              className=" h-14 px-4 bg-zinc-950 border border-zinc-800 shadow-shape rounded-lg flex items-center flex-1 text-center md:text-left justify-center md:justify-start gap-2 cursor-pointer"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="flex-1 text-lg text-zinc-400">
                {displayedDate || "Quando?"}
              </span>
            </span>
            <Button
              loading={updatingTrip}
              type="submit"
              variant="primary"
              size="full"
            >
              Salvar dados da viagem
            </Button>
          </form>
        </div>
      </div>

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
              selected={newEventStartAndDates}
              onSelect={setNewEventStartAndDates}
              disabled={{
                before: today,
              }}
              locale={ptBR}
            />
          </div>
        </div>
      )}
    </>
  );
}
