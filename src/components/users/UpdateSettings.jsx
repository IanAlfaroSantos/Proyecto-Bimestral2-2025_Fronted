import { useState, useEffect } from "react"
import {
    validateName,
    validateSurname,
    validateUsername,
    validatePhone,
    validatePasswordUpdate
} from "../../shared/validators"
import { useUserSettings } from "../../shared/hooks"
import { Input } from "../Input"
import { FaUserTie } from 'react-icons/fa'
import { FaPhoneVolume } from "react-icons/fa6"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"
import './setting.css';
import { useDeleteUser } from "../../shared/hooks"

const inputs = [
    {
        field: 'name',
        label: 'Name',
        validationMessage: validateName,
        type: 'text'
    },
    {
        field: 'surname',
        label: 'Surname',
        validationMessage: validateSurname,
        type: 'text'
    },
    {
        field: 'username',
        label: 'Username',
        validationMessage: validateUsername,
        type: 'text'
    },
    {
        field: 'phone',
        label: 'Phone',
        validationMessage: validatePhone,
        type: 'text'
    },
    {
        field: 'currentPassword',
        label: 'Current Password',
        type: 'password'
    },
    {
        field: 'password',
        label: 'Password',
        validationMessage: validatePasswordUpdate,
        type: 'password'
    }
]

export const UserSettings = () => {
    const { userSettings = {}, saveSettings, isFetching } = useUserSettings();
    const { handleDeleteUser } = useDeleteUser();

    const [formState, setFormState] = useState({
        name: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        },
        surname: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        },
        username: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        },
        phone: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        },
        currentPassword: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        },
        password: {
            isValid: true,
            showError: false,
            validationMessage: '',
            value: ''
        }
    });

    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (userSettings) {
            setFormState({
                name: {
                    isValid: validateName(userSettings.name).isValid,
                    showError: false,
                    value: userSettings.name
                },
                surname: {
                    isValid: validateSurname(userSettings.surname).isValid,
                    showError: false,
                    value: userSettings.surname
                },
                username: {
                    isValid: validateUsername(userSettings.username).isValid,
                    showError: false,
                    value: userSettings.username
                },
                phone: {
                    isValid: validatePhone(userSettings.phone).isValid,
                    showError: false,
                    value: userSettings.phone
                },
                currentPassword: {
                    isValid: validatePasswordUpdate(userSettings.currentPassword || '').isValid,
                    showError: false,
                    value: ''
                },
                password: {
                    isValid: validatePasswordUpdate(userSettings.password || '').isValid,
                    showError: false,
                    value: ''
                }
            });
        }
    }, [userSettings]);

    useEffect(() => {
        if (formState.password.value.trim() && !formState.currentPassword.value.trim()) {
            setFormState((prevState) => ({
                ...prevState,
                currentPassword: {
                    ...prevState.currentPassword,
                    showError: true,
                    validationMessage: 'Para cambiar la contraseña proporcione la contraseña actual'
                }
            }));
        }
    }, [formState.password.value, formState.currentPassword.value]);

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
        const validator = inputs.find(input => input.field === field)?.validationMessage;

        if (field === 'password' && value.trim() && !formState.currentPassword.value) {
            setFormState((prevState) => ({
                ...prevState,
                currentPassword: {
                    ...prevState.currentPassword,
                    showError: true,
                    validationMessage: 'Para cambiar la contraseña proporcione la contraseña actual'
                }
            }));
        }

        if (field === 'currentPassword' && value.trim()) {
            setFormState((prevState) => ({
                ...prevState,
                currentPassword: {
                    ...prevState.currentPassword,
                    showError: false,
                    validationMessage: ''
                }
            }));
        }

        if (!validator) return;

        const result = validator(value);

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

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (formState.password.value && !formState.currentPassword.value) {
            setFormState((prevState) => ({
                ...prevState,
                currentPassword: {
                    ...prevState.currentPassword,
                    showError: true,
                    validationMessage: 'Para cambiar la contraseña proporcione la contraseña actual'
                }
            }));
            return;
        }

        const updatedData = {
            name: formState.name.value,
            surname: formState.surname.value,
            username: formState.username.value,
            phone: formState.phone.value
        };

        if (formState.password.value || formState.currentPassword.value) {
            updatedData.currentPassword = formState.currentPassword.value;
            updatedData.password = formState.password.value;
        }

        saveSettings(updatedData);
    };

    const isChangingPassword = formState.password.isValid || formState.currentPassword.isValid;
    const isSubmitButtonDisabled = !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.phone.isValid ||
        (isChangingPassword && (!formState.currentPassword.isValid || !formState.password.isValid));

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
    };

    const handleDeleteAccount = () => {
        const data = {
            username: formState.username.value,
            currentPassword: formState.currentPassword.value
        };
        handleDeleteUser(data);
    };

    return (
        <div className="user-settings-container">
            <div className="user-settings-form">
                <img 
                    src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" 
                    className="user-image" 
                    alt="User Icon" 
                />
                <form className="auth-form" autoComplete="on" onSubmit={handleFormSubmit}>
                    {isDeleting ? (
                        <>
                            <h2>Confirm Account Deletion</h2>
                            <div className="form-group">
                                <Input
                                    field="username"
                                    label="Username"
                                    value={formState.username.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.username.showError}
                                    validationMessage={formState.username.validationMessage}
                                    icon={FaUserTie}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="currentPassword"
                                    label="Current Password"
                                    value={formState.currentPassword.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="password"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.currentPassword.showError}
                                    validationMessage={formState.currentPassword.validationMessage}
                                />
                            </div>
                            <div className="buttons-container">
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Account
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Update Your Profile</h2>
                            <div className="form-group">
                                <Input
                                    field="name"
                                    label="Name"
                                    value={formState.name.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.name.showError}
                                    validationMessage={formState.name.validationMessage}
                                    autoComplete="name"
                                    icon={MdOutlineDriveFileRenameOutline}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="surname"
                                    label="Surname"
                                    value={formState.surname.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.surname.showError}
                                    validationMessage={formState.surname.validationMessage}
                                    autoComplete="surname"
                                    icon={MdOutlineDriveFileRenameOutline}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="username"
                                    label="Username"
                                    value={formState.username.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.username.showError}
                                    validationMessage={formState.username.validationMessage}
                                    autoComplete="username"
                                    icon={FaUserTie}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="phone"
                                    label="Phone"
                                    value={formState.phone.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="tel"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.phone.showError}
                                    validationMessage={formState.phone.validationMessage}
                                    autoComplete="phone"
                                    icon={FaPhoneVolume}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="currentPassword"
                                    label="Current Password"
                                    value={formState.currentPassword.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="password"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.currentPassword.showError}
                                    validationMessage={formState.currentPassword.validationMessage}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    field="password"
                                    label="New Password"
                                    value={formState.password.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="password"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.password.showError}
                                    validationMessage={formState.password.validationMessage}
                                />
                            </div>
                            <div className="buttons-container">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitButtonDisabled}
                                >
                                    {isFetching ? 'Updating...' : 'Update'}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={handleDeleteClick}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};