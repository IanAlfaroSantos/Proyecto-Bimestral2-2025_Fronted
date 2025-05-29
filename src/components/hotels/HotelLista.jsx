import React, { useEffect } from 'react';
import Navbar from '../navbars/Navbar';
import { useHotel } from '../../shared/hooks';
import {
    Hotel as HotelIcon,
    LocationOn as LocationIcon,
    Star as StarIcon,
    MeetingRoom as RoomIcon,
    Bed as BedIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon
} from '@mui/icons-material';
import './hotelLista.css';

const HotelLista = () => {
    const { hoteles, isLoading, error, getHoteles } = useHotel();

    useEffect(() => {
        getHoteles();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container my-4">
                <h2 className="mb-4 text-center fw-bold text-primary title-underline">🏨 Hoteles Disponibles</h2>

                <div className="row g-4">
                    {hoteles.map((hotel, index) => (
                        <div className="col-md-6 col-lg-4" key={hotel._id}>
                            <div className={`hotel-card animated-card delay-${index % 3}`}>
                                <div className="image-container">
                                    <img
                                        src={hotel.imagen}
                                        className="hotel-image"
                                        alt={`Imagen de ${hotel.name}`}
                                    />
                                    <div className="gradient-overlay" />
                                    <span className="categoria-badge">
                                        <StarIcon className="star-icon" />
                                        <span>{hotel.categoria}</span>
                                    </span>
                                </div>

                                <div className="card-content">
                                    <h3 className="hotel-title">
                                        <HotelIcon className="icon" /> {hotel.name}
                                    </h3>

                                    <div className="hotel-info">
                                        <p className="info-item">
                                            <LocationIcon className="icon text-danger" />
                                            <span>{hotel.direccion}</span>
                                        </p>

                                        <div className="disponibilidad-container">
                                            <div className="disponibilidad-item">
                                                <BedIcon className="icon" />
                                                <span>{hotel.habitacionesDisponibles}</span>
                                                <small>Habitaciones</small>
                                            </div>
                                            <div className="disponibilidad-item">
                                                <RoomIcon className="icon" />
                                                <span>{hotel.salasDisponibles}</span>
                                                <small>Salas</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`status-alert ${hotel.status ? 'active' : 'inactive'}`}>
                                        {hotel.status ? (
                                            <>
                                                <ActiveIcon className="pulse-icon" />
                                                <span>Activo</span>
                                            </>
                                        ) : (
                                            <>
                                                <InactiveIcon className="pulse-icon" />
                                                <span>Inactivo</span>
                                            </>
                                        )}
                                    </div>

                                    <div className="card-footer">
                                        <small>Actualizado: {new Date(hotel.updatedAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hoteles.length === 0 && !isLoading && (
                    <div className="no-hoteles">
                        <div className="empty-state">
                            <HotelIcon className="empty-icon" />
                            <h3>No hay hoteles disponibles</h3>
                            <p>Intenta más tarde o verifica tus filtros</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelLista;