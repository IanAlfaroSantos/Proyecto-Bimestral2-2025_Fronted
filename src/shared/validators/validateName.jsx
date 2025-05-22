export const validateName = (name) => {
    if (!name.trim()) {
        return {
            isValid: false,
            message: "Name is required"
        }
    }

    const regex = /^.{3,25}$/;
    if (!regex.test(name)) {
        return {
            isValid: false,
            message: 'El nombre debe contener entre 3 y 25 caracteres'
        }
    }

    return { isValid: true, message: '' };
}