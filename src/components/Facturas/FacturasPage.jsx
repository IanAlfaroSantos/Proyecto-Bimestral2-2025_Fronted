import { useEffect, useRef, useState } from 'react';
import { useFacturas } from '../../shared/hooks/useFacturas';

const FacturasPage = () => {
    const { handleGetFacturas,handleGetFacturaByUser, facturas, isLoading } = useFacturas();
    const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 bg-white rounded-4 shadow p-4">
          <h2 className="text-primary text-center mb-4">Facturas</h2>

          {isLoading && facturas.length === 0 ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : facturas.length === 0 ? (
            <p className="text-center text-muted">No hay facturas disponibles.</p>
          ) : (
            <div className="list-group">
              {facturas.map((fac) => (
                <div
                  key={fac._id}
                  className="list-group-item rounded-3 mb-3 shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleDetalle(fac._id)}
                >
                  <h5><strong>Cliente:</strong> {fac.user?.name} {fac.user?.surname}</h5>
                  <p><strong>Correo:</strong> {fac.user?.email}</p>
                  <p><strong>Total:</strong> Q{fac.total}</p>
                  <p><strong>Fecha:</strong> {new Date(fac.createdAt).toLocaleString()}</p>

                  {facturaSeleccionada === fac._id && (
                    <div className="mt-3 border-top pt-3">
                      <h6 className="text-secondary">Detalle de la Factura</h6>

                      <p><strong>Reservación:</strong> {fac.reservacion?.nombreHotel?.name || 'Sin hotel'}</p>

                      <p><strong>Habitaciones:</strong></p>
                      <ul>
                        {fac.reservacion?.habitaciones?.map((hab, i) => (
                          <li key={i}>{hab.type} - Q{hab.price}</li>
                        ))}
                      </ul>

                      <p><strong>Eventos:</strong></p>
                      <ul>
                        {fac.reservacion?.eventos?.map((ev, i) => (
                          <li key={i}>{ev.tipoSala || 'Evento sin tipo'}</li>
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
  );
};

export default FacturasPage;
