import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndDates, setEventStartAndDates] = useState<
    DateRange | undefined
  >(undefined);
  const [emailsToInvite, setEmailsToInvite] = useState([
    "jessica.white44@yahoo.com",
  ]);

  const handleChangeGuestInput = (value: boolean) => {
    setIsGuestsInputOpen(value);
  };

  const handleChangeGuestsModal = (value: boolean) => {
    setIsGuestsModalOpen(value);
  };

  const handleConfirmTripModal = (value: boolean) => {
    setIsConfirmTripModalOpen(value);
  };

  const handleAddEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      toast.warning("Por favor, preencha um email para adicionar");
      return;
    }

    if (emailsToInvite.includes(email)) {
      toast.warning("Email já inserido");
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

  const handleCreateTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !destination ||
      !eventStartAndDates?.from ||
      !eventStartAndDates?.to ||
      emailsToInvite.length === 0 ||
      !ownerEmail ||
      !ownerName
    ) {
      toast.warning(
        "Preencha todos os dados para confirmar a criação da viagem"
      );
      return;
    }

    api
      .post("/trips", {
        destination: destination,
        starts_at: eventStartAndDates?.from,
        ends_at: eventStartAndDates?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      })
      .then(({ data }) => {
        const { tripId } = data;
        navigate(`/trips/${tripId}`);
      })
      .catch((e) => {
        toast.error(e.message);
      });
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
          <DestinationAndDateStep
            handleChangeGuestInput={handleChangeGuestInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            setEventStartAndDates={setEventStartAndDates}
            eventStartAndDates={eventStartAndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              handleChangeGuestsModal={handleChangeGuestsModal}
              handleConfirmTripModal={handleConfirmTripModal}
            />
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
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          handleAddEmailToInvite={handleAddEmailToInvite}
          handleChangeGuestsModal={handleChangeGuestsModal}
          handleRemoveEmailsFromIvites={handleRemoveEmailsFromIvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          handleConfirmTripModal={handleConfirmTripModal}
          handleCreateTrip={handleCreateTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
