import express from 'express';
// Importa el router que se definió en routes/componentes.mjs
import componentesRouter from './routes/componentes.mjs';

const app = express();
const PORT = 3000;

//Middleware que permite entender peticiones con JSON
app.use(express.json());

//Todas las rutas que empiecen con /api/componentes van a ser manejadas por componentesRouter
app.use('/api/componentes', componentesRouter);

//Este middleware se ejecuta SOLO si ninguna ruta anterior coincidió
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

//Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});