import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";

export default function PublicRoute() {
  const { token, loading } = useAuth();

  if (loading) return <Spinner />;
  if (token) return <Navigate to="/" replace />;

  return <Outlet />;
}
