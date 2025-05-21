import { useState, useEffect } from 'react';
import { useEventos } from '../../shared/hooks/useEvento';
import './eventos.css';

const EventosPage = () => {
  const { handlePostEvento, isLoading, error, success } = useEventos();

  const [eventoData, setEventoData] = useState({
    hotel: '',
    tipoSala: '',
    numeroSalas: 1,
    precio: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePostEvento(eventoData);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => window.location.reload(), 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const onChange = (field, value) => {
    setEventoData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="arribaEvento">
      <div className="evento-page d-flex justify-content-start align-items-start mt-5 ms-5">
        <div className="card p-4 shadow rounded-4" style={{ maxWidth: 400, minWidth: 320 }}>
          <h4 className="text-center text-purple mb-4">Nuevo Evento</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Hotel</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-hotel"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del hotel"
                  required
                  value={eventoData.hotel}
                  onChange={(e) => onChange('hotel', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Sala</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-layer-group"></i>
                </span>
                <select
                  className="form-select"
                  value={eventoData.tipoSala}
                  onChange={(e) => onChange('tipoSala', e.target.value)}
                >
                  <option value="">Seleccione tipo</option>
                  <option value="ALTA CALIDAD">ALTA CALIDAD</option>
                  <option value="MEDIA CALIDAD">MEDIA CALIDAD</option>
                  <option value="BAJA CALIDAD">BAJA CALIDAD</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Salas</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-door-open"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  value={eventoData.numeroSalas}
                  onChange={(e) => onChange('numeroSalas', parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  step="0.01"
                  min={0.01}
                  value={eventoData.precio}
                  onChange={(e) => onChange('precio', parseFloat(e.target.value) || 1)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3 rounded-pill" disabled={isLoading}>
              <i className="fas fa-plus-circle me-2"></i>
              {isLoading ? 'Creando...' : 'Crear Evento'}
            </button>
          </form>

          {success && <div className="alert alert-success mt-3">Evento creado con éxito!</div>}

          {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
        </div>
      </div>
    </div>
  )
}

export default EventosPage;