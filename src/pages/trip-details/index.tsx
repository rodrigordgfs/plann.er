import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface Activities {
  [date: string]: {
    id: string;
    title: string;
    occurs_at: string;
    trip_id: string;
  }[];
}

interface Links {
  title: string;
  url: string;
}

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const { tripId } = useParams();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activities>({});
  const [links, setLinks] = useState<Links[]>([]);
  const [participants, setParticipants] = useState<Participants[]>([]);

  const handleCreateActivityModalOpen = (value: boolean) => {
    setIsCreateActivityModalOpen(value);
  };

  const handleCreateLinkModalOpen = (value: boolean) => {
    setIsCreateLinkModalOpen(value);
  };

  const handleRemoveGuestInvite = (email: string) => {
    setParticipants(
      participants?.filter((participant) => participant.email !== email)
    );
  };

  const handleAddGuestInvite = (id: string, email: string) => {
    setParticipants([
      ...participants,
      { id, email, is_confirmed: false, name: null },
    ]);
  };

  useEffect(() => {
    const fetchTripData = async () => {
      await Promise.all([
        api.get(`/trips/${tripId}`),
        api.get(`/trips/${tripId}/activities`),
        api.get(`/trips/${tripId}/links`),
        api.get(`/trips/${tripId}/participants`),
      ]).then(
        ([
          { data: trip },
          { data: activities },
          { data: links },
          { data: participants },
        ]) => {
          setTrip(trip);
          setActivities(activities);
          setLinks(links);
          setParticipants(participants);
        }
      );
    };
    fetchTripData();
  }, [tripId]);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex flex-col md:flex-row gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex space-y-2 flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button
              variant="primary"
              onClick={() => handleCreateActivityModalOpen(true)}
            >
              <Plus className="size-5" />
              Cadastrar Atividade
            </Button>
          </div>

          <Activities activities={activities} />
        </div>

        <div className="w-full md:w-80 space-y-6">
          <ImportantLinks
            handleCreateLinkModalOpen={handleCreateLinkModalOpen}
            links={links}
          />
          <div className="w-full h-px bg-zinc-800" />
          <Guest
            participants={participants}
            handleRemoveGuestInvite={handleRemoveGuestInvite}
            handleAddGuestInvite={handleAddGuestInvite}
          />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          handleCreateActivityModalOpen={handleCreateActivityModalOpen}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          handleCreateLinkModalOpen={handleCreateLinkModalOpen}
        />
      )}
    </div>
  );
}
