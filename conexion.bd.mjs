import { Pool } from 'pg'

// Configuración del Pool usando variables de entorno
const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT,
});
export default pool

// Verificación inicial de la conexión
/*pool.connect((err, client, done) => {
    if (err) {
        console.error('❌ Error al conectar a PostgreSQL:', err.message);
        console.log('💡 Consejo: Revisá si el contenedor Docker de la BD está activo.');
    } else {
        console.log('✅ Conexión establecida de forma segura con PostgreSQL');
        done();
    }
});*/