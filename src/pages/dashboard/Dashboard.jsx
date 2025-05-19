import { Navbar } from "../../components/navbars/Navbar";
import PrivateRoutes from "../../components/PrivateRoutes";
import './dashboard.css';

export const DashboardPages = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <PrivateRoutes />
        </div>
    )
}