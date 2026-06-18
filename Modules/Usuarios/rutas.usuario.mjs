import express from 'express';
import * as controlador from './controlador.usuarios.mjs'

const rutasUsuario = express.Router()

rutasUsuario.post('/autenticar',controlador.autenticar)

rutasUsuario.get('/cerrar-sesion', controlador.CerrarSesion);

export default rutasUsuario 