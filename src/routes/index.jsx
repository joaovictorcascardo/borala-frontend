import { BrowserRouter, Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home - Borala</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
