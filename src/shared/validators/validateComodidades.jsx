export const validateComodidades = (comodidades) => {
    if (comodidades === 0 || comodidades === null || comodidades === undefined) {
        return {
            isValid: false,
            message: "La cantidad de comodidades es requerida y debe haber minimo una comodidad"
        }
    }

    return { isValid: true, message: '' };
}