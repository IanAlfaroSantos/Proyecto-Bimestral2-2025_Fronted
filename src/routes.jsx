import EventosPage from './components/Eventos/EventosPage';
import FacturasPage from './components/Facturas/FacturasPage';
import HabitacionesPage from './components/Habitaciones/HabitacionesPage';
import InformesPage from './components/Informes/InformesPage';
import ReservacionesPage from './components/Reservaciones/ReservacionesPage';
import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';

const routes = [
    { path: 'auth', element: <Auth /> },
    { path: '/*', element: <DashboardPages /> },
    {path:"/habitaciones", element:<HabitacionesPage /> },
      { path:"/informes" ,element:<InformesPage /> },     
      { path:"/eventos", element:<EventosPage /> },
      { path:"/reservaciones", element:<ReservacionesPage /> },
      { path:"/facturas" ,element:<FacturasPage /> }
]

export default routes;