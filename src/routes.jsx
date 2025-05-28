import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';
import { UserSettingsUpdate } from './pages/settings/UserSettings';
import HotelesPage from './components/hotels/Hotel';
import HabitacionesPage from "./components/Habitaciones/HabitacionesPage.jsx";
import EventosPage from "./components/Eventos/EventosPage.jsx";
import ReservacionesPage from "./components/Reservaciones/ReservacionesPage.jsx";
import FacturasPage from "./components/Facturas/FacturasPage.jsx";
import InformesPage from "./components/Informes/InformesPage.jsx";
import EventLista from './components/Eventos/EventosLista.jsx';
import HotelLista from './components/hotels/HotelLista.jsx';
import HabitacionesList from './components/Habitaciones/HabitacionLista.jsx';

const routes = [
    {path: 'auth', element: <Auth /> },
    {path: '/settings', element: <UserSettingsUpdate /> },
    {path: '/hoteles', element: <HotelesPage /> },
    {path: '/habitaciones', element: <HabitacionesPage />},
    {path: '/eventos', element: <EventosPage />},
    {path: '/facturas', element: <FacturasPage/>},
    {path: '/reservaciones', element: <ReservacionesPage />},
    {path: '/informes', element: <InformesPage />},
    {path: '/eventos-lista', element: <EventLista />},
    {path: '/hoteles-lista', element: <HotelLista />},
    {path: '/habitaciones-lista', element: <HabitacionesList />},
    {path: '/*', element: <DashboardPages /> }
    
]

export default routes;