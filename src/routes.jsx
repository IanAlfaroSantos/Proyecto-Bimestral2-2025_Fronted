import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';
import { UserSettingsUpdate } from './pages/settings/UserSettings';
import HotelesPage from './components/hotels/Hotel';
import HabitacionesPage from "./components/Habitaciones/HabitacionesPage.jsx";
import EventosPage from "./components/Eventos/EventosPage.jsx";
import ReservacionesPage from "./components/Reservaciones/ReservacionesPage.jsx";
import FacturasPage from "./components/Facturas/FacturasPage.jsx";
import InformesPage from "./components/Informes/InformesPage.jsx";
import UsersPage from './components/users/UserUpdateByAdmin.jsx';
import EventLista from './components/Eventos/EventosLista.jsx';
import HotelLista from './components/hotels/HotelLista.jsx';
import HabitacionesList from './components/Habitaciones/HabitacionLista.jsx';
import ReservacionesDetailsPage from "./components/Reservaciones/ReservacionesDetailsPage.jsx";
import ReservacionesByUser from './components/Reservaciones/ReservacionesByUser.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const routes = [
    { path: 'auth', element: <Auth /> },

    {
        path: '/settings',
        element: (
            <ProtectedRoute roles={['USER']}>
                <UserSettingsUpdate />
            </ProtectedRoute>
        )
    },
    {
        path: '/hoteles',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL']}>
                <HotelesPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/manager-users',
        element: (
            <ProtectedRoute roles={['ADMIN_WEB']}>
                <UsersPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/habitaciones',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL']}>
                <HabitacionesPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/eventos',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL']}>
                <EventosPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/facturas',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL', 'ADMIN_WEB']}>
                <FacturasPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/reservaciones',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL', 'ADMIN_WEB']}>
                <ReservacionesPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/informes',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL', 'ADMIN_WEB']}>
                <InformesPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/eventos-lista',
        element: (
            <ProtectedRoute roles={['USER']}>
                <EventLista />
            </ProtectedRoute>
        )
    },
    {
        path: '/hoteles-lista',
        element: (
            <ProtectedRoute roles={['USER']}>
                <HotelLista />
            </ProtectedRoute>
        )
    },
    {
        path: '/habitaciones-lista',
        element: (
            <ProtectedRoute roles={['USER']}>
                <HabitacionesList />
            </ProtectedRoute>
        )
    },
    {
        path: '/detalleReservaciones',
        element: (
            <ProtectedRoute roles={['ADMIN_HOTEL']}>
                <ReservacionesDetailsPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/reservacionesUser',
        element: (
            <ProtectedRoute roles={['USER']}>
                <ReservacionesByUser />
            </ProtectedRoute>
        )
    },
    {
        path: '/*',
        element: (
            <ProtectedRoute>
                <DashboardPages />
            </ProtectedRoute>
        )
    }
]

export default routes;