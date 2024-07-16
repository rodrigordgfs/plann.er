import { useContext } from "react";
import { TripContext, TripContextType } from "../context/trip-context";

const useTripContext = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
};

export default useTripContext;
