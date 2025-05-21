import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../shared/hooks";
import { IoHome } from "react-icons/io5";
import { FaUserGear, FaHotel } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { ImEnter } from "react-icons/im";

const NavButton = ({ text, onClickHandler, children }) => {
    return (
        <span className="nav-button" onClick={onClickHandler}>
            {children && <span className="nav-button">{children}</span>}
            {text}
        </span>
    )
}

export const Navbar = () => {

    const { isLogged, logout } = useUserDetails();

    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    const handleNavigateToAuthPage = () => {
        navigate('/auth');
    }

    const handleNavigateToSettingPage = () => {
        navigate('/settings');
    }

    const handleNavigateToHotelPage = () => {
        navigate('/hoteles')
    }

    const handleLogout = async () => {
        logout();
    }

    return (
        <div className="nav-container">
            <div className="nav-buttons-container">
                {!isLogged ? (
                    <div>
                        <NavButton onClickHandler={handleNavigateToHome}>
                            <IoHome size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleNavigateToSettingPage}>
                            <FaUserGear size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleNavigateToHotelPage}>
                            <FaHotel size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleNavigateToAuthPage}>
                            <ImEnter size={30} />
                        </NavButton>
                    </div>
                ) : (
                    <div>
                        <NavButton onClickHandler={handleNavigateToHome}>
                            <IoHome size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleNavigateToSettingPage}>
                            <FaUserGear size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleNavigateToHotelPage}>
                            <FaHotel size={30} />
                        </NavButton>
                        <NavButton onClickHandler={handleLogout}>
                            <ImExit size={30} />
                        </NavButton>
                    </div>
                )}
            </div>
        </div>
    )
}