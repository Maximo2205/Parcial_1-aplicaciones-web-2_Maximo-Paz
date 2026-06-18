import * as modelo from './modelo.usuarios.mjs'
import bcrypt from 'bcryptjs';
import { signedCookie } from 'cookie-parser';
import jwt from 'jsonwebtoken';


export async function autenticar(req, res){

    const { usuario, pass } = req.body;
    
    try {
        // 1. Buscar usuario en la base de datos PostgreSQL
        const resultado = await modelo.obtenerUsuario(usuario)
        
        if (!resultado) {
            console.log(`❌ Intento fallido: El usuario "${usuario}" no existe.`);
            return res.status(401).json({error: 'Las credenciales son incorrectas'});
        }
        
        
        
        // 2. Comparar el password ingresado contra el hash (bcryptjs)
        const verificado = await bcrypt.compare(pass, resultado.password_hash);
        
        if (!verificado) {
            return res.status(401).json({error: 'Las credenciales son incorrectas'});
        }
        
        // 3. Crear Payload del Token
        const datosUtiles = {
            usuario: resultado.username,
            rol: 0
        };
        
        // 4. Firmar y enviar el JWT mediante una HTTP-Only Cookie
        jwt.sign(
            datosUtiles,
            process.env.FIRMA_JWT,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) {
                    console.error('Error al generar el JWT:', error);
                    return res.status(500).json({error: 'error al ingresar al servidor 1'});
                }
                
                res.cookie('token', token, {
                    signed: true,
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false, // Dejar en false para desarrollo local HTTP
                    maxAge: 1000 * 60 * 60 // Expira en 1 hora
                });
                
                res.redirect('/admin');
                console.log(res.signedCookie('token'))
            }
        );
        
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        res.status(500).json({error: 'error al ingresar al servidor 2'});
    }
};

export function CerrarSesion(req, res){    
    res.clearCookie('token');
    res.redirect('/login');
}
    
