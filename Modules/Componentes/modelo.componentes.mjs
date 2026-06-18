import pool from '../../conexion.bd.mjs'

export async function  obtenerComponentes(){
    const resultado = await pool.query('SELECT * FROM componentes')
    return resultado.rows 
}

export async function obtenerPorId(id) {
    const resultado = await pool.query('SELECT * FROM componentes where id = $1',[id])
    return resultado.rows[0]
}