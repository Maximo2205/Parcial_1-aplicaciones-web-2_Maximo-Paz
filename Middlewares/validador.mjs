export const validarId = (req, res, next) => {

    const id = Number(req.params.id);
    
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ 
            error: "Parámetro inválido", 
            mensaje: "El ID solicitado debe ser un número mayor a cero." 
        });
    }
    next();
};