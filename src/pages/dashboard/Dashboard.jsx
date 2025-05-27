import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from '../../components/navbars/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import './dashboard.css';

export const DashboardPages = () => {
  return (
    <>
      <Navbar />

      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div id="hotelCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100"
                alt="Hotel 1"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpaperswide.com/download/luxury_hotel-wallpaper-1920x1080.jpg"
                className="d-block w-100"
                alt="Hotel 2"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://s1.1zoom.me/b5050/744/330559-moril_1920x1080.jpg"
                className="d-block w-100"
                alt="Hotel 3"
                style={{ height: '100vh', objectFit: 'cover' }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#hotelCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#hotelCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Bienvenido a Hoteleria Blind
          </Typography>
          <Typography variant="h6">
            Sistema de Gestión Hotelera con las mejores experiencias de Guatemala
          </Typography>
        </motion.div>
      </Box>
    </>
  );
};
