import { createBrowserRouter, Navigate } from "react-router-dom";
import { TripDetailsPage } from "../pages/trip-details";
import { LoginPage } from "../pages/login";
import { RegisterPage } from "../pages/register";
import { ProtectedRoute } from "../layout/protected";
import { DashboardPage } from "../pages/dashboard";
import { ProfilePage } from "../pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
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
    path: "/profile",
    element: <ProtectedRoute element={<ProfilePage />} />,
  },
  {
    path: "/trips/:tripId",
    element: <ProtectedRoute element={<TripDetailsPage />} />,
  },
]);
