import Navbar from '../navbars/Navbar';
import { useEffect, useState } from 'react';
import { useFacturas } from '../../shared/hooks/useFacturas';
import './factura.css'
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  AttachMoney as MoneyIcon,
  Event as DateIcon,
  Hotel as HotelIcon,
  MeetingRoom as RoomIcon,
  Event as EventIcon,
  Receipt as ReceiptIcon,
  ExpandMore as ExpandMoreIcon,
  Business as BusinessIcon,
  LocalActivity as ActivityIcon,
  HourglassEmpty as SpinnerIcon,
  FolderSpecial as EmptyIcon
} from '@mui/icons-material';

const FacturasPage = () => {
    const { handleGetFacturas,handleGetFacturaByUser, facturas, isLoading } = useFacturas();
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const userRole = userData?.user?.role;

            if (userRole === 'USER') {
            handleGetFacturaByUser();
        } else {
            handleGetFacturas();
        }
    } catch (error) {
        console.error('Error al obtener rol de usuario:', error);
        handleGetFacturaByUser();
    }
    }, []);




  const toggleDetalle = (id) => {
    setFacturaSeleccionada(prev => (prev === id ? null : id));
  };

  return (
    <div className="facturas-container">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 facturas-card p-4">
            <h2 className="text-primary text-center mb-4 facturas-title">
              <ReceiptIcon style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '10px' }} />
              Facturas
            </h2>

            {isLoading && facturas.length === 0 ? (
              <div className="d-flex justify-content-center py-5 spinner-container">
                <div className="text-primary" style={{ fontSize: '3rem' }}>
                  <SpinnerIcon style={{ fontSize: 'inherit', animation: 'spin 1.5s linear infinite' }} />
                </div>
              </div>
            ) : facturas.length === 0 ? (
              <div className="empty-state">
                <EmptyIcon className="empty-state-icon" />
                <p className="h5 text-muted">No hay facturas disponibles</p>
                <p className="text-muted mt-2">Actualmente no se encontraron facturas en el sistema</p>
              </div>
            ) : (
              <div className="list-group">
                {facturas.map((fac) => (
                  <div
                    key={fac._id}
                    className={`factura-item ${facturaSeleccionada === fac._id ? 'factura-open' : ''}`}
                  >
                    <div 
                      className="factura-header"
                      onClick={() => toggleDetalle(fac._id)}
                    >
                      <div>
                        <h5 className="d-flex align-items-center">
                          <PersonIcon className="factura-icon" />
                          {fac.user?.name} {fac.user?.surname}
                        </h5>
                        <div className="d-flex align-items-center mt-2">
                          <EmailIcon className="factura-icon" />
                          <span>{fac.user?.email}</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <MoneyIcon className="factura-icon" />
                          <span className="factura-total">Q{fac.total}</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <DateIcon className="factura-icon" />
                          <span className="factura-date">
                            {new Date(fac.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="factura-arrow">
                        <ExpandMoreIcon />
                      </div>
                    </div>

                    {facturaSeleccionada === fac._id && (
                      <div className="factura-details">
                        <h6 className="factura-section-title">
                          <ReceiptIcon className="factura-icon" />
                          Detalle de la Factura
                        </h6>

                        <div className="d-flex align-items-center">
                          <BusinessIcon className="factura-icon" />
                          <strong>Reservación:</strong> 
                          <span className="ms-2">
                            {fac.reservacion?.nombreHotel?.name || 'Sin hotel'}
                          </span>
                        </div>

                        <h6 className="factura-section-title mt-4">
                          <RoomIcon className="factura-icon" />
                          Habitaciones
                        </h6>
                        <ul className="factura-list">
                          {fac.reservacion?.habitaciones?.map((hab, i) => (
                            <li key={i}>
                              {hab.type} - Q{hab.price}
                            </li>
                          ))}
                        </ul>

                        <h6 className="factura-section-title mt-4">
                          <ActivityIcon className="factura-icon" />
                          Eventos
                        </h6>
                        <ul className="factura-list">
                          {fac.reservacion?.eventos?.map((ev, i) => (
                            <li key={i}>
                              {ev.tipoSala || 'Evento sin tipo'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturasPage;
