import express from 'express';
import * as controlador from './controlador.componentes.mjs'

const rutasComp = express.Router()

rutasComp.get('/componentes',controlador.obtenerComponentes)
rutasComp.get('/componentes/:id', controlador.obtenerPorId)
rutasComp.get('/componentesInventario/calcular-total-inventario', controlador.calcularTotalInventario)


export default rutasComp