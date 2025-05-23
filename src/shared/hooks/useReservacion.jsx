import { useState } from 'react';
import Swal from 'sweetalert2';
import { getReservaciones, postReservacion, putReservacion, deleteReservacion } from '../../services/api';

export const useReservaciones = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listaReservaciones, setListaReservaciones] = useState([]);

  const handleGetReservaciones = async () => {
    setIsLoading(true);
    try {
      const response = await getReservaciones();
      if (response?.data?.success) {
        setListaReservaciones(response.data.reservaciones);
      } else {
        throw new Error('Error al cargar las reservaciones!');
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error!';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePostReservacion = async (data) => {
    setIsLoading(true);
    try {
      const response = await postReservacion(data);
      if (response?.data?.success) {
        const nuevaReservacion = response.data.reservacion;
        setListaReservaciones(prev => [...prev, nuevaReservacion]);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.data.message || 'Reservación creada correctamente!',
        });
      } else {
        throw new Error("Error al crear la reservación!");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error!';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePutReservacion = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await putReservacion(id, data);
      if (response?.data?.success) {
        const reservacionActualizada = response.data.reservacion;
        setListaReservaciones(prev =>
          prev.map(res => (res._id === id ? reservacionActualizada : res))
        );
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa!',
          text: response.data.message || 'Reservación actualizada correctamente!',
        });
      } else {
        throw new Error("Error al actualizar la reservación!");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error!';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteReservacion = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reservación permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return;

    setIsLoading(true);
    try {
      const response = await deleteReservacion(id);
      if (response?.data?.success) {
        setListaReservaciones(prev =>
          prev.filter(res => res._id !== id)
        );
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: response.data.message || 'Reservación eliminada correctamente!',
        });
      } else {
        throw new Error("Error al eliminar la reservación!");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || 'Error!';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleGetReservaciones, handlePostReservacion, handlePutReservacion, handleDeleteReservacion, isLoading, listaReservaciones }
}