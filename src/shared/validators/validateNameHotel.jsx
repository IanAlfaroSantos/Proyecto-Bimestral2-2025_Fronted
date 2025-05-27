export const validateNameHotel = (name) => {
    if (!name.trim()) {
        return {
            isValid: false,
            message: "Name is required"
        }
    }

    const regex = /^[^\s]{5,25}$/;
    if (!regex.test(name)) {
        return {
            isValid: false,
            message: 'El nombre debe contener entre 5 y 25 caracteres'
        }
    }

    return { isValid: true, message: '' };
}