import { createBrowserRouter } from "react-router-dom";
import { CreateTripPage } from "../pages/create-trip";
import { TripDetailsPage } from "../pages/trip-details";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { ProtectedRoute } from "../layout/protected";
import { DashboardPage } from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardPage />} />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={<CreateTripPage />} />,
  },
  {
    path: "/trips/:tripId",
    element: <ProtectedRoute element={<TripDetailsPage />} />,
  },
]);
