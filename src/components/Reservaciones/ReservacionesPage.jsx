import { useEffect, useState } from 'react';
import { useReservaciones } from '../../shared/hooks/useReservacion';
import { validateReservacion } from '../../shared/validators/validateReservacion';
import Navbar from '../navbars/Navbar.jsx';
import AddFacturaModal from '../Facturas/AddFacturaModal'; 

const ReservacionesPage = () => {
  const { handleGetReservaciones, handlePostReservacion, handlePutReservacion, handleDeleteReservacion, listaReservaciones, isLoading } = useReservaciones();

  const [formData, setFormData] = useState({ nombreHotel: '', habitaciones: '', eventos: '' });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [facturaReservacionId, setFacturaReservacionId] = useState(null);

  useEffect(() => {
    handleGetReservaciones();
  }, []);

  const resetForm = () => {
    setFormData({ nombreHotel: '', habitaciones: '', eventos: '' });
    setFormErrors({});
    setEditId(null);
  };

  const handleGenerarFactura = (id) => {
    setFacturaReservacionId(id);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      nombreHotel: formData.nombreHotel.trim(),
      habitaciones: formData.habitaciones.split(',').map(h => h.trim()).filter(Boolean),
      eventos: formData.eventos.split(',').map(e => e.trim()).filter(Boolean),
    };

    const errors = validateReservacion(dataToValidate);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      if (editId) await handlePutReservacion(editId, dataToValidate);
      else await handlePostReservacion(dataToValidate);
      resetForm();
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error al guardar reservación:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteReservacion(id);
      if (editId === id) resetForm();
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Error al eliminar reservación:', error);
    }
  };

  const handleEdit = (res) => {
    setFormData({
      nombreHotel: res.nombreHotel?.name || '',
      habitaciones: res.habitaciones.map(h => h._id).join(','),
      eventos: res.eventos.map(e => e._id).join(','),
    });
    setFormErrors({});
    setEditId(res._id);
  };

  return (
    <div>
    <Navbar />
    <div className="container py-5">
      <div className="row justify-content-center gap-4">
        <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
          <h2 className="text-center text-primary mb-4">
            {editId ? '✏️ Editar Reservación' : '🆕 Crear Nueva Reservación'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">🏨 Hotel</label>
              <input
                type="text"
                className={`form-control ${formErrors.nombreHotel ? 'is-invalid' : ''}`}
                value={formData.nombreHotel}
                onChange={e => handleChange('nombreHotel', e.target.value)}
                placeholder="Ejemplo: Hotel Paraíso"
              />
              {formErrors.nombreHotel && <div className="invalid-feedback">⚠️ {formErrors.nombreHotel}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">🛏️ Habitaciones (IDs separados por comas)</label>
              <input
                type="text"
                className={`form-control ${formErrors.habitaciones ? 'is-invalid' : ''}`}
                value={formData.habitaciones}
                onChange={e => handleChange('habitaciones', e.target.value)}
                placeholder="Ejemplo: 60d21b4667d0d8992e610c85, 60d21b4967d0d8992e610c86"
              />
              {formErrors.habitaciones && <div className="invalid-feedback">⚠️ {formErrors.habitaciones}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">🎉 Eventos (IDs separados por comas)</label>
              <input
                type="text"
                className={`form-control ${formErrors.eventos ? 'is-invalid' : ''}`}
                value={formData.eventos}
                onChange={e => handleChange('eventos', e.target.value)}
                placeholder="Ejemplo: 60d21b5267d0d8992e610c87, 60d21b5367d0d8992e610c88"
              />
              {formErrors.eventos && <div className="invalid-feedback">⚠️ {formErrors.eventos}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill"
              disabled={isLoading}
            >
              {isLoading
                ? editId ? '🔄 Actualizando...' : '⏳ Creando...'
                : editId ? '✅ Actualizar Reservación' : '🚀 Guardar Reservación'}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary w-100 rounded-pill mt-3"
                onClick={resetForm}
                disabled={isLoading}
              >
                ❌ Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-primary mb-4 text-center">📋 Reservaciones Existentes</h2>

          {isLoading && listaReservaciones.length === 0 ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : listaReservaciones.length === 0 ? (
            <p className="text-center text-muted">🚫 No hay reservaciones registradas!</p>
          ) : (
            <div className="list-group">
              {listaReservaciones.map((res) => (
                <div key={res._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                  <h5>👤 <strong>Usuario:</strong> {res.nombreUsuario?.name} {res.nombreUsuario?.surname}</h5>
                  <p>📧 <strong>Email:</strong> {res.nombreUsuario?.email}</p>
                  <p>🏨 <strong>Hotel:</strong> {res.nombreHotel?.name}</p>
                  <p>🛏️ <strong>Habitaciones:</strong></p>
                  <ul>{res.habitaciones.map((hab, i) => <li key={i}>🛌 {hab.type} - Q{hab.price}</li>)}</ul>
                  <p>🎉 <strong>Eventos:</strong></p>
                  <ul>{res.eventos.map((ev, i) => <li key={i}>🎭 {ev.tipoSala || 'Evento sin tipo'}</li>)}</ul>
                  <p>📅 <strong>Fecha de Ocupación:</strong> {new Date(res.fechaOcupacion).toLocaleString()}</p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(res)}
                    disabled={isLoading}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(res._id)}
                    disabled={isLoading}
                  >
                    🗑️ Eliminar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleGenerarFactura(res._id)}
                    disabled={isLoading}
                  >
                    🧾 Generar Factura
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
      {facturaReservacionId && (
        <AddFacturaModal
          reservacionId={facturaReservacionId}
          onClose={() => setFacturaReservacionId(null)}
        />
      )}
    </div>
  )
}

export default ReservacionesPage;