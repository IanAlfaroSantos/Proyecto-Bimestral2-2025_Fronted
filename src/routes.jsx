import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';
import { UserSettingsUpdate } from './pages/settings/UserSettings';
import HotelesPage from './components/hotels/Hotel';

const routes = [
    { path: 'auth', element: <Auth /> },
    { path: '/*', element: <DashboardPages /> },
    { path: '/settings', element: <UserSettingsUpdate /> },
    { path: '/hoteles', element: <HotelesPage /> }
]

export default routes;