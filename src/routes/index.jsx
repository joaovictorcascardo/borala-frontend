import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import PublicProfilePage from "../pages/PublicProfilePage";
import VehiclesPage from "../pages/VehiclesPage";
import VehicleFormPage from "../pages/VehicleFormPage";
import EditVehiclePage from "../pages/EditVehiclePage";
import EventsPage from "../pages/EventsPage";
import EventRidesPage from "../pages/EventRidesPage";
import CreateRidePage from "../pages/CreateRidePage";
import RidesPage from "../pages/RidesPage";
import RideDetailPage from "../pages/RideDetailPage";
import MyRidesPage from "../pages/MyRidesPage";
import MyBookingsPage from "../pages/MyBookingsPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users/:id" element={<PublicProfilePage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/vehicles/new" element={<VehicleFormPage />} />
            <Route path="/vehicles/:id" element={<EditVehiclePage />} />
            <Route path="/vehicles/:id/edit" element={<EditVehiclePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id/rides" element={<EventRidesPage />} />
            <Route path="/rides/new" element={<CreateRidePage />} />
            <Route path="/rides" element={<RidesPage />} />
            <Route path="/rides/:id" element={<RideDetailPage />} />
            <Route path="/my-rides" element={<MyRidesPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
