import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';
import { UserSettingsUpdate } from './pages/settings/UserSettings';

const routes = [
    { path: 'auth', element: <Auth /> },
    { path: '/*', element: <DashboardPages /> },
    { path: '/settings', element: <UserSettingsUpdate /> }
]

export default routes;