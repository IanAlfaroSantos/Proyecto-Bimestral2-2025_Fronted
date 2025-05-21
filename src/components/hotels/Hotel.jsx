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
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

import { useHotel } from "../../shared/hooks";
import PrivateRoutes from "../PrivateRoutes";
const HotelesPage = () => {
    const {
        saveHotel,
        getHoteles,
        getHotelById,
        updateHotel,
        deleteHotel,
        hoteles } = useHotel();
    const [formData, setFormData] = useState({
        name: "",
        direccion: "",
        categoria: "",
        comodidades: 1
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getHoteles();
            } catch (error) {
                console.error('Error fetching hoteles:', error);
            }
        };

        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "comodidades" ? Number(value) : value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.direccion || !formData.categoria || !formData.comodidades) {
            Swal.fire({
                icon: 'error',
                title: 'Faltan campos obligatorios',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        await saveHotel(formData.name, formData.direccion, formData.categoria, formData.comodidades);
        await getHoteles();
        setFormData({
            name: "",
            direccion: "",
            categoria: "",
            comodidades: 1
        });
    }
    const [editData, setEditData] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenEditModal = (data) => {
        setEditData(data);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setEditData(null);
        setIsEditModalOpen(false);
    };
    const handleSaveEdit = async () => {
        if (!editData || !editData._id) {
            console.error("No hay ID en editData");
            return;
        }
        await updateHotel(editData._id, editData);
        handleCloseEditModal();
        await getHoteles();
    };
    const handleDeleteHotel = async (id) => {
        await deleteHotel(id);
    };
    return (
        <div className="arriba">
            <Box sx={{ p: 3, minHeight: "100vh" }}>
                <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                    Gestión de Hoteles
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
                                Registrar Nuevo Hotel
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
                                    name="name"
                                    value={formData.name}
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

                                <TextField
                                    label="Direccion"
                                    name="direccion"
                                    value={formData.direccion}
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
                                    <InputLabel id="type-label">Categoria</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        name="categoria"
                                        value={formData.categoria}
                                        label="Categoria"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="1 estrella">1 Estrella</MenuItem>
                                        <MenuItem value="2 estrellas">2 Estrellas</MenuItem>
                                        <MenuItem value="3 estrellas">3 Estrellas</MenuItem>
                                        <MenuItem value="4 estrellas">4 Estrellas</MenuItem>
                                        <MenuItem value="5 estrellas">5 Estrellas</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Comodidades"
                                    name="comodidades"
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={formData.comodidades}
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
                                    Guardar Hotel
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

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
                                🏨 Lista de Hoteles
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
                                                Direccion
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <ConfirmationNumberIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Categorias
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <MonetizationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Comodidades
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                Acciones
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {hoteles.length > 0 ? (
                                            hoteles.map((hot) => (
                                                <TableRow key={hot._id} hover sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#e3f2fd' } }}>
                                                    <TableCell>{hot.name}</TableCell>
                                                    <TableCell>{hot.direccion}</TableCell>
                                                    <TableCell>{hot.categoria}</TableCell>
                                                    <TableCell>{hot.comodidades}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => handleOpenEditModal(hot)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleDeleteHotel(hot._id)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No hay hoteles disponibles</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal} fullWidth maxWidth="sm" disableEnforceFocus aria-labelledby="edit-hotel-title">
                                <DialogTitle id="edit-hotel-title">✏️ Editar Hotel</DialogTitle>
                                <DialogContent dividers>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        type="text"
                                        value={editData?.name || ""}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Direccion"
                                        name="direccion"
                                        type="text"
                                        value={editData?.direccion || ""}
                                        onChange={(e) => setEditData({ ...editData, direccion: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Categoria"
                                        name="categoria"
                                        type="text"
                                        value={editData?.categoria || ""}
                                        onChange={(e) => setEditData({ ...editData, categoria: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Comodidades"
                                        name="comodidades"
                                        type="number"
                                        value={editData?.comodidades || ""}
                                        onChange={(e) => setEditData((prev) => ({ ...prev, comodidades: Number(e.target.value) }))}
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
            <PrivateRoutes />
        </div>
    )
}

export default HotelesPage;