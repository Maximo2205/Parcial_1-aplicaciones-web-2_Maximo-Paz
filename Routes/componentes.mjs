import express from 'express';
// Importa todas las funciones del controlador con el alias "ctrl"
import * as ctrl from '../Controladores/funciones.mjs';
import { validarId } from '../middlewares/validador.mjs';

// Router funciona como una sub-aplicación dentro de la aplicación principal
const router = express.Router();

//Ruta especifica
router.get('/calcular-total-inventario', ctrl.calcularTotalInventario)

//Ruta dinamica
router.get('/:id', validarId, ctrl.obtenerPorId);

//Ruta general - API REST
router.get('/', ctrl.obtenerTodos);


export default router;