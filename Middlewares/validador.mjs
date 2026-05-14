// Exporta la función para poder usarla en otros archivos
export const validarId = (req, res, next) => {

    // Convierte el string a número con Number()
    const id = Number(req.params.id);

    // valida que sea un número válido Y que sea mayor a cero
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ 
            error: "Parámetro inválido", 
            mensaje: "El ID solicitado debe ser un número mayor a cero." 
        });
    }
    next();
};