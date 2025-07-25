export const validateUsername = (username) => {
    if (!username.trim()) {
        return {
            isValid: false,
            message: 'Username is required'
        }
    }

    const regex = /^\S{3,20}$/;
    if (!regex.test(username)) {
        return {
            isValid: false,
            message: 'El nombre de usuario debe contener entre 3 y 20 caracteres y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}