import './iniciar.env.mjs';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import rutasUsuario from './Modules/Usuarios/rutas.usuario.mjs';
import rutasComp from './Modules/Componentes/rutas.componentes.mjs'
import * as validar from './Middlewares/validador.mjs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUERTO = process.env.PUERTO || 3000;
const app = express();

// ============================================
// MIDDLEWARES DE PARSEO Y COOKIES
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.FIRMA_COOKIE));


// ============================================
// RUTAS DE LA API (PROTEGIDAS)
// ============================================
app.use('/api/v1', rutasComp);
app.use('/api/v1', rutasUsuario);

// ============================================
// SERVIR FRONTENDS ESTÁTICOS (PROTEGIDOS)
// ============================================
app.use('/login', express.static('./Fronts/front-login'));
app.use('/admin',validar.comprobarToken,  express.static('./Fronts/front-admin'));
app.use('/items',validar.comprobarToken, express.static('./Fronts/front-items'));
app.use('/item',validar.comprobarToken, express.static('./Fronts/front-item'));
app.use('/procedimiento',validar.comprobarToken, express.static('./Fronts/front-procedimientos'));

// Enrutamiento raíz por defecto
app.get('/', (req, res) => {
    const token = req.signedCookies['token'];
    if (token) {
        jwt.verify(token, process.env.FIRMA_JWT, (error) => {
            if (!error) return res.redirect('/admin');
        });
    }
    res.redirect('/login');
});

// Inicializar el servidor
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor operativo en: http://localhost:${PUERTO}`);
});