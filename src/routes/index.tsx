import { createBrowserRouter } from "react-router-dom";
import { CreateTripPage } from "../pages/create-trip";
import { TripDetailsPage } from "../pages/trip-details";
import { LoginPage } from "../pages/login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);
