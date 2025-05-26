export const validateReservacion = (data) => {
    const errors = {};

    if (!data.nombreHotel || typeof data.nombreHotel !== 'string' || data.nombreHotel.trim() === '') {
        errors.nombreHotel = '⚠️ El hotel es requerido!';
    }

    if (!Array.isArray(data.habitaciones)) {
        errors.habitaciones = '⚠️ El formato de habitaciones no es válido!';
    } else if (data.habitaciones.length === 0) {
        errors.habitaciones = '⚠️ Debes seleccionar al menos una habitación!';
    }

    if (!Array.isArray(data.eventos)) {
        errors.eventos = '⚠️ El formato de eventos no es válido!';
    }

    return errors;
}