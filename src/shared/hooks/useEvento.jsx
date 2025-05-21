import { useState } from 'react';
import { postEvento } from "../../services/api";

export const useEventos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [evento, setEvento] = useState(null);

    const handlePostEvento = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await postEvento(data);

            if (response?.data?.success) {
                setEvento(response.data.evento);
                setSuccess(response.data.message);
            } else {
                throw new Error("Error al guardar el evento!");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Error!");
        } finally {
            setIsLoading(false);
        }
    };

    return { handlePostEvento, isLoading, error, success, evento }
}