import { useState, useEffect } from "react";
import {
    Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, TableContainer, TextField, Select, MenuItem, Button, FormControl, InputLabel, Box, Grid, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaUserTie } from 'react-icons/fa'
import { FaPhoneVolume } from "react-icons/fa6"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"
import Swal from "sweetalert2";
import { Navbar } from "../../components/navbars/Navbar";
import {
    validateName,
    validateSurname,
    validateUsername,
    validatePhone,
    validatePasswordUpdate
} from "../../shared/validators";

import { useUpdateUsersByAdmin } from "../../shared/hooks";
import PrivateRoutes from "../PrivateRoutes";
import '../hotels/hotel.css';

const UsersPage = () => {
    const {
        getUsers,
        getUserById,
        updateUserAdmin,
        deleteUserAdmin,
        users } = useUpdateUsersByAdmin();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        phone: "",
        currentPassword: "",
        password: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUsers();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);
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
        await updateUserAdmin(editData.uid, editData);
        handleCloseEditModal();

        const nameValidation = validateName(editData.name);
        if (!nameValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error name',
                text: 'El nombre es requerido y debe contener entre 3 y 25 caracteres',
            });
            return;
        }

        const surnameValidation = validateSurname(editData.surname);
        if (!surnameValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error surname',
                text: 'El apellido es requerido y debe contener entre 3 y 25 caracteres',
            });
            return;
        }

        const usernameValidation = validateUsername(editData.username);
        if (!usernameValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Erroro username',
                text: "El nombre de usuario es requerido y debe contener entre 3 y 20 caracteres y no debe contener espacios",
            });
            return;
        }

        const phoneValidation = validatePhone(editData.phone);
        if (!phoneValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error phone',
                text: "El número de telefono es requerido debe contener exactamente 8 digitos y no debe contener espacios",
            });
            return;
        }

        const passwordValidation = validatePasswordUpdate(editData.password);
        if (!passwordValidation.isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Error password',
                text: "La contraseña debe contener exactamente 8 caracteres y no debe contener espacios",
            });
            return;
        }

        await getUsers();
    };
    const handleDeleteUser = async (id) => {
        await deleteUserAdmin(id);
    };
    return (
        <div>
            <Navbar />
            <Box className="arriba" sx={{ p: 3, minHeight: "100vh" }}>
                <Typography className="arriba1" variant="h4" gutterBottom textAlign="center" color="primary">
                    Gestión de Usuarios 💻
                </Typography>

                <Grid container spacing={4} justifyContent="center" alignItems="flex-start">

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

                            <Paper elevation={5} sx={{ overflowX: 'auto' }}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <MdOutlineDriveFileRenameOutline sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Name</span>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <MdOutlineDriveFileRenameOutline sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Surname</span>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <FaUserTie sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Username</span>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <FaPhoneVolume sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Phone</span>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <FaUserTie sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Role</span>
                                            </TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                <SettingsSuggestIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                <span style={{ marginLeft: '8px' }}>Acciones</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.length > 0 ? (
                                            users.map((use) => (
                                                <TableRow key={use.uid} hover sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#e3f2fd' } }}>
                                                    <TableCell>{use.name}</TableCell>
                                                    <TableCell>{use.surname}</TableCell>
                                                    <TableCell>{use.username}</TableCell>
                                                    <TableCell>{use.phone}</TableCell>
                                                    <TableCell>{use.role}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', gap: 1, width: '140px' }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => handleOpenEditModal(use)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleDeleteUser(use.uid)}
                                                                sx={{ textTransform: 'none' }}
                                                            >
                                                            </Button>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No hay usuarios disponibles</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Paper>

                            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal} fullWidth maxWidth="sm" disableEnforceFocus aria-labelledby="edit-hotel-title">
                                <DialogTitle id="edit-hotel-title">✏️ Editar Usuario</DialogTitle>
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
                                                    <MdOutlineDriveFileRenameOutline color="action" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        label="Surname"
                                        name="surname"
                                        type="text"
                                        value={editData?.surname || ""}
                                        onChange={(e) => setEditData({ ...editData, surname: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MdOutlineDriveFileRenameOutline color="action" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        label="Username"
                                        name="username"
                                        type="text"
                                        value={editData?.username || ""}
                                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaUserTie color="action" />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        type="text"
                                        value={editData?.phone || ""}
                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FaPhoneVolume color="action" />
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

export default UsersPage;