import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'proyecto-bimestral2-2025-production.up.railway.app/hoteles/',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const login = async (data) => {
    return await apiClient.post('users/login', data);
}

export const register = async (data) => {
    return await apiClient.post('users/register', data);
}

export const getUsers = async () => {
    const response = await apiClient.get('users/');
    return response.data;
}

export const getUserById = async () => {
    const response = await apiClient.get('users/search');
    return response.data;
}

export const updateUser = async (data) => {
    return await apiClient.put('users/', data);
}

export const deleteUser = async (data) => {
    return await apiClient.delete('users/', { data: data });
}

export const updateUserAdmin = async (id, data) => {
    return await apiClient.put(`users/updateUsers/${id}`, data);
}

export const deleteUserAdmin = async (id, data) => {
    return await apiClient.delete(`users/deleteUsers/${id}`, { data: data });
}

export const saveHotel = async (data) => {
    return await apiClient.post('hoteles/', data);
}

export const getHoteles = async () => {
    const response = await apiClient.get('hoteles/');
    return response.data;
}

export const getHotelById = async (id) => {
    const response = await apiClient.get(`hoteles/${id}`);
    return response.data;
}

export const updateHotel = async (id, data) => {
    return await apiClient.put(`hoteles/${id}`, data);
}

export const deleteHotel = async (id) => {
    return await apiClient.delete(`hoteles/${id}`);
}

export const postEvento = async (data) => {
    return await apiClient.post('eventos/postEvento', data);
}

export const getEventos = async () => {
    return await apiClient.get('eventos/getEventos');
}

export const putEvento = async (id, data) => {
    return await apiClient.put(`eventos/putEvento/${id}`, data);
}

export const deleteEvento = async (id) => {
    return await apiClient.delete(`eventos/deleteEvento/${id}`);
}

export const postReservacion = async (data) => {
    return await apiClient.post('reservaciones/postReservacion', data);
}

export const getReservaciones = async () => {
    return await apiClient.get('reservaciones/getReservaciones');
}

export const putReservacion = async (id, data) => {
    return await apiClient.put(`reservaciones/putReservacion/${id}`, data);
}

export const deleteReservacion = async (id) => {
    return await apiClient.delete(`reservaciones/deleteReservacion/${id}`);
}

export const postFactura = async (data) =>{
    return await apiClient.post('facturas/',data);
}

export const getFactura = async () => {
    return await apiClient.get('facturas/');
}

export const getFacturaByUser = async () => {
    return await apiClient.get('facturas/own');
}

export const postHabitaciones = async (data) => {
    return await apiClient.post('/rooms/', data);
}

export const getHabitaciones = async () => {
    return await apiClient.get('/rooms/');
}

export const updateHabitaciones = async (id, data) => {
    return await apiClient.put(`/rooms/${id}`, data);
}

export const getHabitacionesByType = async (type) => {
    return await apiClient.get(`/rooms/tipo/${type}`);
}

export const getHotelDemanda = async () => {
    return await apiClient.get('/informes/demanda');
}

export const getInformeReservaciones = async (id) => {
    return await apiClient.get(`/informes/reservaciones/${id}`);
}

export const getReservacionPorHotel = async (nombreHotel) => {
    return await apiClient.get(`reservaciones/getReservacionPorHotel/${nombreHotel}`);
}
