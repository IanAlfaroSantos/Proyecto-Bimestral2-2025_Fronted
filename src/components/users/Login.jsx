import { useState } from "react";
import { Input } from '../Input';
import {
    validateUsernameOrEmail,
    validatePassword
} from '../../shared/validators';
import { useLogin } from "../../shared/hooks";
import {
    Box,
    Typography,
    Button,
    Divider,
    Avatar,
    InputAdornment,
    IconButton,
    Alert,
    Snackbar,
    Fade
} from '@mui/material';
import {
    Email as EmailIcon,
    Person as PersonIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Login.css";

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading, error } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [formState, setFormState] = useState({
        usernameOrEmail: {
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
        }
    });

    const handleInputValueChange = (value, field) => {
        const newState = {
            ...formState,
            [field]: {
                ...formState[field],
                value,
                showError: false
            }
        };

        if (field === 'usernameOrEmail' && value.length > 3) {
            const result = validateUsernameOrEmail(value);
            newState[field].isValid = result.isValid;
            newState[field].validationMessage = result.message;
        }

        if (field === 'password' && value.length > 0) {
            const result = validatePassword(value);
            newState[field].isValid = result.isValid;
            newState[field].validationMessage = result.message;
        }

        setFormState(newState);
    };

    const handleInputValidationOnBlur = (value, field) => {
        let result = { isValid: false, message: '' };
        switch (field) {
            case 'usernameOrEmail':
                result = validateUsernameOrEmail(value);
                break;
            case 'password':
                result = validatePassword(value);
                break;
            default:
                break;
        }

        setFormState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid: result.isValid,
                showError: !result.isValid && value.length > 0,
                validationMessage: result.message
            }
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const usernameValidation = validateUsernameOrEmail(formState.usernameOrEmail.value);
        const passwordValidation = validatePassword(formState.password.value);

        if (!usernameValidation.isValid || !passwordValidation.isValid) {
            setFormState({
                usernameOrEmail: {
                    ...formState.usernameOrEmail,
                    isValid: usernameValidation.isValid,
                    showError: !usernameValidation.isValid,
                    validationMessage: usernameValidation.message
                },
                password: {
                    ...formState.password,
                    isValid: passwordValidation.isValid,
                    showError: !passwordValidation.isValid,
                    validationMessage: passwordValidation.message
                }
            });
            return;
        }

        const success = await login(formState.usernameOrEmail.value, formState.password.value);
        if (!success) {
            setOpenSnackbar(true);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const isSubmitButtonDisable = isLoading ||
        !formState.usernameOrEmail.isValid ||
        !formState.password.isValid;

    return (
        <div className="login-container-wrapper">
            <div id="loginCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://wallpapers.com/images/hd/scenic-tropical-beach-sunset-desktop-3k00t2qh8hb64xtu.jpg"
                            className="d-block w-100"
                            alt="Beach Sunset"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://wallpapers.com/images/hd/palm-trees-beach-palmera-playa-aklrztsznqi41g5w.jpg"
                            className="d-block w-100"
                            alt="River Sunset"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://fondosmil.co/fondo/33596.jpg"
                            className="d-block w-100"
                            alt="Mountain View"
                        />
                    </div>
                </div>
            </div>

            <div className="login-overlay"></div>

            <Fade in={true} timeout={800}>
                <Box className="login-form-container">
                    <Box className="login-form">
                        <Box className="user-image-container">
                            <Avatar
                                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                                alt="User Icon"
                                className="user-avatar"
                            />
                        </Box>

                        <Typography variant="h4" className="login-title">
                            Iniciar sesión
                        </Typography>

                        <form className="auth-form" onSubmit={handleLogin} noValidate>
                            <Input
                                field="usernameOrEmail"
                                label="Correo o Nombre de usuario"
                                value={formState.usernameOrEmail.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.usernameOrEmail.showError}
                                validationMessage={formState.usernameOrEmail.validationMessage}
                                startAdornment={
                                    <InputAdornment position="start">
                                        {formState.usernameOrEmail.value.includes('@') ? (
                                            <EmailIcon className="input-icon" />
                                        ) : (
                                            <PersonIcon className="input-icon" />
                                        )}
                                    </InputAdornment>
                                }
                                className="input-field"
                            />

                            <Input
                                field="password"
                                label="Contraseña"
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
                                    'Iniciar sesión'
                                )}
                            </Button>
                        </form>

                        <Divider className="divider" />

                        <Typography
                            variant="body2"
                            className="auth-form-switch-label"
                            onClick={switchAuthHandler}
                        >
                            ¿No tienes una cuenta? <span className="register-link">Regístrate</span>
                        </Typography>
                    </Box>
                </Box>
            </Fade>
        </div>
    )
}