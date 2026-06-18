import * as modelo from './modelo.componentes.mjs'

export async function obtenerComponentes(req,res) {
    const  componentes = await modelo.obtenerComponentes()
    res.status(200).json(componentes)
    
}

export async function obtenerPorId(req,res) {
    const componentes = await modelo.obtenerPorId(req.params.id)
    res.status(200).json(componentes)
}

export async function calcularTotalInventario(req, res){
    try {
        // 1. Llamamos a la función que ya existe en tu modelo para traer todos los componentes
        const listaComponentes = await modelo.obtenerComponentes();
        
        // 2. Calculamos el valor total del inventario recorriendo la lista con .reduce()
        // Nos aseguramos de castear con Number() por si precio o stock vienen como texto desde la BD
        const total = listaComponentes.reduce((acc, item) => {
            return acc + (Number(item.precio) * Number(item.stock));
        }, 0);
        
        // 3. Respondemos al cliente con la estructura exacta que pide la consigna
        res.json({ 
            procedimiento: "Valorización de Inventario",
            resultado: `El valor total de los componentes en stock es $${total}`
        });

    } catch (error) {
        console.error("❌ Error al procesar el procedimiento de inventario:", error);
        res.status(500).json({ mensaje: "Error al procesar el inventario" });
    }
};