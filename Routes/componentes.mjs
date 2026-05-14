import express from 'express';
import * as ctrl from '../Controladores/funciones.mjs';
import { validarId } from '../middlewares/validador.mjs';

const router = express.Router();

router.get('/calcular-total-inventario', ctrl.calcularTotalInventario)

router.get('/:id', validarId, ctrl.obtenerPorId);
// API REST
router.get('/', ctrl.obtenerTodos);


export default router;