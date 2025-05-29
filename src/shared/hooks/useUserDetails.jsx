import { useState, useEffect } from "react";
import { logout as logoutHandler } from "./userLogout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const getUserDetails = () => {
    const userDetails = localStorage.getItem('user');
    return userDetails ? JSON.parse(userDetails) : null;
}

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails());
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogoutMessage = () => {
            const mostrar = localStorage.getItem('mostrar-mensaje');
            if (mostrar === 'true') {
                localStorage.removeItem('mostrar-mensaje');
                if (window.location.pathname === '/auth') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cierre de Sesión',
                        text: 'Sesión cerrada exitosamente!!',
                        timer: 3000,
                        showConfirmButton: false
                    })
                }
            }
        }

        checkLogoutMessage();
    }, []);

    const logout = () => {
        logoutHandler();
        setUserDetails(null);
    }

    return {
        isLogged: Boolean(userDetails),
        user: userDetails,
        username: userDetails?.username ? userDetails.username : 'Guest',
        logout
    }
}