import { useState, useEffect } from "react";
import { logout as logoutHandler } from "./userLogout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const getUserDetails = () => {

    const userDetails = localStorage.getItem('user');

    if (userDetails) {
        return JSON.parse(userDetails);
    } else {
        return null;
    }
}

export const useUserDetails = () => {

    const [userDetails, setUserDetails] = useState(getUserDetails());
    const navigate = useNavigate();

    useEffect(() => {
        const mostrar = localStorage.getItem('mostrar-mensaje');
        if (mostrar === 'true') {
            Swal.fire({
                icon: 'success',
                title: 'Cierre de Sesión',
                text: 'Sesion cerrada exitosamente!!',
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                navigate('/auth')
            })
            localStorage.removeItem('mostrar-mensaje');
        }
    }, []);

    const logout = () => {
        logoutHandler();
    }

    return {
        isLogged: Boolean(userDetails),
        username: userDetails?.username ? userDetails.username : 'Guest',
        logout
    }
}