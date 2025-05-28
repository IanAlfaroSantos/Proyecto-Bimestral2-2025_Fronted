import { useState } from "react";
import { Input } from '../Input';
import {
    validateUsernameOrEmail,
    validatePassword
} from '../../shared/validators';
import { useLogin } from "../../shared/hooks";
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Typography,
  Avatar,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import "./Login.css";

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

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
            case 'usernameOrEmail':
                result = validateUsernameOrEmail(value);
                break;
            case 'password':
                result = validatePassword(value);
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

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.usernameOrEmail.value, formState.password.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isSubmitButtonDisable = isLoading ||
        !formState.usernameOrEmail.isValid ||
        !formState.password.isValid;

    return (
        <div className="login-background">
            <Box className="login-container">
                <Box className="login-form">
                    <Box className="user-image-container">
                        <Avatar
                            src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                            alt="User Icon"
                            sx={{
                                width: 100,
                                height: 100,
                                margin: '0 auto',
                                border: '3px solid white'
                            }}
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
                            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                        </Button>
                    </form>

                    <Divider className="divider" />

                    <Typography 
                        variant="body2" 
                        className="auth-form-switch-label"
                        onClick={switchAuthHandler}
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};