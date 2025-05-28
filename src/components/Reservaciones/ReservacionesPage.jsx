import { useEffect, useState } from 'react';
import { useReservaciones } from '../../shared/hooks/useReservacion';
import Navbar from '../navbars/Navbar.jsx';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Hotel as HotelIcon,
  KingBed as BedIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  EmojiPeople as PeopleIcon,
  MonetizationOn as MoneyIcon,
  HighlightOff as EmptyIcon
} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import './page.css'

const ReservacionesPage = () => {
  const { handleGetReservaciones, listaReservaciones, isLoading } = useReservaciones();


  useEffect(() => {
    handleGetReservaciones();
  }, []);

  

   return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center gap-4">
          <div className="col-md-6 col-lg-7 bg-white rounded-4 shadow p-4 reservaciones-container">
            <div className="title-container">
              <h2 className="text-primary mb-4 text-center pulse-animation">
                Reservaciones Existentes
              </h2>
            </div>

            {isLoading && listaReservaciones.length === 0 ? (
              <div className="loading-state">
                <CircularProgress color="primary" size={60} />
              </div>
            ) : listaReservaciones.length === 0 ? (
              <div className="empty-state">
                <EmptyIcon className="empty-icon" />
                <p className="text-muted">No hay reservaciones registradas</p>
              </div>
            ) : (
              <div className="list-group">
                {listaReservaciones.map((res) => (
                  <div key={res._id} className="list-group-item reservacion-card">
                    <div className="reservacion-header">
                      <h5 style={{ fontWeight: 600 }}>
                        <PersonIcon className="detail-icon" />
                        {res.nombreUsuario?.name} {res.nombreUsuario?.surname}
                      </h5>
                    </div>
                    
                    <div className="reservacion-body">
                      <div className="reservacion-detail">
                        <EmailIcon className="detail-icon" />
                        <div className="detail-content">
                          <strong>Email:</strong> {res.nombreUsuario?.email}
                        </div>
                      </div>
                      
                      <div className="reservacion-detail">
                        <HotelIcon className="detail-icon" />
                        <div className="detail-content">
                          <strong>Hotel:</strong> {res.nombreHotel?.name}
                        </div>
                      </div>
                      
                      <div className="reservacion-detail">
                        <BedIcon className="detail-icon" />
                        <div className="detail-content">
                          <strong>Habitaciones:</strong>
                        </div>
                      </div>
                      
                      <div className="habitaciones-list">
                        {res.habitaciones.map((hab, i) => (
                          <div key={i} className="list-item">
                            <PeopleIcon className="list-icon" fontSize="small" />
                            <span>
                              {hab.type} - <MoneyIcon fontSize="small" /> Q{hab.price}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="reservacion-detail">
                        <EventIcon className="detail-icon" />
                        <div className="detail-content">
                          <strong>Eventos:</strong>
                        </div>
                      </div>
                      
                      <div className="eventos-list">
                        {res.eventos.map((ev, i) => (
                          <div key={i} className="list-item">
                            <EventIcon className="list-icon" fontSize="small" />
                            <span>{ev.tipoSala || 'Evento sin tipo'}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="reservacion-detail">
                        <TimeIcon className="detail-icon" />
                        <div className="detail-content">
                          <strong>Fecha de Ocupación:</strong> {new Date(res.fechaOcupacion).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservacionesPage;