import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("@Borala:token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
