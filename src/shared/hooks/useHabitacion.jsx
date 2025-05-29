import { useState } from "react";
import { postHabitaciones, updateHabitaciones, getHabitaciones, getHabitacionesByType } from "../../services/api";
import Swal from "sweetalert2";

export const useHabitacion = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetHabitaciones = async () => {
        try {
            const response = await getHabitaciones();
            console.log(response)
            setHabitaciones(response.data.rooms);
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrio un error al obtener habitaciones'
            })
        } finally {
            setLoading(false);
        }
    }

    const handlePostHabitaciones = async (data) => {
        try {
            const response = await postHabitaciones(data)
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrio un error al guardar habitacion'
            })

        }
    }

    const handleGetHabitacionesByType = async (type) => {
        try {
            const response = await getHabitacionesByType(type);
            console.log(response)
            setHabitaciones(response.data.rooms);
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrio un error al obtener habitaciones'
            })
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateHabitaciones = async (id, data) => {
        setLoading(true);
        try {
            const response = await updateHabitaciones(id, data);
            console.log("Respuesta actualizada:", response.data);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: response.data?.msg || 'La habitación ha sido actualizada correctamente',
            });

            return response.data;
        } catch (error) {
            const backendError = error.response?.data;
            console.error("Error al actualizar habitación:", backendError);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Error al actualizar la habitación',
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        habitaciones,
        handleGetHabitaciones,
        handleGetHabitacionesByType,
        handlePostHabitaciones,
        handleUpdateHabitaciones,
    }
}