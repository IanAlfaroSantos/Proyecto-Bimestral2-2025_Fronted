import { useUserSettings } from "../../shared/hooks";
import { UserSettings } from "../../components/users/UpdateSettings";
import { Navbar } from "../../components/navbars/Navbar";
import "../dashboard/dashboard.css";
import "../auth/auth.css";
import PrivateRoutes from "../../components/PrivateRoutes";

export const UserSettingsUpdate = () => {
    const { userSettings, saveSettings, isFetching } = useUserSettings();

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="auth-container">
            <div className="dashboard-container">
                <Navbar />
                <div className="settings-container">
                    { }
                    <br />
                    <br />
                    <br />
                    <UserSettings
                        initialSettings={userSettings}
                        onSave={saveSettings}
                    />
                </div>
                <PrivateRoutes />
            </div>
        </div>
    )
}