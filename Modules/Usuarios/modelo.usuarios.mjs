import pool from '../../conexion.bd.mjs'

export async function  obtenerUsuario(nombreUsuario){
    const resultado = await pool.query('SELECT * FROM usuarios where username = $1', [nombreUsuario])
    return resultado.rows[0] 
}