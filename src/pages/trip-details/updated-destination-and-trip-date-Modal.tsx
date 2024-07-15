import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface UpdateDestinationAndTripDateModalProps {
  handleUpdateDestinationAndTripDateModalOpen: (value: boolean) => void;
  destination: string | undefined;
  starts_at: string | undefined;
  ends_at: string | undefined;
}

export function UpdateDestinationAndTripDateModal({
  handleUpdateDestinationAndTripDateModalOpen,
  destination,
  starts_at,
  ends_at,
}: UpdateDestinationAndTripDateModalProps) {
  const { tripId } = useParams();

  const today = new Date();

  const [updatingTrip, setUpdatingTrip] = useState(false);
  const [newDestination, setNewDestination] = useState(destination);
  const [newEventStartAndDates, setNewEventStartAndDates] = useState<
    DateRange | undefined
  >({
    from: new Date(starts_at || today),
    to: new Date(ends_at || today),
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
    setUpdatingTrip(true);

    api
      .put(`/trips/${tripId}`, {
        destination: newDestination,
        starts_at: newEventStartAndDates?.from,
        ends_at: newEventStartAndDates?.to,
      })
      .then(() => {
        window.document.location.reload();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setUpdatingTrip(false);
      });
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
              Salvar link
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
