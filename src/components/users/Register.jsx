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
import { FaUserTie } from 'react-icons/fa';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutgoingMail } from "react-icons/md";

export const Register = ({ switchAuthHandler }) => {

    const { register, isLoading } = useRegister();

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
        }))
    }

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
    }

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
    }

    const isSubmitButtonDisable = isLoading ||
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.email.isValid ||
        !formState.phone.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid;

    return (
        <div className="register-container">
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
            <form className="auth-form">
                <h2>Register</h2>
                <br />
                <Input
                    field='name'
                    label='Name'
                    value={formState.name.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.name.showError}
                    validationMessage={formState.name.validationMessage}
                    icon={MdOutlineDriveFileRenameOutline}
                />
                <br />
                <Input
                    field='surname'
                    label='Surname'
                    value={formState.surname.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.surname.showError}
                    validationMessage={formState.surname.validationMessage}
                    icon={MdOutlineDriveFileRenameOutline}
                />
                <br />
                <Input
                    field='username'
                    label='Username'
                    value={formState.username.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.username.showError}
                    validationMessage={formState.username.validationMessage}
                    icon={FaUserTie}
                />
                <br />
                <Input
                    field='email'
                    label='Email'
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type='email'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.email.showError}
                    validationMessage={formState.email.validationMessage}
                    icon={MdOutgoingMail}
                />
                <br />
                <Input
                    field='phone'
                    label='Phone'
                    value={formState.phone.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.phone.showError}
                    validationMessage={formState.phone.validationMessage}
                    icon={FaPhoneVolume}
                />
                <br />
                <Input
                    field='password'
                    label='Password'
                    placeholder='Click el candado para mostrar'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={formState.password.validationMessage}
                />
                <br />
                <Input
                    field='passwordConfir'
                    label='Password Confirmation'
                    placeholder='Click el candado para mostrar'
                    value={formState.passwordConfir.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.passwordConfir.showError}
                    validationMessage={formState.passwordConfir.validationMessage}
                />
                <br />
                <button onClick={handleRegister} disabled={isSubmitButtonDisable}>
                    Register
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                Already have an account? Sign up
            </span>
        </div>
    )
}