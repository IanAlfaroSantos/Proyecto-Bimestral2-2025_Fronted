import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/',
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