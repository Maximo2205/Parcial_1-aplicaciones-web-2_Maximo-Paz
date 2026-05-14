import fs from 'node:fs/promises';
import path from 'node:path';

const PATH = path.join(process.cwd(), 'data', 'componentes.json');


// Función para obtener TODOS los componentes
export const obtenerTodos = async (req, res) => {
    try {

        const contenido = await fs.readFile(PATH, 'utf-8');
        res.status(200).json(JSON.parse(contenido));

    } catch (error) {

        res.status(500).json({ mensaje: "Error al leer la base de datos" });

    }
};

// Funcion para obtener los componentes por Id
export const obtenerPorId = async (req, res) => {
    try {

        const contenido = await fs.readFile(PATH, 'utf-8');
        const lista = JSON.parse(contenido);
        const item = lista.find(c => c.id === Number(req.params.id));
        
         if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ mensaje: "Componente no encontrado" });
        }

    } catch (error) {

        res.status(500).json({ mensaje: "Error interno" });

    }
};


//Funcion para calcular el total del inventario (Endpoint NO REST)
export const calcularTotalInventario = async (req, res) => {
    try {

        const contenido = await fs.readFile(PATH, 'utf-8');
        const lista = JSON.parse(contenido);
         // Calculamos el valor total del inventario: suma de (precio × stock) de cada componente
        const total = lista.reduce((acc, item) => acc + (item.precio * item.stock), 0);
        
        res.json({ 
            procedimiento: "Valorización de Inventario",
            resultado: `El valor total de los componentes en stock es $${total}`
        });

    } catch (error) {

        res.status(500).json({ mensaje: "Error al procesar el inventario" });

    }
};