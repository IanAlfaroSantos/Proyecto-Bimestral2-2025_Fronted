export const validateCategorie = (categoria) => {
    if (!categoria.trim()) {
        return {
            isValid: false,
            message: "Categorie is required"
        }
    }

    const categoriasPermitidas = ["1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"];

    if (!categoriasPermitidas.includes(categoria)) {
        return {
            isValid: false,
            message: "El valor de la categoría debe ser uno de los siguientes: '1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'"
        }
    }

    return { isValid: true, message: '' };
}