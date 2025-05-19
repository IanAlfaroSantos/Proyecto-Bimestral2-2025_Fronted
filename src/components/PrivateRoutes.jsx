import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const PrivateRoutes = ({ element }) => {

    const user = localStorage.getItem('user');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const mostrar = localStorage.getItem('mostrar-mensaje')

    useEffect(() => {
        if (!user && !mostrar) {

            Swal.fire({
                icon: "info",
                title: "Iniciar Sesión",
                text: "Para realizar esta acción necesita iniciar sesión"
            }).then(() => {

                setShouldRedirect(true);
            })
        }
    }, [user])

    if (shouldRedirect) {
        return <Navigate to="/auth" />;
    }

    return user ? element : null;
}

export default PrivateRoutes;