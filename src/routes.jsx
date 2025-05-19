import { Auth } from './pages/auth/Auth';
import { DashboardPages } from './pages/dashboard/Dashboard';

const routes = [
    { path: 'auth', element: <Auth /> },
    { path: '/*', element: <DashboardPages /> },
]

export default routes;