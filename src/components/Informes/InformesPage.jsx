import { useEffect, useState } from 'react';
import { useInformes } from '../../shared/hooks/useInformes';
import Navbar from '../navbars/Navbar';
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
import {
  Hotel as HotelIcon,
  Assessment as ChartIcon,
  ListAlt as DetailsIcon,
  Person as PersonIcon,
  CalendarToday as DateIcon,
  CheckCircle as ActiveIcon,
  Cancel as CancelIcon,
  KingBed as BedIcon,
  Event as EventIcon,
  EmojiPeople as PeopleIcon,
  MonetizationOn as MoneyIcon,
  Info as EmptyIcon
} from '@mui/icons-material';
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
  <div className="informes-container">
    <Navbar />
    <Box sx={{ p: 3 }}>
      <div className="title-container">
        <Typography variant="h4" gutterBottom >
          <ChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'primary.main' }} />
          Informes Hoteleros
        </Typography>
      </div>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Selector de Hoteles */}
      <FormControl fullWidth sx={{ mb: 4 }} className="hotel-selector">
        <InputLabel>
          <HotelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Seleccionar Hotel
        </InputLabel>
        <Select
          value={selectedHotel}
          label="Seleccionar Hotel"
          onChange={(e) => setSelectedHotel(e.target.value)}
          disabled={loading}
        >
          {demanda.map((hotel) => (
            <MenuItem key={hotel.hotelId} value={hotel.hotelId}>
              <HotelIcon sx={{ mr: 1, color: 'action.active' }} />
              {hotel.hotel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Gráfico de Demanda */}
      <Card className="chart-card" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <ChartIcon color="primary" sx={{ mr: 1 }} />
            Demanda de Hoteles
          </Typography>
          {loading ? (
            <div className="loading-container">
              <CircularProgress size={60} />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demanda}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hotel" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    background: '#fff',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="totalReservaciones" 
                  fill="#1976d2" 
                  name="Reservaciones totales" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="habitacionesOcupadas" 
                  fill="#4caf50" 
                  name="Habitaciones ocupadas" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Detalle de Reservaciones */}
      {selectedHotel && (
        <Card className="detail-card" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <DetailsIcon color="primary" sx={{ mr: 1 }} />
              Detalle de Reservaciones - {reservaciones?.hotel}
            </Typography>
            
            {loading ? (
              <div className="loading-container">
                <CircularProgress size={60} />
              </div>
            ) : (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <HotelIcon color="action" sx={{ mr: 1 }} />
                  Total de Reservaciones: {reservaciones?.totalReservaciones}
                </Typography>

                <Grid container spacing={3}>
                  {reservaciones?.reservaciones?.map((reservacion, index) => (
                    <Grid item xs={12} md={6} key={reservacion._id} className="reservacion-item">
                      <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                        <div className="reservacion-header">
                          <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <PeopleIcon className="reservacion-icon" />
                            Reservación #{index + 1}
                          </Typography>
                        </div>
                        
                        <Box sx={{ mt: 1 }}>
                          <div className="detail-item">
                            <PersonIcon className="detail-icon" />
                            <Typography variant="body2">
                              <strong>Usuario:</strong> {reservacion.nombreUsuario?.name} {reservacion.nombreUsuario?.surname}
                            </Typography>
                          </div>
                          
                          <div className="detail-item">
                            <DateIcon className="detail-icon" />
                            <Typography variant="body2">
                              <strong>Fecha de ocupación:</strong> {new Date(reservacion.fechaOcupacion).toLocaleDateString()}
                            </Typography>
                          </div>
                          
                          <div className="detail-item">
                            {reservacion.status ? (
                              <ActiveIcon className="detail-icon" color="success" />
                            ) : (
                              <CancelIcon className="detail-icon" color="error" />
                            )}
                            <Typography variant="body2">
                              <strong>Estado:</strong> 
                              <span style={{ color: reservacion.status ? '#4caf50' : '#f44336', marginLeft: '4px' }}>
                                {reservacion.status ? 'Activa' : 'Cancelada'}
                              </span>
                            </Typography>
                          </div>
                          
                          <div className="detail-item">
                            <BedIcon className="detail-icon" />
                            <Typography variant="body2">
                              <strong>Habitaciones:</strong>
                            </Typography>
                          </div>
                          <ul className="habitaciones-list">
                            {reservacion.habitaciones?.map((habitacion, i) => (
                              <li key={i} className="list-item">
                                <PeopleIcon className="list-icon" />
                                <span>
                                  {habitacion.type} - <MoneyIcon fontSize="small" sx={{ verticalAlign: 'text-bottom' }} /> Q{habitacion.price}
                                </span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="detail-item">
                            <EventIcon className="detail-icon" />
                            <Typography variant="body2">
                              <strong>Eventos:</strong>
                            </Typography>
                          </div>
                          <ul className="eventos-list">
                            {reservacion.eventos?.map((evento, i) => (
                              <li key={i} className="list-item">
                                <EventIcon className="list-icon" />
                                <span>
                                  {evento.tipoSala} - <MoneyIcon fontSize="small" sx={{ verticalAlign: 'text-bottom' }} /> Q{evento.precio}
                                </span>
                              </li>
                            ))}
                            {reservacion.eventos?.length === 0 && (
                              <li className="list-item">
                                <EmptyIcon className="list-icon" />
                                <span>Sin eventos</span>
                              </li>
                            )}
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