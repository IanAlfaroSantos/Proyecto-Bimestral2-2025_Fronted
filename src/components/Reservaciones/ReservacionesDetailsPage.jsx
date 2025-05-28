import { useState } from 'react';
import { useReservacionDetails } from '../../shared/hooks/useReservacionDetails';
import Navbar from '../navbars/Navbar.jsx';

const ReservacionesDetailsPage = () => {
    const [hotelInput, setHotelInput] = useState('');
    const [hotelBuscado, setHotelBuscado] = useState('');
    const [filtrarUsuarios, setFiltrarUsuarios] = useState(false);
    const { reservaciones, loading, error } = useReservacionDetails(hotelBuscado);

    const handleSubmit = (e) => {
        e.preventDefault();
        setHotelBuscado(hotelInput.trim());
    };

    const handleClear = () => {
        setHotelInput('');
        setHotelBuscado('');
    };

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center gap-4">
                    <div className="col-md-5 col-lg-4 bg-white rounded-4 shadow p-4">
                        <h2 className="text-center text-primary mb-4">🔍 Buscar Reservaciones</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">🏨 Nombre del Hotel</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ejemplo: Hotel Paraíso"
                                    value={hotelInput}
                                    onChange={(e) => setHotelInput(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 rounded-pill"
                                    disabled={loading || !hotelInput.trim()}
                                >
                                    {loading ? '⏳ Buscando...' : '🔍 Buscar'}
                                </button>

                                {hotelBuscado && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary rounded-pill"
                                        onClick={handleClear}
                                        disabled={loading}
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <h2 className="text-primary mb-4 text-center">📋 Reservaciones</h2>

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="filtrarUsuarios"
                                checked={filtrarUsuarios}
                                onChange={(e) => setFiltrarUsuarios(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="filtrarUsuarios">
                                Mostrar solo datos del usuario
                            </label>
                        </div>

                        {error && <p className="text-danger text-center">{error}</p>}

                        {!loading && reservaciones.length === 0 && (
                            <p className="text-center text-muted">
                                🚫 No hay reservaciones{hotelBuscado ? ' para este hotel' : ''}.
                            </p>
                        )}

                        {loading ? (
                            <p className="text-center">Cargando reservaciones...</p>
                        ) : (
                            <div className="list-group">
                                {reservaciones.map((res) => (
                                    <div key={res._id} className="list-group-item rounded-3 mb-3 shadow-sm">
                                        <p className="mb-1">
                                            <strong>👤 Usuario:</strong>{' '}
                                            {res.nombreUsuario
                                                ? `${res.nombreUsuario.name} ${res.nombreUsuario.surname}`
                                                : 'N/A'}
                                        </p>
                                        <p className="mb-1">
                                            <strong>✉️ Email:</strong> {res.nombreUsuario?.email || 'N/A'}
                                        </p>
                                        <p className="mb-1">
                                            <strong>📞 Teléfono:</strong> {res.nombreUsuario?.phone || 'N/A'}
                                        </p>

                                        {!filtrarUsuarios && (
                                            <>
                                                <h5 className="mb-1">
                                                    <strong>🏨 Hotel:</strong> {res.nombreHotel?.name || 'N/A'}
                                                </h5>
                                                <p className="mb-1">
                                                    <strong>🛏️ Habitaciones:</strong>{' '}
                                                    {res.habitaciones?.length
                                                        ? res.habitaciones.map((h) => h.type).join(', ')
                                                        : 'No hay habitaciones'}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>🎭 Eventos:</strong>{' '}
                                                    {res.eventos?.length
                                                        ? res.eventos.map((e) => e.tipoSala).join(', ')
                                                        : 'No hay eventos'}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>📅 Fecha Ocupación:</strong>{' '}
                                                    {res.fechaOcupacion
                                                        ? new Date(res.fechaOcupacion).toLocaleDateString()
                                                        : 'N/A'}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>📅 Fecha Desocupación:</strong>{' '}
                                                    {res.fechaDesocupacion
                                                        ? new Date(res.fechaDesocupacion).toLocaleDateString()
                                                        : 'N/A'}
                                                </p>
                                            </>
                                        )}
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

export default ReservacionesDetailsPage;