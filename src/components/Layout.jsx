import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-page">
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <Navbar />
      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>
    </div>
  );
}
