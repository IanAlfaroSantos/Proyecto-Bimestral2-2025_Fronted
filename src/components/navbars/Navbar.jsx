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
  ListItemText
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

export const Navbar = () => {
  const { isLogged, logout } = useUserDetails();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [habitaciones, setHabitaciones] = useState(false);

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

  // Solo para el Drawer (menú lateral)
  const drawerItems = [
    { text: "Habitaciones", icon: <BedIcon />, action: handleNavigate("/habitaciones") },
    { text: "Eventos", icon: <EventIcon />, action: handleNavigate("/eventos") },
    { text: "Reservaciones", icon: <ReceiptLongIcon />, action: handleNavigate("/reservaciones") },
    { text: "Facturas", icon: <ReceiptLongIcon />, action: handleNavigate("/facturas") },
    { text: "Hoteles", icon: <HotelIcon />, action: handleNavigate("/hoteles") },
    { text: "Informes", icon: <InsertChartIcon />, action: handleNavigate("/informes") }
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Tooltip title="Inicio">
              <IconButton color="inherit" onClick={handleNavigate("/")}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Configuraciones">
              <IconButton color="inherit" onClick={handleNavigate("/settings")}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {!isLogged ? (
              <Tooltip title="Iniciar Sesión">
                <IconButton color="inherit" onClick={handleNavigate("/auth")}>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Cerrar Sesión">
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
