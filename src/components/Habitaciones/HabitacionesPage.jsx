import { useState, useEffect } from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, TableContainer, TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Grid, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import './habitaciones.css';
import { useHabitacion } from "../../shared/hooks/useHabitacion.jsx";
const HabitacionesPage = () => {
  const {
    habitaciones,
    handleGetHabitaciones,
    handlePostHabitaciones,
    handleGetHabitacionesByType,
    handleUpdateHabitaciones } = useHabitacion();
  const [formData, setFormData] = useState({
    type: "alta",
    quantity: 1,
    price: 1,
    hotelName: ""
  });
  useEffect(() => {
    handleGetHabitaciones();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "price" ? Number(value) : value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePostHabitaciones(formData);
    await handleGetHabitaciones();
    setFormData({
      type: "alta",
      quantity: 1,
      price: 1,
      hotelName: ""
    });
  };
  const [editData, setEditData] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = (data) => {
    console.log("abriendo modal con datos:", data);
    setEditData(data);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditData(null);
    setIsEditModalOpen(false);
  };
  const handleSaveEdit = async () => {
    if (!editData || !editData.uid) {
      console.error("No hay ID en editData");
      return;
    }
    await handleUpdateHabitaciones(editData.uid, editData);
    handleCloseEditModal();
    handleGetHabitaciones();
  };
  const [filtroTipo, setFiltroTipo] = useState("");
  return (
    <div className="arriba">
      <Box sx={{ p: 3, minHeight: "100vh" }}>
       <Typography variant="h4" gutterBottom textAlign="center" color="primary">
  Gestión de Habitaciones
</Typography>

<Grid container spacing={4} justifyContent="center" alignItems="flex-start">
  <Grid item xs={12} md={5}>
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: '#fafafa',
      }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        gutterBottom
        color="secondary"
      >
        Registrar Nueva Habitación
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          label="Nombre del hotel"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          required
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HotelIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth size="small">
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            name="type"
            value={formData.type}
            label="Tipo"
            onChange={handleChange}
          >
            <MenuItem value="alta">Alta</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="baja">Baja</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Cantidad"
          name="quantity"
          type="number"
          inputProps={{ min: 1 }}
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ConfirmationNumberIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Precio"
          name="price"
          type="number"
          inputProps={{ min: 1 }}
          value={formData.price}
          onChange={handleChange}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MonetizationOnIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mt: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Guardar habitación
        </Button>
      </Box>
    </Paper>
  </Grid>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              backgroundColor: '#f5f5f5',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FilterAltIcon color="primary" />
                <FormControl sx={{ minWidth: 180 }} size="small">
                  <InputLabel id="filtro-tipo-label">Filtrar por Tipo</InputLabel>
                  <Select
                    labelId="filtro-tipo-label"
                    value={filtroTipo}
                    label="Filtrar por Tipo"
                    onChange={async (e) => {
                      const value = e.target.value;
                      setFiltroTipo(value);
                      if (value) {
                        await handleGetHabitacionesByType(value);
                      } else {
                        await handleGetHabitaciones();
                      }
                    }}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="alta">Alta</MenuItem>
                    <MenuItem value="media">Media</MenuItem>
                    <MenuItem value="baja">Baja</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<ClearAllIcon />}
                onClick={async () => {
                  setFiltroTipo('');
                  setFiltroName('');
                  await handleGetHabitaciones();
                }}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Limpiar Filtros
              </Button>
            </Box>
          </Paper>
          <Grid item xs={12} md={7}>
            <TableContainer
              component={Paper}
              sx={{
                mt: { xs: 3, md: 0 },
                maxWidth: 900,
                mx: "auto",
                p: 2,
                boxShadow: 3,
                borderRadius: 3
              }}
            >
              <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                🏨 Lista de Habitaciones
              </Typography>

              <Paper elevation={4} sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        <HotelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Hotel
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Tipo
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        <ConfirmationNumberIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Cantidad
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        <MonetizationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Precio
                      </TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {habitaciones.map((hab) => (
                      <TableRow key={hab._id} hover sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#e3f2fd' } }}>
                        <TableCell>{hab.hotel?.name}</TableCell>
                        <TableCell>{hab.type}</TableCell>
                        <TableCell>{hab.quantity}</TableCell>
                        <TableCell>Q{hab.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenEditModal(hab)}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>

              {/* Modal de Edición */}
              <Dialog open={isEditModalOpen} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
                <DialogTitle>✏️ Editar Habitación</DialogTitle>
                <DialogContent dividers>
                  <TextField
                    label="Cantidad a Añadir"
                    name="addQuantity"
                    type="number"
                    value={editData?.addQuantity || ""}
                    onChange={(e) => setEditData({ ...editData, addQuantity: Number(e.target.value) })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Cantidad a Remover"
                    name="removeQuantity"
                    type="number"
                    value={editData?.removeQuantity || ""}
                    onChange={(e) => setEditData({ ...editData, removeQuantity: Number(e.target.value) })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Precio"
                    name="price"
                    type="number"
                    value={editData?.price || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEditModal} color="error" variant="outlined">
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit} color="primary" variant="contained">
                    Guardar Cambios
                  </Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HabitacionesPage;
