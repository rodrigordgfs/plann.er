import { createContext, FC, ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";
import useAuthContext from "../hooks/use-auth-context";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  trip_id: string;
  is_done: boolean;
}
interface Activities {
  [date: string]: Activity[];
}

interface Link {
  title: string;
  url: string;
}

interface Participant {
  id: string;
  user: {
    name: string | null;
    email: string;
  };
  is_confirmed: boolean;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

export interface TripContextType {
  trip: Trip | null;
  activities: Activities;
  links: Link[];
  participants: Participant[];
  updatingActivity: boolean;
  togglingActivityDone: boolean;
  isActivityModalOpen: boolean;
  isLinkModalOpen: boolean;
  isLoadingTripData: boolean;
  isUpdateActivityModalOpen: boolean;
  activitySelected: Activity | null;
  savingLink: boolean;
  savingGuest: boolean;
  isManageGuestsModalOpen: boolean;
  savingActivity: boolean;
  isUpdateDestinationTripDateModalOpen: boolean;
  updatingTrip: boolean;
  isCreateTripModalOpen: boolean;
  isGuestsModalOpen: boolean;
  loadingConfirmTrip: boolean;
  handleAddGuestInvite: (tripId: string | undefined, email: string) => void;
  handleRemoveGuestInvite: (email: string) => void;
  handleActivityModalOpen: (value: boolean) => void;
  handleAddNewActivity: (
    dtripId: string | undefined,
    title: string,
    occurs_at: string
  ) => void;
  handleLinkModalOpen: (value: boolean) => void;
  handleAddNewLink: (
    tripId: string | undefined,
    title: string,
    url: string
  ) => void;
  handleFetchTripData: (tripId: string | undefined) => Promise<void>;
  handleUpdateActivityModalOpen: (
    value: boolean,
    activity: Activity | null
  ) => void;
  handleToogleActivityDone: (
    tripId: string | undefined,
    activityId: string | undefined,
    is_done: boolean
  ) => void;
  handleFetchUpdateActivity: (
    activityId: string | undefined,
    title: string,
    occurs_at: string
  ) => void;
  handleChangeGuestsModal: (value: boolean) => void;
  handleUpdateDestinationAndTripDateModalOpen: (value: boolean) => void;
  handleUpdateTrip: (
    tripId: string | undefined,
    destination: string | undefined,
    starts_at: Date | undefined,
    ends_at: Date | undefined
  ) => void;
  handleCreateTripModalOpen: (value: boolean) => void;
  handleGuestsModalOpen: (value: boolean) => void;
  handleCreateTrip: (
    destination: string,
    starts_at: string | undefined,
    ends_at: string | undefined,
    emails_to_invite: string[]
  ) => Promise<string | undefined>;
}

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);

