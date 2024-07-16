import { createContext, FC, ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import axios from "axios";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface Activity {
  [date: string]: {
    id: string;
    title: string;
    occurs_at: string;
    trip_id: string;
    is_done: boolean;
  }[];
}

interface Link {
  title: string;
  url: string;
}

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export interface TripContextType {
  trip: Trip | null;
  activities: Activity;
  links: Link[];
  participants: Participant[];
  handleAddGuestInvite: (id: string, email: string) => void;
  handleRemoveGuestInvite: (email: string) => void;
  isActivityModalOpen: boolean;
  handleActivityModalOpen: (value: boolean) => void;
  handleAddNewActivity: (
    date: string,
    activity: {
      id: string;
      title: string;
      occurs_at: string;
      trip_id: string;
      is_done: boolean;
    }
  ) => void;
  isLinkModalOpen: boolean;
  handleLinkModalOpen: (value: boolean) => void;
  handleAddNewLink: (newLink: Link) => void;
  handleFetchTripData: (tripId: string | undefined) => Promise<void>;
  isLoadingTripData: boolean;
}

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);

export const TripContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isLoadingTripData, setIsLoadingTripData] = useState(false);

  const handleActivityModalOpen = (value: boolean) => {
    setIsActivityModalOpen(value);
  };

  const handleLinkModalOpen = (value: boolean) => {
    setIsLinkModalOpen(value);
  };

  const handleAddNewLink = (newLink: Link) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleAddNewActivity = (
    date: string,
    newActivity: {
      id: string;
      title: string;
      occurs_at: string;
      trip_id: string;
      is_done: boolean;
    }
  ) => {
    setActivities((prevActivities) => {
      const activitiesForDate = prevActivities[date] || [];
      return {
        ...prevActivities,
        [date]: [...activitiesForDate, newActivity],
      };
    });
  };

  const handleAddGuestInvite = (id: string, email: string) => {
    setParticipants([
      ...participants,
      { id, email, is_confirmed: false, name: null },
    ]);
  };

  const handleRemoveGuestInvite = (email: string) => {
    setParticipants(
      participants?.filter((participant) => participant.email !== email)
    );
  };

  const handleFetchTripData = useCallback(
    async (tripId: string | undefined) => {
      if (!tripId) return;

      setIsLoadingTripData(true);
      try {
        const [tripRes, activitiesRes, linksRes, participantsRes] =
          await Promise.all([
            api.get(`/trips/${tripId}`),
            api.get(`/trips/${tripId}/activities`),
            api.get(`/trips/${tripId}/links`),
            api.get(`/trips/${tripId}/participants`),
          ]);

        setTrip(tripRes.data);
        setActivities(activitiesRes.data);
        setLinks(linksRes.data);
        setParticipants(participantsRes.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Erro ao carregar dados da viagem"
          );
        } else {
          toast.error("Ocorreu um erro inesperado");
        }
      } finally {
        setIsLoadingTripData(false);
      }
    },
    []
  );

  return (
    <TripContext.Provider
      value={{
        trip,
        activities,
        links,
        participants,
        handleAddGuestInvite,
        handleRemoveGuestInvite,
        isActivityModalOpen,
        handleActivityModalOpen,
        handleAddNewActivity,
        isLinkModalOpen,
        handleLinkModalOpen,
        handleAddNewLink,
        handleFetchTripData,
        isLoadingTripData,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
