import { useState, useEffect } from 'react';
import { getReservaciones } from '../../services/api';

export const useReservacionDetails = (nombreHotel) => {
    const [reservaciones, setReservaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservaciones = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await getReservaciones();

                if (Array.isArray(data?.reservaciones)) {
                    const filtro = nombreHotel?.toLowerCase().trim();
                    const resultados = filtro
                        ? data.reservaciones.filter((res) =>
                            res.nombreHotel?.name?.toLowerCase().includes(filtro)
                        )
                        : data.reservaciones;

                    setReservaciones(resultados);
                } else {
                    setError('No se pudieron cargar las reservaciones');
                    setReservaciones([]);
                }
            } catch (err) {
                setError(err.message || 'Error desconocido');
                setReservaciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReservaciones();
    }, [nombreHotel]);

    return { reservaciones, loading, error }
}