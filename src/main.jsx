import {  Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HabitacionesPage from "./components/Habitaciones/HabitacionesPage.jsx";
import EventosPage from "./components/Eventos/EventosPage.jsx";
import { Navbar } from "./components/navbars/Navbar.jsx";
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 
    <App />
    <Routes>
      <Route path="/habitaciones" element={<HabitacionesPage />} />
      <Route path="/eventos" element={<EventosPage />} />
    </Routes>

  </BrowserRouter>
)