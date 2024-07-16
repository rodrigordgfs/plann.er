import { createContext, FC, ReactNode, useState } from "react";

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

export interface TripContextType {
  trip: Trip | null;
  setTrip: (trip: Trip) => void;
  activities: Activities;
  setActivities: (activities: Activities) => void;
  links: Links[];
  setLinks: (links: Links[]) => void;
  participants: Participants[];
  setParticipants: (participants: Participants[]) => void;
}

export const TripContext = createContext<TripContextType | undefined>(
  undefined
);

export const TripContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activities>({});
  const [links, setLinks] = useState<Links[]>([]);
  const [participants, setParticipants] = useState<Participants[]>([]);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        activities,
        setActivities,
        links,
        setLinks,
        participants,
        setParticipants,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
