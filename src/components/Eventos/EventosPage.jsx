import { useState, useEffect } from 'react';
import { useEventos } from '../../shared/hooks/useEvento';

const EventosPage = () => {
  const { handlePostEvento, handleGetEventos, isLoading, error, success, listaEventos } = useEventos();

  const [eventoData, setEventoData] = useState({
    hotel: '',
    tipoSala: '',
    numeroSalas: 1,
    precio: 1,
  });

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
    await handlePostEvento(eventoData);
  };

  const onChange = (field, value) => {
    setEventoData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center gap-4">
        <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
          <h2 className="text-center text-primary mb-4">Crear Nuevo Evento</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="hotel" className="form-label fw-semibold">Nombre del Hotel</label>
              <input
                type="text"
                id="hotel"
                className="form-control"
                required
                value={eventoData.hotel}
                onChange={e => onChange('hotel', e.target.value)}
                placeholder="Ejemplo: Hotel Paraíso"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoSala" className="form-label fw-semibold">Tipo de Sala</label>
              <select
                id="tipoSala"
                className="form-select"
                required
                value={eventoData.tipoSala}
                onChange={e => onChange('tipoSala', e.target.value)}
              >
                <option value="" disabled>Seleccione tipo de sala</option>
                <option value="ALTA CALIDAD">ALTA CALIDAD</option>
                <option value="MEDIA CALIDAD">MEDIA CALIDAD</option>
                <option value="BAJA CALIDAD">BAJA CALIDAD</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="numeroSalas" className="form-label fw-semibold">Número de Salas</label>
              <input
                type="number"
                id="numeroSalas"
                min={1}
                className="form-control"
                required
                value={eventoData.numeroSalas}
                onChange={e => onChange('numeroSalas', parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label fw-semibold">Precio</label>
              <input
                type="number"
                id="precio"
                step="0.01"
                min={0.01}
                className="form-control"
                required
                value={eventoData.precio}
                onChange={e => onChange('precio', parseFloat(e.target.value) || 1)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill"
              disabled={isLoading}
            >
              {isLoading ? 'Creando...' : 'Crear Evento'}
            </button>
          </form>

          {success && (
            <div className="alert alert-success mt-3 text-center">
              Evento creado con éxito!
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3 text-center">
              Error: {error}
            </div>
          )}
        </div>

        <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-primary mb-4 text-center">Eventos Existentes</h2>

          {listaEventos.length === 0 ? (
            <p className="text-center text-muted">No hay eventos registrados!</p>
          ) : (
            <div className="list-group">
              {listaEventos.map(ev => (
                <div key={ev._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                  <h5 className="mb-1">{typeof ev.hotel === 'object' ? ev.hotel.name : ev.hotel}</h5>
                  <p className="mb-1"><strong>Tipo de sala:</strong> {ev.tipoSala}</p>
                  <p className="mb-1"><strong>Número de salas:</strong> {ev.numeroSalas}</p>
                  <p className="mb-0 fw-semibold">Precio: ${ev.precio.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventosPage;