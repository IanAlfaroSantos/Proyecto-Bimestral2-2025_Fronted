import { useEffect, useState } from 'react';
import { useReservaciones } from '../../shared/hooks/useReservacion';

const ReservacionesPage = () => {
  const { handleGetReservaciones, handlePostReservacion, handlePutReservacion, handleDeleteReservacion, listaReservaciones, isLoading } = useReservaciones();

  const [nombreHotel, setNombreHotel] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [eventos, setEventos] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    handleGetReservaciones();
  }, []);

  const resetForm = () => {
    setNombreHotel('');
    setHabitaciones('');
    setEventos('');
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombreHotel.trim()) return alert('Ingresa el nombre del hotel');

    const data = {
      nombreHotel,
      habitaciones: habitaciones.split(',').map(h => h.trim()).filter(Boolean),
      eventos: eventos.split(',').map(e => e.trim()).filter(Boolean),
    };

    editId ? handlePutReservacion(editId, data) : handlePostReservacion(data);
    resetForm();
  };

  const handleEdit = (res) => {
    setNombreHotel(res.nombreHotel?.name || '');
    setHabitaciones(res.habitaciones.map(h => h._id).join(','));
    setEventos(res.eventos.map(e => e._id).join(','));
    setEditId(res._id);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center gap-4">
        <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
          <h2 className="text-center text-primary mb-4">
            {editId ? 'Editar Reservación' : 'Crear Nueva Reservación'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Hotel</label>
              <input
                type="text"
                className="form-control"
                value={nombreHotel}
                onChange={(e) => setNombreHotel(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Habitaciones (IDs)</label>
              <input
                type="text"
                className="form-control"
                value={habitaciones}
                onChange={(e) => setHabitaciones(e.target.value)}
                placeholder="Separadas por comas"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Eventos (IDs)</label>
              <input
                type="text"
                className="form-control"
                value={eventos}
                onChange={(e) => setEventos(e.target.value)}
                placeholder="Separados por comas"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isLoading}>
              {isLoading
                ? editId ? 'Actualizando...' : 'Creando...'
                : editId ? 'Actualizar Reservación' : 'Guardar Reservación'}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-3"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-primary mb-4 text-center">Reservaciones Existentes</h2>

          {isLoading && listaReservaciones.length === 0 ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : listaReservaciones.length === 0 ? (
            <p className="text-center text-muted">No hay reservaciones registradas.</p>
          ) : (
            <div className="list-group">
              {listaReservaciones.map((res) => (
                <div key={res._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                  <h5><strong>Usuario:</strong> {res.nombreUsuario?.name} {res.nombreUsuario?.surname}</h5>
                  <p><strong>Email:</strong> {res.nombreUsuario?.email}</p>
                  <p><strong>Hotel:</strong> {res.nombreHotel?.name}</p>
                  <p><strong>Habitaciones:</strong></p>
                  <ul>
                    {res.habitaciones.map((hab, i) => (
                      <li key={i}>{hab.type} - Q{hab.price}</li>
                    ))}
                  </ul>
                  <p><strong>Eventos:</strong></p>
                  <ul>
                    {res.eventos.map((ev, i) => (
                      <li key={i}>{ev.tipoSala || 'Evento sin tipo'}</li>
                    ))}
                  </ul>
                  <p><strong>Fecha de Ocupación:</strong> {new Date(res.fechaOcupacion).toLocaleString()}</p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(res)}
                    disabled={isLoading}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteReservacion(res._id)}
                    disabled={isLoading}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservacionesPage;