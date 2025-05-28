import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers as getUsersRequest,
  getUserById as getUserByIdRequest,
  updateUserAdmin as updateUserAdminRequest,
  deleteUserAdmin as deleteUserAdminRequest
} from "../../services";
import Swal from "sweetalert2";

export const useUpdateUsersByAdmin = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsersRequest();
      setUsers(response.users);
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

  const getUserById = async (id) => {
    try {
      const response = await getUserByIdRequest(id);
      console.log(response)
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Ocurrio un error al obtener users'
      })
    } finally {
      setIsLoading(false);
    }
  }

  const updateUserAdmin = async (id, { name, surname, username, password, currentPassword, phone }) => {
    setIsLoading(true);

    try {
      const confirm = await Swal.fire({
        icon: 'question',
        title: '¿Está seguro?',
        text: '¿Desea actualizar el usuario?',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      })

      if (!confirm.isConfirmed) return;

      await updateUserAdminRequest(id, { name, surname, username, password, currentPassword, phone });

      await Swal.fire({
        icon: "success",
        title: "User Actualizado",
        text: "El user se actualizó exitosamente!",
        timer: 3000,
        showConfirmButton: false,
      })

      await getUsers();
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

  const deleteUserAdmin = async (id) => {
    try {
      const confirm = await Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: '¿Desea eliminar el user?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!confirm.isConfirmed) return;

      await deleteUserAdminRequest(id);

      await Swal.fire({
        icon: 'success',
        title: 'User Eliminado!',
        text: 'El user se elimino exitosamente',
        timer: 3000,
        showConfirmButton: false
      })

      await getUsers();
    } catch (error) {
      const backendError = error.response?.data;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: backendError?.error || backendError?.msg || 'Hubo un problema al eliminar el user'
      })
    }
  }

  return {
    getUsers,
    getUserById,
    updateUserAdmin,
    deleteUserAdmin,
    users,
    user,
    isLoading
  }
}