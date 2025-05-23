import { useState, useEffect } from 'react';
import { useEventos } from '../../shared/hooks/useEvento';

const EventosPage = () => {
  const { handlePostEvento, handleGetEventos, handleUpdateEvento, handleDeleteEvento, isLoading, success, listaEventos } = useEventos();

  const [eventoData, setEventoData] = useState({
    hotel: '',
    tipoSala: '',
    numeroSalas: 1,
    precio: 1,
  });

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    handleGetEventos();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => window.location.reload(), 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editMode
      ? await handleUpdateEvento(editingId, eventoData)
      : await handlePostEvento(eventoData);
  };

  const onChange = (field, value) =>
    setEventoData((prev) => ({ ...prev, [field]: value }));

  const handleEdit = (evento) => {
    setEditMode(true);
    setEditingId(evento._id);
    setEventoData({
      hotel: typeof evento.hotel === 'object' ? evento.hotel.name : evento.hotel,
      tipoSala: evento.tipoSala,
      numeroSalas: evento.numeroSalas,
      precio: evento.precio,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingId(null);
    setEventoData({ hotel: '', tipoSala: '', numeroSalas: 1, precio: 1 });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center gap-4">
        {/* Formulario */}
        <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
          <h2 className="text-center text-primary mb-4">
            {editMode ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Hotel</label>
              <input
                type="text"
                id="hotel"
                className="form-control"
                required
                value={eventoData.hotel}
                onChange={(e) => onChange('hotel', e.target.value)}
                placeholder="Ejemplo: Hotel Paraíso"
                readOnly={editMode}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Tipo de Sala</label>
              <select
                className="form-select"
                required
                value={eventoData.tipoSala}
                onChange={(e) => onChange('tipoSala', e.target.value)}
              >
                <option value="" disabled>Seleccione tipo de sala</option>
                <option value="ALTA CALIDAD">ALTA CALIDAD</option>
                <option value="MEDIA CALIDAD">MEDIA CALIDAD</option>
                <option value="BAJA CALIDAD">BAJA CALIDAD</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Número de Salas</label>
              <input
                type="number"
                min={1}
                className="form-control"
                required
                value={eventoData.numeroSalas}
                onChange={(e) => onChange('numeroSalas', parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Precio</label>
              <input
                type="number"
                step="0.01"
                min={0.01}
                className="form-control"
                required
                value={eventoData.precio}
                onChange={(e) => onChange('precio', parseFloat(e.target.value) || 1)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isLoading}>
              {isLoading
                ? editMode ? 'Actualizando...' : 'Creando...'
                : editMode ? 'Actualizar Evento' : 'Crear Evento'}
            </button>

            {editMode && (
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-3"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* Lista de eventos */}
        <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-primary mb-4 text-center">Eventos Existentes</h2>

          {listaEventos.length === 0 ? (
            <p className="text-center text-muted">No hay eventos registrados!</p>
          ) : (
            <div className="list-group">
              {listaEventos.map((ev) => (
                <div key={ev._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                  <h5 className="mb-1"><strong>Hotel:</strong> {typeof ev.hotel === 'object' ? ev.hotel.name : ev.hotel}</h5>
                  <p className="mb-1"><strong>Tipo de sala:</strong> {ev.tipoSala}</p>
                  <p className="mb-1"><strong>Número de salas:</strong> {ev.numeroSalas}</p>
                  <p className="mb-0 fw-semibold">Precio: ${ev.precio.toFixed(2)}</p>
                  <button className="btn btn-sm btn-outline-primary mt-2 me-2" onClick={() => handleEdit(ev)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDeleteEvento(ev._id)} disabled={isLoading}>Eliminar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventosPage;