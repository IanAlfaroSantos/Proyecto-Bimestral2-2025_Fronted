import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '../../components/navbars/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './dashboard.css';
import { Carousel } from 'bootstrap';


export const DashboardPages = () => {
  useEffect(() => {
    const carousel = new Carousel('#hotelCarousel', {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover'
    });

    return () => carousel.dispose();
  }, []);
  return (
    <>
      <Navbar />

      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div id="hotelCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#hotelCarousel" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                className="d-block w-100 carousel-image"
                alt="Luxury Hotel"
              />
              <div className="carousel-caption d-none d-md-block">
                <Typography variant="h5" className="caption-title">
                  Experiencia de Lujo
                </Typography>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://wallpaperswide.com/download/luxury_hotel-wallpaper-1920x1080.jpg"
                className="d-block w-100 carousel-image"
                alt="Hotel Suite"
              />
              <div className="carousel-caption d-none d-md-block">
                <Typography variant="h5" className="caption-title">
                  Suites Exclusivas
                </Typography>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://s1.1zoom.me/b5050/744/330559-moril_1920x1080.jpg"
                className="d-block w-100 carousel-image"
                alt="Hotel View"
              />
              <div className="carousel-caption d-none d-md-block">
                <Typography variant="h5" className="caption-title">
                  Vistas Impresionantes
                </Typography>
              </div>
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
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="hero-content"
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              textShadow: '1px 2px 4px rgba(0, 37, 249, 0.8)',
              fontSize: { xs: '3.5rem', md: '3.2rem' }
            }}
            className="hero-title"
          >
            Bienvenido a Hoteleria Blind
          </Typography>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textShadow: '1px 1px 4px rgba(0, 42, 255, 0.8)',
                fontSize: { xs: '1rem', md: '1.2rem' }
              }}
            >
              Sistema de Gestión Hotelera con las mejores experiencias de Guatemala
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="black"
                size="large"
                href="https://omnibees.com/es/marketing-pt/sistema-de-gestion-hotelera-por-que-necesitas-uno/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 20px rgba(5, 5, 5, 0.3)'
                }}

              >
                Descubre Más

              </Button>

            </motion.div>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="info-box"
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            ¿Qué es un Sistema de Gestión Hotelera?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px' }}>
            Es una solución integral que automatiza y optimiza todas las operaciones de un hotel, desde reservaciones
            y check-in hasta gestión de habitaciones, facturación y análisis de datos, proporcionando una experiencia
            excepcional tanto para huéspedes como para administradores.
          </Typography>
        </motion.div>
      </Box>
    </>
  );
};
