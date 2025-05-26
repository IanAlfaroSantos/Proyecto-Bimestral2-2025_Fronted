import { useState } from 'react';
import Swal from 'sweetalert2';
import { postEvento, getEventos, putEvento, deleteEvento } from "../../services/api";

export const useEventos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [evento, setEvento] = useState(null);
    const [listaEventos, setListaEventos] = useState([]);

    const handlePostEvento = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await postEvento(data);

            if (response?.data?.success) {
                setEvento(response.data.evento);
                setSuccess(response.data.message);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: response.data.message || 'Evento creado correctamente',
                });
            } else {
                throw new Error("Error al guardar el evento!");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Error!";
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetEventos = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getEventos();

            if (response?.data?.success) {
                setListaEventos(response.data.eventos);
            } else {
                throw new Error("Error al cargar los eventos!");
            }
        } catch (err) {
            const msg = err.response?.data?.msg || err.message || "Error!";
            setError(msg);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateEvento = async (id, data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await putEvento(id, data);

            if (response?.data?.success) {
                setEvento(response.data.evento);
                setSuccess(response.data.msg);

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: response.data?.msg || 'El evento ha sido actualizado correctamente',
                });

                return response.data;
            } else {
                throw new Error("Error al actualizar el evento!");
            }
        } catch (err) {
            const msg = err.response?.data?.error || err.response?.data?.msg || err.message || "Error!";
            setError(msg);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEvento = async (id) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (!result.isConfirmed) {
                setIsLoading(false);
                return;
            }

            const response = await deleteEvento(id);

            if (response?.data?.success) {
                setSuccess(response.data.msg || 'Evento eliminado correctamente');
                setListaEventos(prev => prev.filter(ev => ev._id !== id));

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado!',
                    text: response.data.msg || 'Evento eliminado correctamente!',
                });
            } else {
                throw new Error("Error al eliminar el evento!");
            }
        } catch (err) {
            const msg = err.response?.data?.msg || err.message || "Error!";
            setError(msg);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { handlePostEvento, handleGetEventos, handleUpdateEvento, handleDeleteEvento, isLoading, error, success, evento, listaEventos }
}