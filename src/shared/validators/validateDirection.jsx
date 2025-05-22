export const validateDirection = (direccion) => {
    if (!direccion.trim()) {
        return {
            isValid: false,
            message: "Direction is required"
        }
    }

    const regex = /^.{0,250}$/;
    if (!regex.test(direccion)) {
        return {
            isValid: false,
            message: 'La dirección debe contener máximo 250 caracteres'
        }
    }

    return { isValid: true, message: '' };
}