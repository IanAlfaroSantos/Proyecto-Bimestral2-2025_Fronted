import { useState } from "react"
import { deleteUser } from "../../services"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export const useDeleteUser = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    const handleDeleteUser = async (data) => {
        try {
            const { username, currentPassword } = data;

            const response = await deleteUser({
                username: username,
                password: currentPassword
            });

            const confirm = await Swal.fire({
                icon: 'warning',
                title: '¿Está seguro?',
                text: '¿Desea eliminar su cuenta?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            })

            if (!confirm.isConfirmed) return;

            await Swal.fire({
                icon: 'success',
                title: 'Cuenta Eliminada!',
                text: 'Tu cuenta se elimino exitosamente',
                timer: 3000,
                showConfirmButton: false
            })

            setUser(response);

            navigate('/auth');
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Hubo un problema al guardar la información del usuario'
            })
        }
    }

    return {
        user,
        handleDeleteUser
    }
}