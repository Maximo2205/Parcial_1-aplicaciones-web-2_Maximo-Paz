import pool from '../../conexion.bd.mjs'

//1. Obtiene todos los componentes desde la base de datos
export async function  obtenerComponentes(){
    const resultado = await pool.query('SELECT * FROM componentes')
    return resultado.rows 
}

//2. Obtiene los componentes por id desde la base de datos
export async function obtenerPorId(id) {
    const resultado = await pool.query('SELECT * FROM componentes where id = $1',[id])
    return resultado.rows[0]
}