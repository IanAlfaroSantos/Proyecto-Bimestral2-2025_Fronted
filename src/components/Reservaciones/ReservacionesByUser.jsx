import { useEffect, useState } from 'react';
import { useReservaciones } from '../../shared/hooks/useReservacion';
import Navbar from '../navbars/Navbar.jsx';
import { validateReservacion } from '../../shared/validators/validateReservacion';
import AddFacturaModal from '../Facturas/AddFacturaModal';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HotelIcon from '@mui/icons-material/Hotel';
import BedIcon from '@mui/icons-material/Bed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import './reservation.css'

const ReservacionesByUser = () => {
    const { handleGetReservaciones, handlePostReservacion, listaReservaciones, isLoading, handleDeleteReservacion, handlePutReservacion } = useReservaciones();
    const [facturaReservacionId, setFacturaReservacionId] = useState(null);
      const [editId, setEditId] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ nombreHotel: '', habitaciones: '', eventos: '' });

    const user = JSON.parse(localStorage.getItem('user'));

    const usuarioLogueadoUsername = user?.username;

    useEffect(() => {
        handleGetReservaciones();
    }, [])

    const reservacionesUsuario = listaReservaciones.filter((res) => {
        return res.nombreUsuario?.username === usuarioLogueadoUsername;
    })

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
        <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4 reservation-container">
  <h2 className="text-center text-primary mb-4 reservation-title">
    {editId ? (
      <>
        <span className="form-icon">✏️</span> Editar Reservación
      </>
    ) : (
      <>
        <span className="form-icon">🆕</span> Crear Nueva Reservación
      </>
    )}
  </h2>

  <form onSubmit={handleSubmit} className="reservation-form">
    <div className="form-group">
      <label className="form-label fw-semibold">
        <span className="form-icon">🏨</span> Hotel
      </label>
      <input
        type="text"
        className={`form-control ${formErrors.nombreHotel ? 'is-invalid' : ''}`}
        value={formData.nombreHotel}
        onChange={e => handleChange('nombreHotel', e.target.value)}
        placeholder="Ejemplo: Hotel Paraíso"
      />
      {formErrors.nombreHotel && (
        <div className="invalid-feedback">
          <span>⚠️</span> {formErrors.nombreHotel}
        </div>
      )}
    </div>

    <div className="form-group">
      <label className="form-label fw-semibold">
        <span className="form-icon">🛏️</span> Habitaciones (IDs separados por comas)
      </label>
      <input
        type="text"
        className={`form-control ${formErrors.habitaciones ? 'is-invalid' : ''}`}
        value={formData.habitaciones}
        onChange={e => handleChange('habitaciones', e.target.value)}
        placeholder="Ejemplo: 60d21b4667d0d8992e610c85, 60d21b4967d0d8992e610c86"
      />
      {formErrors.habitaciones && (
        <div className="invalid-feedback">
          <span>⚠️</span> {formErrors.habitaciones}
        </div>
      )}
    </div>

    <div className="form-group">
      <label className="form-label fw-semibold">
        <span className="form-icon">🎉</span> Eventos (IDs separados por comas)
      </label>
      <input
        type="text"
        className={`form-control ${formErrors.eventos ? 'is-invalid' : ''}`}
        value={formData.eventos}
        onChange={e => handleChange('eventos', e.target.value)}
        placeholder="Ejemplo: 60d21b5267d0d8992e610c87, 60d21b5367d0d8992e610c88"
      />
      {formErrors.eventos && (
        <div className="invalid-feedback">
          <span>⚠️</span> {formErrors.eventos}
        </div>
      )}
    </div>

    <button
      type="submit"
      className="btn btn-primary w-100 reservation-btn reservation-btn-primary btn-wave-effect"
      disabled={isLoading}
    >
      {isLoading ? (
        editId ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Actualizando...
          </>
        ) : (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Creando...
          </>
        )
      ) : editId ? (
        <>
          <span className="form-icon me-1">✅</span> Actualizar Reservación
        </>
      ) : (
        <>
          <span className="form-icon me-1">🚀</span> Guardar Reservación
        </>
      )}
    </button>

    {editId && (
      <button
        type="button"
        className="btn btn-secondary w-100 reservation-btn reservation-btn-secondary mt-3 btn-wave-effect"
        onClick={resetForm}
        disabled={isLoading}
      >
        <span className="form-icon me-1">✖</span> Cancelar
      </button>
    )}
  </form>
</div>

        <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
    <h2 className="text-primary mb-4 text-center animate__animated animate__fadeIn">📋 Reservaciones Existentes</h2>

    {isLoading && reservacionesUsuario.length === 0 ? (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary loading-spinner" role="status" />
        </div>
    ) : reservacionesUsuario.length === 0 ? (
        <p className="text-center text-muted empty-state">🚫 No hay reservaciones registradas!</p>
    ) : (
        <div className="list-group">
            {reservacionesUsuario.map((res) => (
                <div key={res._id} className="list-group-item rounded-3 mb-3 shadow-sm reservacion-item">
                    <div className="reservacion-detail">
                        <h5> <PersonIcon className="icon text-primary" /> <strong>Usuario:</strong> {res.nombreUsuario?.name} {res.nombreUsuario?.surname}</h5>
                    </div>
                    <div className="reservacion-detail">
                        <p> <EmailIcon className="icon text-success" /> <strong>Email:</strong> {res.nombreUsuario?.email}</p>
                    </div>
                    <div className="reservacion-detail">
                        <p> <HotelIcon className="icon text-warning" /> <strong>Hotel:</strong> {res.nombreHotel?.name}</p>
                    </div>
                    <div className="reservacion-detail">
                        <p> <BedIcon className="icon text-warning" /> <strong>Habitaciones:</strong></p>
                        <ul className="ps-3">{res.habitaciones.map((hab, i) => <li key={i}>🛌 {hab.type} - Q{hab.price}</li>)}</ul>
                    </div>
                    <div className="reservacion-detail">
                        <p> <EventSeatIcon className="icon text-primary" /> <strong>Eventos:</strong></p>
                        <ul className="ps-3">{res.eventos.map((ev, i) => <li key={i}>🎭 {ev.tipoSala || 'Evento sin tipo'}</li>)}</ul>
                    </div>
                    <div className="reservacion-detail">
                        <p> <CalendarTodayIcon className="icon text-primary" /> <strong>Fecha de Ocupación:</strong> {new Date(res.fechaOcupacion).toLocaleString()}</p>
                    </div>
                    <div className="d-flex flex-wrap pt-2">
                        <button
                            className="btn btn-sm btn-outline-primary btn-action"
                            onClick={() => handleEdit(res)}
                            disabled={isLoading}
                        >
                            <i className="fas fa-edit me-1"></i> Editar
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger btn-action"
                            onClick={() => handleDelete(res._id)}
                            disabled={isLoading}
                        >
                            <i className="fas fa-trash-alt me-1"></i> Eliminar
                        </button>
                        <button
                            className="btn btn-sm btn-outline-success btn-action"
                            onClick={() => handleGenerarFactura(res._id)}
                            disabled={isLoading}
                        >
                            <i className="fas fa-file-invoice-dollar me-1"></i> Factura
                        </button>
                    </div>
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

export default ReservacionesByUser;
