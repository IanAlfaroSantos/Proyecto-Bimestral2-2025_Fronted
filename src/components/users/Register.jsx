import { useState } from 'react';
import { Input } from '../Input';
import {
    validateName,
    validateSurname,
    validateUsername,
    validateEmail,
    validatePhone,
    validatePassword,
    validateConfirPassword
} from '../../shared/validators';
import { useRegister } from '../../shared/hooks';
import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  Avatar, 
  InputAdornment, 
  IconButton,
  Slide,
  Fade
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Person as PersonIcon, 
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Phone as PhoneIcon,
  Badge as NameIcon
} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Register.css';

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formState, setFormState] = useState({
        name: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        surname: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        email: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        username: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        phone: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        password: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        passwordConfir: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let result = { isValid: false, message: '' };
        switch (field) {
            case 'name':
                result = validateName(value);
                break;
            case 'surname':
                result = validateSurname(value);
                break;
            case 'username':
                result = validateUsername(value);
                break;
            case 'email':
                result = validateEmail(value);
                break;
            case 'phone':
                result = validatePhone(value);
                break;
            case 'password':
                result = validatePassword(value);
                break;
            case 'passwordConfir':
                result = validateConfirPassword(formState.password.value, value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid: result.isValid,
                showError: !result.isValid,
                validationMessage: result.message
            }
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        register(
            formState.name.value,
            formState.surname.value,
            formState.username.value,
            formState.email.value,
            formState.phone.value,
            formState.password.value,
        );
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const isSubmitButtonDisable = isLoading ||
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.email.isValid ||
        !formState.phone.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid;

    return (
        <div className="register-container-wrapper">
            {/* Carrusel de fondo */}
            <div id="registerCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img 
                            src="https://wallpapers.com/images/hd/palm-trees-beach-palmera-playa-aklrztsznqi41g5w.jpg" 
                            className="d-block w-100" 
                            alt="Palm Beach"
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://fondosmil.co/fondo/33596.jpg" 
                            className="d-block w-100" 
                            alt="Mountain View"
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="https://wallpapers.com/images/hd/scenic-tropical-beach-sunset-desktop-3k00t2qh8hb64xtu.jpg" 
                            className="d-block w-100" 
                            alt="Beach Sunset"
                        />
                    </div>
                </div>
            </div>

            {/* Overlay oscuro */}
            <div className="register-overlay"></div>

            {/* Contenido del formulario */}
            <Fade in={true} timeout={800}>
                <Box className="register-form-container">
                    <Slide direction="down" in={true} timeout={500}>
                        <Box className="register-form">
                            <Box className="user-image-container">
                                <Avatar
                                    src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                                    alt="User Icon"
                                    className="user-avatar"
                                />
                            </Box>

                            <Typography variant="h4" className="register-title">
                                Registrarse
                            </Typography>

                            <Box className="form-scroll-container">
                                <form className="auth-form" onSubmit={handleRegister} noValidate>
                                    <Input
                                        field='name'
                                        label='Nombre'
                                        value={formState.name.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.name.showError}
                                        validationMessage={formState.name.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <NameIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='surname'
                                        label='Apellido'
                                        value={formState.surname.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.surname.showError}
                                        validationMessage={formState.surname.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <NameIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='username'
                                        label='Nombre de usuario'
                                        value={formState.username.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.username.showError}
                                        validationMessage={formState.username.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PersonIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='email'
                                        label='Correo electrónico'
                                        value={formState.email.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='email'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.email.showError}
                                        validationMessage={formState.email.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmailIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='phone'
                                        label='Teléfono'
                                        value={formState.phone.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.phone.showError}
                                        validationMessage={formState.phone.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PhoneIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='password'
                                        label='Contraseña'
                                        value={formState.password.value}
                                        onChangeHandler={handleInputValueChange}
                                        type={showPassword ? 'text' : 'password'}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.password.showError}
                                        validationMessage={formState.password.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    className="password-toggle"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Input
                                        field='passwordConfir'
                                        label='Confirmación de contraseña'
                                        value={formState.passwordConfir.value}
                                        onChangeHandler={handleInputValueChange}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.passwordConfir.showError}
                                        validationMessage={formState.passwordConfir.validationMessage}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockIcon className="input-icon" />
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowConfirmPassword}
                                                    edge="end"
                                                    className="password-toggle"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        className="input-field"
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        className="submit-button"
                                        disabled={isSubmitButtonDisable}
                                        size="large"
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Registrarse'
                                        )}
                                    </Button>
                                </form>

                                <Divider className="divider" />

                                <Typography 
                                    variant="body2" 
                                    className="auth-form-switch-label"
                                    onClick={switchAuthHandler}
                                >
                                    ¿Ya tienes una cuenta? <span className="login-link">Inicia sesión</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </div>
    );
};