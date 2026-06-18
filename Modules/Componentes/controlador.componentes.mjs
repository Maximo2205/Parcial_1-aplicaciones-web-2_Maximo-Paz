import * as modelo from './modelo.componentes.mjs'

//1. Obtener todos los componentes
export async function obtenerComponentes(req, res) {
    try {
        const componentes = await modelo.obtenerComponentes();
        res.status(200).json(componentes);

    } catch (error) {
        console.error("❌ Error en obtenerComponentes:", error);
        res.status(500).json({ error: "Error interno al obtener los componentes" });
    }
}

//2. Obtener los componentes por id
export async function obtenerPorId(req, res) {
    try {
        const componentes = await modelo.obtenerPorId(req.params.id);
        res.status(200).json(componentes);

    } catch (error) {
        console.error("❌ Error en obtenerPorId:", error);
        res.status(500).json({ error: "Error interno al buscar el componente" });
    }
}

//3. Es el procedimiento encarcado de calcular el precio total de todos los componentes del inventario
export async function calcularTotalInventario(req, res){
    try {
        // 1. Llama a la función que ya existe en tu modelo para traer todos los componentes
        const listaComponentes = await modelo.obtenerComponentes();
        
        // 2. Calcula el valor total del inventario recorriendo la lista con .reduce()
        // Nos aseguramos de castear con Number() por si precio o stock vienen como texto desde la BD
        const total = listaComponentes.reduce((acc, item) => {
            return acc + (Number(item.precio) * Number(item.stock));
        }, 0);
        
        // 3. Responde al cliente con la estructura exacta que pide la consigna
        res.json({ 
            procedimiento: "Valorización de Inventario",
            resultado: `El valor total de los componentes en stock es $${total}`
        });

    } catch (error) {
        console.error("❌ Error al procesar el procedimiento de inventario:", error);
        res.status(500).json({ mensaje: "Error al procesar el inventario" });
    }
};