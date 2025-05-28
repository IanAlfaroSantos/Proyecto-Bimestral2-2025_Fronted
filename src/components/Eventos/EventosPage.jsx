import { useState, useEffect } from 'react';
import { useEventos } from '../../shared/hooks/useEvento';
import { validateEvento } from '../../shared/validators/validateEvent';
import Navbar from '../navbars/Navbar.jsx';

const eventoInicial = {
  hotel: '',
  tipoSala: '',
  numeroSalas: 1,
  precio: 1,
};

const EventosPage = () => {
  const { handlePostEvento, handleGetEventos, handleUpdateEvento, handleDeleteEvento, isLoading, success, listaEventos } = useEventos();

  const [eventoData, setEventoData] = useState(eventoInicial);
  const [formErrors, setFormErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    handleGetEventos();
  }, []);

  useEffect(() => {
    if (success) setTimeout(() => window.location.reload(), 1500);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateEvento(eventoData);
    if (Object.keys(errors).length) return setFormErrors(errors);
    setFormErrors({});
    if (editMode) await handleUpdateEvento(editingId, eventoData);
    else await handlePostEvento(eventoData);
  };

  const onChange = (field, value) => {
    setEventoData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleEdit = ({ _id, hotel, tipoSala, numeroSalas, precio }) => {
    setEditMode(true);
    setEditingId(_id);
    setEventoData({
      hotel: typeof hotel === 'object' ? hotel.name : hotel,
      tipoSala,
      numeroSalas,
      precio,
    });
    setFormErrors({});
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingId(null);
    setEventoData(eventoInicial);
    setFormErrors({});
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center gap-4">
          <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
            <h2 className="text-center text-primary mb-4">
              {editMode ? '✏️ Editar Evento' : '🎉 Crear Nuevo Evento'}
            </h2>

            <form onSubmit={handleSubmit}>
              {[
                { label: '🏨 Hotel', field: 'hotel', type: 'text', placeholder: 'Ejemplo: Hotel Paraíso', readOnly: editMode },
                { label: '🛋️ Número de Salas', field: 'numeroSalas', type: 'number', min: 1 },
                { label: '💲 Precio', field: 'precio', type: 'number', min: 0.01, step: 0.01 },
              ].map(({ label, field, ...props }) => (
                <div className="mb-3" key={field}>
                  <label className="form-label fw-semibold">{label}</label>
                  <input
                    className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                    value={eventoData[field]}
                    onChange={e => onChange(field, props.type === 'number' ? parseFloat(e.target.value) || 1 : e.target.value)}
                    {...props}
                  />
                  {formErrors[field] && <div className="invalid-feedback">{formErrors[field]}</div>}
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label fw-semibold">🖼️ Imagen (URL)</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.imagen ? 'is-invalid' : ''}`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={eventoData.imagen}
                  onChange={e => onChange('imagen', e.target.value)}
                />
                {formErrors.imagen && <div className="invalid-feedback">{formErrors.imagen}</div>}
              </div>


              <div className="mb-3">
                <label className="form-label fw-semibold">🎭 Tipo de Sala</label>
                <select
                  className={`form-select ${formErrors.tipoSala ? 'is-invalid' : ''}`}
                  value={eventoData.tipoSala}
                  onChange={e => onChange('tipoSala', e.target.value)}
                >
                  <option value="" disabled>Seleccione tipo de sala</option>
                  <option value="ALTA CALIDAD">ALTA CALIDAD</option>
                  <option value="MEDIA CALIDAD">MEDIA CALIDAD</option>
                  <option value="BAJA CALIDAD">BAJA CALIDAD</option>
                </select>
                {formErrors.tipoSala && <div className="invalid-feedback">{formErrors.tipoSala}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-pill" disabled={isLoading}>
                {isLoading
                  ? editMode ? '🔄 Actualizando...' : '⏳ Creando...'
                  : editMode ? '✅ Actualizar Evento' : '🚀 Crear Evento'}
              </button>

              {editMode && (
                <button
                  type="button"
                  className="btn btn-secondary w-100 rounded-pill mt-3"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  ❌ Cancelar
                </button>
              )}
            </form>
          </div>

          <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-primary mb-4 text-center">📋 Eventos Existentes</h2>

            {listaEventos.length === 0 ? (
              <p className="text-center text-muted">🚫 No hay eventos registrados!</p>
            ) : (
              <div className="list-group">
                {listaEventos.map(ev => (
                  <div key={ev._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                    <h5 className="mb-1"><strong>🏨 Hotel:</strong> {ev.hotel?.name || ev.hotel}</h5>
                    <p className="mb-1"><strong>🎭 Tipo de sala:</strong> {ev.tipoSala}</p>
                    <p className="mb-1"><strong>🛋️ Número de salas:</strong> {ev.numeroSalas}</p>
                    <p className="mb-0 fw-semibold">💲 Precio: ${ev.precio.toFixed(2)}</p>
                    <button className="btn btn-sm btn-outline-primary mt-2 me-2" onClick={() => handleEdit(ev)} disabled={isLoading}>
                      ✏️ Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDeleteEvento(ev._id)} disabled={isLoading}>
                      🗑️ Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventosPage