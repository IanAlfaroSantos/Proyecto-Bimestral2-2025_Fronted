export const validateReservacion = (data) => {
  const errors = {};

  
  if (!data.nombreHotel || typeof data.nombreHotel !== 'string' || data.nombreHotel.trim() === '') {
    errors.nombreHotel = '⚠️ El hotel es requerido!';
  }


  const hasHabitaciones = Array.isArray(data.habitaciones) && data.habitaciones.length > 0;
  const hasEventos = Array.isArray(data.eventos) && data.eventos.length > 0;

  if (!hasHabitaciones && !hasEventos) {
    errors.habitaciones = '⚠️ Debes seleccionar al menos una habitación o un evento!';
    errors.eventos = '⚠️ Debes seleccionar al menos una habitación o un evento!';
  }

 
  if (!Array.isArray(data.habitaciones)) {
    errors.habitaciones = '⚠️ El formato de habitaciones no es válido!';
  }

  if (!Array.isArray(data.eventos)) {
    errors.eventos = '⚠️ El formato de eventos no es válido!';
  }

  return errors;
};
