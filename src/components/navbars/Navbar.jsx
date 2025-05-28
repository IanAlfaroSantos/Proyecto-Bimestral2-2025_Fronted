import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  keyframes
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../shared/hooks";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import EventIcon from '@mui/icons-material/Event';
import BedIcon from '@mui/icons-material/Bed';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import HotelIcon from '@mui/icons-material/Hotel';

import { useState } from "react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg,rgb(4, 4, 4) 30%,rgb(224, 124, 18) 90%)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 10s ease infinite`,
  boxShadow: '0 4px 20px rgba(9, 200, 25, 0.1)',
  borderRadius: '0 0 15px 15px'
});

const AnimatedListItem = styled(ListItemButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(10px)',
    backgroundColor: theme.palette.action.hover,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    }
  }
}));

const RotatingMenuIcon = styled(MenuIcon)(({ open }) => ({
  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease'
}));

export const Navbar = () => {
  const { isLogged, logout, user } = useUserDetails();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (path) => () => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };



  const drawerItems = [
    { text: "Habitaciones", icon: <BedIcon />, path: "/habitaciones", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Eventos", icon: <EventIcon />, path: "/eventos", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Reservaciones Existentes", icon: <ReceiptLongIcon />, path: "/reservaciones", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Facturas", icon: <ReceiptLongIcon />, path: "/facturas", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Hoteles", icon: <HotelIcon />, path: "/hoteles", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Informes", icon: <InsertChartIcon />, path: "/informes", roles: ["ADMIN_HOTEL", "ADMIN_WEB"] },
    { text: "Eventos Lista", icon: <EventIcon />, path: "/eventos-lista", roles: ["USER"] },
    { text: "Hoteles Lista", icon: <HotelIcon />, path: "/hoteles-lista", roles: ["USER"] },
    { text: "Habitaciones Lista", icon: <BedIcon />, path: "/habitaciones-lista", roles: ["USER"] },
    { text: "Reservaciones", icon: <ReceiptLongIcon />, path: "/detalleReservaciones", roles: ["ADMIN_HOTEL"] },
    { text: "Reservar", icon: <ReceiptLongIcon />, path: "/reservacionesUser", roles: ["USER"] }
  ];


  const filteredDrawerItems = drawerItems.filter((item) =>
    user?.role && item.roles.includes(user.role)
  );


  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <RotatingMenuIcon open={drawerOpen} />
            </IconButton>
            <Tooltip title="Inicio">
              <IconButton
                color="inherit"
                onClick={handleNavigate("/")}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <HomeIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {user?.role === "USER" && (
            <Tooltip title="Configuraciones">
              <IconButton
                color="inherit"
                onClick={handleNavigate("/settings")}
                sx={{
                  '&:hover': {
                    transform: 'rotate(15deg)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <SettingsIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            )}
            
            {user?.role === "ADMIN_WEB" && (
            <Tooltip title="Gestión Usuarios">
              <IconButton
                color="inherit"
                onClick={handleNavigate("/manager-users")}
                sx={{
                  '&:hover': {
                    transform: 'rotate(15deg)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                <SettingsIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            )}

            {!isLogged ? (
              <Tooltip title="Iniciar Sesión">
                <IconButton
                  color="inherit"
                  onClick={handleNavigate("/auth")}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  <LoginIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Cerrar Sesión">
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  <LogoutIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(195deg,rgb(231, 231, 231) 30%,rgb(211, 13, 255) 90%)',
            borderRadius: '0 15px 15px 0'
          }
        }}
      >
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <HotelIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <h3 style={{ margin: 0, color: '#1976d2' }}>Hotel Blind</h3>
          </Box>

          <List sx={{ py: 2 }}>
            {filteredDrawerItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <AnimatedListItem onClick={handleNavigate(item.path)}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      variant: 'body1'
                    }}
                  />
                </AnimatedListItem>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;  
