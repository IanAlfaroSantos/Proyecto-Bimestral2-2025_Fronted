import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveHotel as saveHotelRequest,
  getHoteles as getHotelesRequest,
  getHotelById as getHotelByIdRequest,
  updateHotel as updateHotelRequest,
  deleteHotel as deleteHotelRequest
} from "../../services";
import Swal from "sweetalert2";

export const useHotel = () => {

  const [hoteles, setHoteles] = useState([]);
  const [hotel, setHotel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveHotel = async (name, direccion, categoria, comodidades, imagen) => {
    setIsLoading(true);

    try {

      const hotelData = { name, direccion, categoria, comodidades, imagen }

      await saveHotelRequest(hotelData);

      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Hotel registrado exitosamente!!',
        timer: 3000,
        showConfirmButton: false
      });

    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Ocurrió un error inesperado. Por favor, intenta de nuevo',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getHoteles = async () => {
    setIsLoading(true);
    try {
      const response = await getHotelesRequest();
      setHoteles(response.hoteles);
      console.log(response.hoteles);
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Ocurrio un error al obtener los hoteles'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const getHotelById = async (id) => {
    try {
      const response = await getHotelByIdRequest(id);
      console.log(response)
      setHabitaciones(response.data.hoteles);
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Ocurrio un error al obtener habitaciones'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const updateHotel = async (id, { name, direccion, categoria, comodidades }) => {
    setIsLoading(true);

    try {
      const confirm = await Swal.fire({
        icon: 'question',
        title: '¿Está seguro?',
        text: '¿Desea actualizar el hotel?',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      })

      if (!confirm.isConfirmed) return;

      await updateHotelRequest(id, { name, direccion, categoria, comodidades });

      await Swal.fire({
        icon: "success",
        title: "Hotel Actualizado",
        text: "El hotel se actualizó exitosamente!",
        timer: 3000,
        showConfirmButton: false,
      })

      navigate('/hoteles');
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: "error",
        title: "Error",
        text: backendError?.error || backendError?.msg || "Ocurrió un error inesperado. Por favor, intenta de nuevo",
      })
    } finally {
      setIsLoading(false);
    }
  }

  const deleteHotel = async (id) => {
    try {
      const confirm = await Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: '¿Desea eliminar el hotel?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!confirm.isConfirmed) return;

      await deleteHotelRequest(id);

      await Swal.fire({
        icon: 'success',
        title: 'Hotel Eliminado!',
        text: 'El hotel se elimino exitosamente',
        timer: 3000,
        showConfirmButton: false
      })

      await getHoteles();
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Hubo un problema al eliminar el hotel'
      })
    }
  }

  return {
    saveHotel,
    getHoteles,
    getHotelById,
    updateHotel,
    deleteHotel,
    hoteles,
    hotel,
    isLoading
  }
}