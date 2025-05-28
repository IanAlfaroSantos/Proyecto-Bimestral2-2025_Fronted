import React, { useEffect } from 'react';
import { useEventos } from '../../shared/hooks';
import Navbar from '../navbars/Navbar';
import {
    Hotel as HotelIcon,
    MeetingRoom as RoomIcon,
    AttachMoney as MoneyIcon,
    LocationOn as LocationIcon,
    Star as StarIcon,
    ContentCopy as CopyIcon,
    Fingerprint as IdIcon
} from '@mui/icons-material';
import './evento.css';

const EventoLista = () => {
    const { listaEventos, isLoading, error, handleGetEventos } = useEventos();

    useEffect(() => {
        handleGetEventos();
    }, []);

    
    const eventosDisponibles = listaEventos.filter(evento => evento.status && evento.hotel);

    const copiarId = (id) => {
        navigator.clipboard.writeText(id);
        const button = document.getElementById(`copy-btn-${id}`);
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 2000);
    };

    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="container my-4">
                <h2 className="mb-4 text-center fw-bold text-primary title-underline">🎉 Eventos Disponibles</h2>

                {eventosDisponibles.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <h4 className="text-muted">No hay eventos disponibles por el momento 😔</h4>
                    </div>
                ) : (
                    <div className="row g-4">
                        {eventosDisponibles.map(evento => (
                            <div className="col-md-6 col-lg-4" key={evento._id}>
                                <div className="card evento-card h-100">
                                    <img
                                        src={evento.imagen}
                                        className="card-img-top evento-img"
                                        alt={`Imagen de ${evento.hotel.name}`}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <HotelIcon className="icon text-primary" /> {evento.hotel.name}
                                        </h5>
                                        <p className="card-text">
                                            <RoomIcon className="icon text-success" /> Tipo Sala: <strong>{evento.tipoSala}</strong>
                                        </p>
                                        <p className="card-text">
                                            <MoneyIcon className="icon text-warning" /> Precio: Q{evento.precio}
                                        </p>
                                        <div className="d-flex align-items-center mt-2">
                                            <IdIcon className="icon text-secondary" />
                                            <span className="me-2 small text-muted">{evento._id}</span>
                                            <button
                                                id={`copy-btn-${evento._id}`}
                                                className="btn btn-outline-secondary btn-sm ms-auto btn-copy"
                                                onClick={() => copiarId(evento._id)}
                                            >
                                                <CopyIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white text-muted d-flex justify-content-between align-items-center small">
                                        <span><LocationIcon fontSize="small" /> {evento.hotel.direccion}</span>
                                        <span>
                                            {[...Array(evento.hotel.categoria)].map((_, i) => (
                                                <StarIcon key={i} className="text-warning" fontSize="small" />
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventoLista;
