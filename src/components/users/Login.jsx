import { useState } from "react";
import { Input } from '../Input';
import {
    validateUsernameOrEmail,
    validatePassword
} from '../../shared/validators';
import { useLogin } from "../../shared/hooks";
import { FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Login.css";

export const Login = ({ switchAuthHandler }) => {

    const { login, isLoading } = useLogin();

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
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

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
    }

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.usernameOrEmail.value, formState.password.value);
    }

    const isSubmitButtonDisable = isLoading ||
        !formState.usernameOrEmail.isValid ||
        !formState.password.isValid;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login-background">
            <div
                className="login-form p-4 rounded"
                style={{
                    position: "static",
                    display: "block",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    width: "100%",
                    maxWidth: "400px"
                }}
            >
                <form className="auth-form" onSubmit={handleLogin} noValidate>
                    <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />

                    <h3 className="text-center mb-4">Iniciar sesión</h3>
                    <br />
                    <Input
                        field="usernameOrEmail"
                        label="Correo o Nombre de usuario"
                        value={formState.usernameOrEmail.value}
                        onChangeHandler={handleInputValueChange}
                        type="text"
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.usernameOrEmail.showError}
                        validationMessage={formState.usernameOrEmail.validationMessage}
                        icon={FaUserTie}
                    />
                    <br />
                    <br />
                    <Input
                        field="password"
                        label="Contraseña"
                        placeholder="Haz clic en el candado para mostrar"
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type="password"
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.password.showError}
                        validationMessage={formState.password.validationMessage}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitButtonDisable}
                    >
                        Iniciar sesión
                    </button>
                </form>

                <hr style={{ background: 'black' }} />

                <span onClick={switchAuthHandler} className="auth-form-switch-label">
                    Don't have an account? Sign up
                </span>
            </div>
        </div>
    )
}