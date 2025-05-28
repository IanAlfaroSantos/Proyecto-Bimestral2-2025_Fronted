import { useEffect, useState } from 'react';
import { useReservaciones } from '../../shared/hooks/useReservacion';
import Navbar from '../navbars/Navbar.jsx';
import AddFacturaModal from '../Facturas/AddFacturaModal';

const ReservacionesByUser = () => {
    const { handleGetReservaciones, listaReservaciones, isLoading } = useReservaciones();
    const [facturaReservacionId, setFacturaReservacionId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    const usuarioLogueadoUsername = user?.username;

    useEffect(() => {
        handleGetReservaciones();
    }, [])

    const reservacionesUsuario = listaReservaciones.filter((res) => {
        return res.nombreUsuario?.username === usuarioLogueadoUsername;
    })

    const handleGenerarFactura = (id) => {
        setFacturaReservacionId(id);
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center gap-4">
                    <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <h2 className="text-primary mb-4 text-center">📋 Reservaciones Existentes</h2>

                        {isLoading && reservacionesUsuario.length === 0 ? (
                            <div className="d-flex justify-content-center py-5">
                                <div className="spinner-border text-primary" role="status" />
                            </div>
                        ) : reservacionesUsuario.length === 0 ? (
                            <p className="text-center text-muted">🚫 No tienes reservaciones registradas!</p>
                        ) : (
                            <div className="list-group">
                                {reservacionesUsuario.map((res) => (
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

export default ReservacionesByUser;
