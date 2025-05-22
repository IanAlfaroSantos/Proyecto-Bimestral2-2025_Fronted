    import { useState } from "react";
    import { getHotelDemanda, getInformeReservaciones } from "../../services/api";


    export const useInformes = () => {
    const [demanda, setDemanda] = useState([]);
    const [reservaciones, setReservaciones] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDemandaHoteles = async () => {
        try {
        setLoading(true);
        setError(null);
        const response = await getHotelDemanda();
        console.log(response.data)
        setDemanda(response.data.estadisticas || []);
        } catch (err) {
        setError(err.message || "Error al obtener demanda de hoteles");
        } finally {
        setLoading(false);
        }
    };

    const fetchReservacionesPorHotel = async (id) => {
        try {
        setLoading(true);
        setError(null);
        const response = await getInformeReservaciones(id);
        console.log(response.data)
        setReservaciones(response.data);
        } catch (err) {
        setError(err.message || "Error al obtener reservaciones por hotel");
        } finally {
        setLoading(false);
        }
    };

    return {
        demanda,
        reservaciones,
        loading,
        error,
        fetchDemandaHoteles,
        fetchReservacionesPorHotel,
    };
    };