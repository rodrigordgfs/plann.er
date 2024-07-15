import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TimePicker } from "../../components/timePicker";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface CreateActivityModalProps {
  handleCreateActivityModalOpen: (value: boolean) => void;
  startDateTrip: string | undefined;
  endDateTrip: string | undefined;
}

export function CreateActivityModal({
  handleCreateActivityModalOpen,
  startDateTrip,
  endDateTrip,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const [savingActivity, setSavingActivity] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDatePicker = (value: boolean) => {
    setIsDatePickerOpen(value);
  };

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time);
  };

  const createActivity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at =
      selectedDate && selectedTime
        ? `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}:00`
        : null;

    if (!title) {
      return toast.warning("Adicione um titulo para a atividade");
    } else if (!occurs_at) {
      return toast.warning("Adicione uma data e hora para a atividade");
    }

    setSavingActivity(true);

    api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(() => {
        window.document.location.reload();
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingActivity(false);
      });
  };

  const displayedDate = selectedDate
    ? format(selectedDate, "d' de 'LLLL", { locale: ptBR })
    : null;

  const startDate = startDateTrip ? new Date(startDateTrip) : undefined;
  const endDate = endDateTrip ? new Date(endDateTrip) : undefined;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Nova atividade</h2>
              <button onClick={() => handleCreateActivityModalOpen(false)}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Todos convidados podem visualizar as atividades.
            </p>
          </div>

          <form onSubmit={createActivity} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2">
              <Tag className="size-5 text-zinc-400" />
              <input
                type="text"
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span
                onClick={() => handleDatePicker(true)}
                className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center flex-1 text-center md:text-left justify-center md:justify-start gap-2 cursor-pointer"
              >
                <Calendar className="size-5 text-zinc-400" />
                <span className="flex-1 text-lg text-zinc-400">
                  {displayedDate || "Selecione um dia"}
                </span>
              </span>
              <TimePicker handleSelectedTime={handleSelectedTime} />
            </div>
            <div className="flex items-center gap-2"></div>
            <Button
              loading={savingActivity}
              type="submit"
              variant="primary"
              size="full"
            >
              Salvar atividade
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
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                if (startDate && endDate) {
                  return date < startDate || date > endDate;
                } else if (startDate) {
                  return date < startDate;
                } else if (endDate) {
                  return date > endDate;
                }
                return false;
              }}
              locale={ptBR}
            />
          </div>
        </div>
      )}
    </>
  );
}
