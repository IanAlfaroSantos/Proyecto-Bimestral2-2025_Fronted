import { useState, useEffect } from "react";
import {
    Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, TableContainer, TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Grid, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import ImageIcon from '@mui/icons-material/Image';
import Swal from "sweetalert2";
import { Navbar } from "../../components/navbars/Navbar";
import {
    validateName,
    validateDirection,
    validateCategorie,
    validateComodidades
} from "../../shared/validators";

import { useHotel } from "../../shared/hooks";
import PrivateRoutes from "../PrivateRoutes";
import './hotel.css';

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

        await saveHotel(formData.name, formData.direccion, formData.categoria, formData.comodidades, formData.imagen);
        await getHoteles();
        setFormData({
            name: "",
            direccion: "",
            categoria: "",
            comodidades: 1,
            imagen: ""

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
        await updateHotel(editData._id, editData);
        handleCloseEditModal();

        const nameValidation = validateName(editData.name);
        if (!nameValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error name',
                text: 'El nombre requerido y debe contener entre 3 y 25 caracteres',
            });
            return;
        }

        const direccionValidation = validateDirection(editData.direccion);
        if (!direccionValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error direccion',
                text: 'La dirección es requerida y debe contener máximo 250 caracteres',
            });
            return;
        }

        const categoriaValidation = validateCategorie(editData.categoria);
        if (!categoriaValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Erroro categoria',
                text: "El valor de la categoría debe ser uno de los siguientes: '1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'",
            });
            return;
        }

        const comodidadesValidation = validateComodidades(editData.comodidades);
        if (!comodidadesValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error comodidades',
                text: "La cantidad de comodidades es requerida y debe haber minimo 1 comodidad",
            });
            return;
        }

        await getHoteles();
    };
    const handleDeleteHotel = async (id) => {
        await deleteHotel(id);
    };
    return (
        <div>
            <Navbar />
            <Box className="arriba" sx={{ p: 3, minHeight: "100vh" }}>
                <Typography className="arriba1" variant="h4" gutterBottom textAlign="center" color="primary">
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
                                                <HomeWorkIcon color="action" />
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
                                                <FmdGoodIcon color="action" />
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
                                                <DryCleaningIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                label= "Imagen"
                                name="imagen"
                                type="text"
                                value={formData.imagen}
                                onChange={handleChange}
                                required
                                fullWidth
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <ImageIcon color="action" />
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
                                borderRadius: 3,
                                maxHeight: 400,
                                overflowY: 'auto',
                                scrollbarWidth: 'none'
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
                                                <HomeWorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Hotel
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <FmdGoodIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Direccion
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Categorias
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <DryCleaningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                Comodidades
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <SettingsSuggestIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
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
                                                        <Box sx={{ display: 'flex', gap: 1, width: '120px' }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => handleOpenEditModal(hot)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleDeleteHotel(hot._id)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeWorkIcon color="action" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        label="Direccion"
                                        name="direccion"
                                        type="text"
                                        value={editData?.direccion || ""}
                                        onChange={(e) => setEditData({ ...editData, direccion: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeWorkIcon color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="edit-categoria-label">Categoría</InputLabel>
                                        <Select
                                            labelId="edit-categoria-label"
                                            name="categoria"
                                            value={editData?.categoria || ""}
                                            label="Categoría"
                                            onChange={(e) => setEditData({ ...editData, categoria: e.target.value })}
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
                                        value={editData?.comodidades || ""}
                                        onChange={(e) => setEditData((prev) => ({ ...prev, comodidades: Number(e.target.value) }))}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DryCleaningIcon color="action" />
                                            </InputAdornment>
                                        )
                                    }}
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