export const TripContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userId } = useAuthContext();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activities>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [isUpdateActivityModalOpen, setIsUpdateActivityModalOpen] =
    useState(false);
  const [activitySelected, setActivitySelected] = useState<Activity | null>(
    null
  );
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isLoadingTripData, setIsLoadingTripData] = useState(false);
  const [updatingActivity, setUpdatingActivity] = useState(false);
  const [togglingActivityDone, setTogglingActivityDone] = useState(false);
  const [savingLink, setSavingLink] = useState(false);
  const [savingGuest, setSavingGuest] = useState(false);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [savingActivity, setSavingActivity] = useState(false);
  const [updatingTrip, setUpdatingTrip] = useState(false);
  const [
    isUpdateDestinationTripDateModalOpen,
    setIsUpdateDestinationTripDateModalOpen,
  ] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [loadingConfirmTrip, setLoadingConfirmTrip] = useState(false);

  const handleGuestsModalOpen = (value: boolean) => {
    setIsGuestsModalOpen(value);
  };

  const handleCreateTripModalOpen = (value: boolean) => {
    setIsCreateTripModalOpen(value);
  };

  const handleActivityModalOpen = (value: boolean) => {
    setIsActivityModalOpen(value);
  };

  const handleLinkModalOpen = (value: boolean) => {
    setIsLinkModalOpen(value);
  };

  const handleCreateTrip = async (
    destination: string,
    starts_at: string | undefined,
    ends_at: string | undefined,
    emails_to_invite: string[]
  ): Promise<string | undefined> => {
    setLoadingConfirmTrip(true);

    try {
      const { data } = await api.post("/trips", {
        destination,
        starts_at,
        ends_at,
        emails_to_invite,
        user_id: userId,
      });

      const { tripId } = data;

      if (tripId) {
        toast.success("Viagem criada com sucesso");
        setLoadingConfirmTrip(false);
        return tripId;
      }
    } catch (error) {
      setLoadingConfirmTrip(false);
      const apiError = error as ApiError;
      toast.error(apiError.response.data.message);
    }
  };

  const handleAddNewLink = (
    tripId: string | undefined,
    title: string,
    url: string
  ) => {
    setSavingLink(true);

    api
      .post(`/trips/${tripId}/links`, {
        title,
        url,
      })
      .then(({ data }) => {
        setLinks((prevLinks) => [...prevLinks, data]);
        handleLinkModalOpen(false);
        toast.success("Link adicionado com sucesso");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingLink(false);
      });
  };

  const handleUpdateActivityModalOpen = (
    value: boolean,
    activity: Activity | null
  ) => {
    setIsUpdateActivityModalOpen(value);
    setActivitySelected(activity);
  };

  const handleAddNewActivity = (
    tripId: string | undefined,
    title: string,
    occurs_at: string
  ) => {
    setSavingActivity(true);

    api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(({ data }) => {
        setActivities((prevActivities) => {
          const activitiesForDate =
            prevActivities[format(data.occurs_at, "yyyy-MM-dd")] || [];
          return {
            ...prevActivities,
            [format(data.occurs_at, "yyyy-MM-dd")]: [
              ...activitiesForDate,
              data,
            ],
          };
        });

        handleActivityModalOpen(false);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingActivity(false);
      });
  };

  const handleAddGuestInvite = (tripId: string | undefined, email: string) => {
    setSavingGuest(true);

    api
      .post(`/trips/${tripId}/invites`, {
        email,
      })
      .then(({ data }) => {
        setParticipants([...participants, data]);
        toast.success("Convidado adicionado com sucesso");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setSavingGuest(false);
      });
  };

  const handleRemoveGuestInvite = (email: string) => {
    setParticipants(
      participants?.filter((participant) => participant.user.email !== email)
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

  const handleFetchUpdateActivity = async (
    activityId: string | undefined,
    title: string,
    occurs_at: string
  ) => {
    if (!trip?.id || !activityId) return;

    setUpdatingActivity(true);

    try {
      await api.put(`/trips/${trip.id}/activities/${activityId}`, {
        title,
        occurs_at,
      });

      const { data } = await api.get(`/trips/${trip.id}/activities`);

      setActivities(data);

      handleUpdateActivityModalOpen(false, null);
      toast.success("Atividade atualizada com sucesso");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || "Erro ao atualizar atividade");
      } else {
        toast.error("Ocorreu um erro inesperado");
      }
    } finally {
      setUpdatingActivity(false);
    }
  };

  const handleToogleActivityDone = async (
    tripId: string | undefined,
    activityId: string | undefined,
    is_done: boolean
  ) => {
    if (!tripId || !activityId) return;

    setTogglingActivityDone(true);
    try {
      await api.patch(`/trips/${tripId}/activities/${activityId}/toggle`, {
        is_done,
      });
      toast.success(
        `Atividade ${is_done ? "marcada" : "desmarcada"} com sucesso`
      );
      setActivities((prevActivities) => {
        const newActivities = { ...prevActivities };
        const date = Object.keys(newActivities).find((date) =>
          newActivities[date].some((activity) => activity.id === activityId)
        );

        if (!date) return prevActivities;

        newActivities[date] = newActivities[date].map((activity) =>
          activity.id === activityId ? { ...activity, is_done } : activity
        );

        handleUpdateActivityModalOpen(false, null);
        return newActivities;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Erro ao atualizar atividade"
        );
      } else {
        toast.error("Ocorreu um erro inesperado");
      }
    } finally {
      setTogglingActivityDone(false);
    }
  };

  const handleChangeGuestsModal = (value: boolean) => {
    setIsManageGuestsModalOpen(value);
  };

  const handleUpdateDestinationAndTripDateModalOpen = (value: boolean) => {
    setIsUpdateDestinationTripDateModalOpen(value);
  };

  const handleUpdateTrip = (
    tripId: string | undefined,
    destination: string | undefined,
    starts_at: Date | undefined,
    ends_at: Date | undefined
  ) => {
    setUpdatingTrip(true);

    api
      .put(`/trips/${tripId}`, {
        destination,
        starts_at,
        ends_at,
      })
      .then(() => {
        Promise.all([
          api.get(`/trips/${tripId}`),
          api.get(`/trips/${tripId}/activities`),
        ])
          .then(([{ data: tripData }, { data: activitiesData }]) => {
            setTrip(tripData);
            setActivities(activitiesData);
            setIsUpdateDestinationTripDateModalOpen(false);
          })
          .catch((e) => {
            if (axios.isAxiosError(e)) {
              toast.error(
                e.response?.data?.message || "Erro ao carregar dados da viagem"
              );
            } else {
              toast.error("Ocorreu um erro inesperado");
            }
          })
          .finally(() => {
            setUpdatingTrip(false);
          });
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setUpdatingTrip(false);
      });
  };

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
        isUpdateActivityModalOpen,
        handleUpdateActivityModalOpen,
        activitySelected,
        handleToogleActivityDone,
        handleFetchUpdateActivity,
        updatingActivity,
        togglingActivityDone,
        savingLink,
        savingGuest,
        isManageGuestsModalOpen,
        handleChangeGuestsModal,
        savingActivity,
        isUpdateDestinationTripDateModalOpen,
        handleUpdateDestinationAndTripDateModalOpen,
        updatingTrip,
        handleUpdateTrip,
        isCreateTripModalOpen,
        handleCreateTripModalOpen,
        isGuestsModalOpen,
        handleGuestsModalOpen,
        handleCreateTrip,
        loadingConfirmTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
