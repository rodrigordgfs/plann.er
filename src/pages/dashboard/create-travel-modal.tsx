import { ArrowRight, Calendar, MapPin, UserRoundPlus, X } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import useTripContext from "../../hooks/use-trip-context";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { InviteGuestsModal } from "./invite-guests-modal";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

type ErrorType = {
  [key: string]: string;
};

const registerSchema = z.object({
  destination: z.string().min(3, "Destino deve ter no mínimo 3 caracteres"),
  date: z.string({ message: "Data para a viagem é obrigatória" }),
});

export function CreateTripModal() {
  const navigate = useNavigate();
  const {
    handleCreateTripModalOpen,
    isGuestsModalOpen,
    handleGuestsModalOpen,
    handleCreateTrip,
    loadingConfirmTrip,
  } = useTripContext();

  const today = new Date();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartAndDates, setEventStartAndDates] = useState<
    DateRange | undefined
  >(undefined);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorType>({});

  const displayedDate =
    eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to
      ? format(eventStartAndDates.from, "d' de 'LLLL", { locale: ptBR })
          .concat(" até ")
          .concat(
            format(eventStartAndDates.to, "d' de 'LLLL", { locale: ptBR })
          )
      : null;

  const handleDatePicker = (value: boolean) => {
    return setIsDatePickerOpen(value);
  };

  const handleAddEmailToInvite = (email: string) => {
    setEmailsToInvite([...emailsToInvite, email]);
  };

  const handleRemoveEmailsFromIvites = (newEmailList: string[]) => {
    setEmailsToInvite(newEmailList);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const destination = data.get("destination")?.toString() ?? "";

    const result = registerSchema.safeParse({
      destination,
      date: eventStartAndDates?.to?.toString() || null,
    });

    if (!result.success) {
      const newErrors = result.error.errors.reduce(
        (acc: ErrorType, err: z.ZodIssue) => {
          const path = err.path[0];
          if (typeof path === "string") {
            acc[path] = err.message;
          }
          return acc;
        },
        {}
      );

      setErrors(newErrors);
      return;
    }

    setErrors({});
    const tripId = await handleCreateTrip(
      destination,
      eventStartAndDates?.from?.toString(),
      eventStartAndDates?.to?.toString(),
      emailsToInvite
    );

    if (tripId) {
      navigate(`/trips/${tripId}`);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cadastrar viagem</h2>
              <button onClick={() => handleCreateTripModalOpen(false)}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              Cadastre o destino e quando ocorrerá a viagem para convidar os
              participantes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-2">
              <div
                className={`h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape flex items-center gap-2 ${
                  errors.destination ? "ring-2 ring-offset ring-red-400" : ""
                }`}
              >
                <MapPin className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="destination"
                  placeholder="Qual o destino da viagem?"
                  className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                />
              </div>
              {errors.destination && (
                <p className="text-red-500 text-sm font-bold">
                  {errors.destination}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span
                onClick={() => handleDatePicker(true)}
                className={`h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape flex items-center justify-center md:justify-start gap-2 cursor-pointer ${
                  errors.date ? "ring-2 ring-offset ring-red-400" : ""
                }`}
              >
                <Calendar className="size-5 text-zinc-400" />
                <span className="flex-1 text-lg text-zinc-400">
                  {displayedDate || "Qual a data?"}
                </span>
              </span>
              {errors.date && (
                <p className="text-red-500 text-sm font-bold">{errors.date}</p>
              )}
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-shape px-4 flex md:flex-row flex-col py-3 items-center gap-3">
              <button
                type="button"
                onClick={() => handleGuestsModalOpen(true)}
                className="flex flex-1 items-center justify-start gap-2"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className="text-lg text-zinc-100 flex-1 text-left">
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className="text-lg text-zinc-400 flex-1 text-left">
                    Clique aqui para adicionar os participantes
                  </span>
                )}
              </button>
            </div>

            <Button
              loading={loadingConfirmTrip}
              type="submit"
              variant="primary"
              size="full"
            >
              Confirmar viagem
              <ArrowRight className="size-5" />
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
              selected={eventStartAndDates}
              onSelect={setEventStartAndDates}
              disabled={{
                before: today,
              }}
              locale={ptBR}
            />
          </div>
        </div>
      )}

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          handleAddEmailToInvite={handleAddEmailToInvite}
          handleRemoveEmailsFromIvites={handleRemoveEmailsFromIvites}
        />
      )}
    </>
  );
}
