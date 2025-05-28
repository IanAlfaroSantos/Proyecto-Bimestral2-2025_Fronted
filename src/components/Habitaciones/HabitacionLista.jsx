import React, { useEffect } from 'react';
import Navbar from '../navbars/Navbar';
import { useHabitacion } from '../../shared/hooks/useHabitacion.jsx';
import Swal from 'sweetalert2';
import { Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import './habitacionesList.css'

const HabitacionesList = () => {
    const { habitaciones, handleGetHabitaciones } = useHabitacion();

    useEffect(() => {
        handleGetHabitaciones();
    }, []);

      const copiarAlPortapapeles = (id) => {
        navigator.clipboard.writeText(id).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'ID Copiado!',
                showConfirmButton: false,
                timer: 1500,
                background: '#4CAF50',
                color: 'white',
                customClass: {
                    popup: 'swal-custom'
                }
            });
        });
    };

   return (
        <div className="habitaciones-container">
            <Navbar />
            <div className="habitaciones-content">
                <h2 className="section-title animate__animated animate__fadeInDown">🛏️ Habitaciones Disponibles</h2>
                <div className="habitaciones-grid">
                    {habitaciones.map((room, index) => (
                        <div 
                            className={`habitacion-card animate__animated animate__fadeInUp delay-${index % 3}`} 
                            key={room.uid}
                        >
                            <div className="card-inner">
                                <div className="image-container">
                                    <img
                                        src={room.imagen}
                                        alt="Imagen habitación"
                                        className="habitacion-image"
                                    />
                                    <div className="image-overlay" />
                                </div>
                                
                                <div className="card-details">
                                    <h3 className="hotel-name">
                                        {room.hotel?.name.toUpperCase()} 
                                        <span className="room-type">{room.type.toUpperCase()}</span>
                                    </h3>
                                    
                                    <div className="room-info">
                                        <div className="info-item">
                                            <span className="info-label">Precio: </span>
                                            <span className="info-value">Q{room.price}</span>
                                        </div>
                                        <div className="info-row">
                                            <div className="info-item">
                                                <span className="info-label">Total:</span>
                                                <span className="info-value"> {room.quantity}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Agregadas:</span>
                                                <span className="info-value text-success">{room.addQuantity}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Removidas:</span>
                                                <span className="info-value text-danger">{room.removeQuantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer">
                                        <div className="id-container">
                                            <span className="room-id">ID: {room.uid}</span>
                                            <Tooltip title="Copiar ID">
                                                <IconButton 
                                                    className="copy-button" 
                                                    onClick={() => copiarAlPortapapeles(room._id)}
                                                >
                                                    <ContentCopyIcon className="copy-icon" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        
                                        <div className="status-badge">
                                            {room.quantity > 0 ? (
                                                <span className="available">
                                                    <CheckCircleIcon className="status-icon" />
                                                    Disponible
                                                </span>
                                            ) : (
                                                <span className="not-available">
                                                    <HourglassEmptyIcon className="status-icon" />
                                                    No disponible
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="creation-date">
                                            <small>Creado: {new Date(room.createdAt).toLocaleString()}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HabitacionesList;
