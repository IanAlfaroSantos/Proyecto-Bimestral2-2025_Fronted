import { useEffect, useState } from 'react';
import { useInformes } from '../../shared/hooks/useInformes';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './informe.css';

const InformesPage = () => {
  const {
    demanda,
    reservaciones,
    loading,
    error,
    fetchDemandaHoteles,
    fetchReservacionesPorHotel
  } = useInformes();

  const [selectedHotel, setSelectedHotel] = useState('');

  useEffect(() => {
    fetchDemandaHoteles();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchReservacionesPorHotel(selectedHotel);
    }
  }, [selectedHotel]);

  return (
    <div className="aña">
      <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Informes Hoteleros
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Selector de Hoteles */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Seleccionar Hotel</InputLabel>
        <Select
  value={selectedHotel}
  label="Seleccionar Hotel"
  onChange={(e) => setSelectedHotel(e.target.value)}
  disabled={loading}
>
  {demanda.map((hotel) => (
    <MenuItem key={hotel.hotelId} value={hotel.hotelId}> {/* Usar hotelId */}
      {hotel.hotel}
    </MenuItem>
  ))}
</Select>
      </FormControl>

      {/* Gráfico de Demanda */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Demanda de Hoteles
          </Typography>
          {loading ? (
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demanda}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hotel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalReservaciones" fill="#1976d2" name="Reservaciones totales" />
                <Bar dataKey="habitacionesOcupadas" fill="#4caf50" name="Habitaciones ocupadas" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Detalle de Reservaciones */}
      {selectedHotel && (
  <Card sx={{ mt: 4 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Detalle de Reservaciones - {reservaciones?.hotel}
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Total de Reservaciones: {reservaciones?.totalReservaciones}
          </Typography>

          <Grid container spacing={3}>
            {reservaciones?.reservaciones?.map((reservacion, index) => (
              <Grid item xs={12} md={6} key={reservacion._id}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Reservación #{index + 1}
                  </Typography>
                  
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      <strong>Usuario:</strong> {reservacion.nombreUsuario?.name} {reservacion.nombreUsuario?.surname}
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Fecha de ocupación:</strong> {new Date(reservacion.fechaOcupacion).toLocaleDateString()}
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Estado:</strong> {reservacion.status ? 'Activa' : 'Cancelada'}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Habitaciones:</strong>
                    </Typography>
                    <ul style={{ marginTop: 4, marginBottom: 8 }}>
                      {reservacion.habitaciones?.map((habitacion, i) => (
                        <li key={i}>
                          {habitacion.type} - Q{habitacion.price}
                        </li>
                      ))}
                    </ul>
                    
                    <Typography variant="body2">
                      <strong>Eventos:</strong>
                    </Typography>
                    <ul style={{ marginTop: 4 }}>
                      {reservacion.eventos?.map((evento, i) => (
                        <li key={i}>
                          {evento.tipoSala} - Q{evento.precio}
                        </li>
                      ))}
                      {reservacion.eventos?.length === 0 && <li>Sin eventos</li>}
                    </ul>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </CardContent>
  </Card>
)}
    </Box>
    </div>
  );
};

export default InformesPage;