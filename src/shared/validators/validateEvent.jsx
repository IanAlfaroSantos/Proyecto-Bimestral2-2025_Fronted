// shared/validations/validateEvent.js
export const validateEvento = (evento) => {
    const errors = {};

    if (!evento.hotel || evento.hotel.trim() === '') {
        errors.hotel = '⚠️ El nombre del hotel es obligatorio!';
    }

    if (!evento.tipoSala) {
        errors.tipoSala = '⚠️ Debe seleccionar un tipo de sala!';
    } else if (!['ALTA CALIDAD', 'MEDIA CALIDAD', 'BAJA CALIDAD'].includes(evento.tipoSala)) {
        errors.tipoSala = '⚠️ El tipo de sala seleccionado no es válido!';
    }

    if (typeof evento.numeroSalas !== 'number' || evento.numeroSalas < 1) {
        errors.numeroSalas = '⚠️ El número de salas debe ser al menos 1!';
    }

    if (typeof evento.precio !== 'number' || evento.precio < 0.01) {
        errors.precio = '⚠️ El precio debe ser mayor a 0!';
    }

    return errors;
}