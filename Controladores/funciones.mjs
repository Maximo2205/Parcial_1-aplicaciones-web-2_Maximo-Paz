import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_PATH = path.join(process.cwd(), 'data', 'componentes.json');

export const obtenerTodos = async (req, res) => {
    try {

        const contenido = await fs.readFile(DATA_PATH, 'utf-8');
        res.status(200).json(JSON.parse(contenido));

    } catch (error) {

        res.status(500).json({ mensaje: "Error al leer la base de datos" });

    }
};

export const obtenerPorId = async (req, res) => {
    try {

        const contenido = await fs.readFile(DATA_PATH, 'utf-8');
        const lista = JSON.parse(contenido);
        const item = lista.find(c => c.id === Number(req.params.id));
        
        item ? res.json(item) : res.status(404).json({ mensaje: "Componente no encontrado" });

    } catch (error) {

        res.status(500).json({ mensaje: "Error interno" });

    }
};

export const calcularTotalInventario = async (req, res) => {
    try {

        const contenido = await fs.readFile(DATA_PATH, 'utf-8');
        const lista = JSON.parse(contenido);
        const total = lista.reduce((acc, item) => acc + (item.precio * item.stock), 0);
        
        res.json({ 
            procedimiento: "Valorización de Inventario",
            resultado: `El valor total de los componentes en stock es $${total}`
        });

    } catch (error) {

        res.status(500).json({ mensaje: "Error al procesar el inventario" });

    }
};