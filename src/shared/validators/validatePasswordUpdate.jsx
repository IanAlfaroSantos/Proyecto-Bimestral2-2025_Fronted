export const validatePasswordUpdate = (value) => {
    const regex = /^\S{8,8}$/;
    if (!regex.test(value) && value.trim()) {
        return {
            isValid: false,
            message: 'La contraseña debe contener exactamente 8 caracteres y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}