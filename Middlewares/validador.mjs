// Exporta la función para poder usarla en otros archivos

import jwt from 'jsonwebtoken'

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

export function comprobarToken(req, res, next) {
    // Leer la cookie firmada 'token'
    const token = req.signedCookies['token'];
    
    if (!token) {
        console.log('🛡️ Acceso bloqueado: No se encontró el token de sesión.');
        return res.redirect('/login');
    }
    
    jwt.verify(token, process.env.FIRMA_JWT, (error, datosUtiles) => {
        if (error) {
            console.log('❌ Token inválido o expirado:', error.message);
            return res.redirect('/login');
        }
        next();
    });
}

