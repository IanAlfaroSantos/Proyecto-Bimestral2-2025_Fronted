import {  Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HabitacionesPage from "./components/Habitaciones/HabitacionesPage.jsx";
import EventosPage from "./components/Eventos/EventosPage.jsx";
import ReservacionesPage from "./components/Reservaciones/ReservacionesPage.jsx";
import FacturasPage from "./components/Facturas/FacturasPage.jsx";
import InformesPage from "./components/Informes/InformesPage.jsx";
import Navbar from "./components/navbars/Navbar.jsx";
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from "react";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <App />
    <Routes>
      <Route path="/habitaciones" element={<HabitacionesPage />} />
      <Route path="/informes" element={<InformesPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/reservaciones" element={<ReservacionesPage />} />
      <Route path="/facturas" element={<FacturasPage />} />
    </Routes>

    </StrictMode>

  </BrowserRouter>
)