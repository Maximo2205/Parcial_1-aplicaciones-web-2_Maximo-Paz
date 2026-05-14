import express from 'express';
import componentesRouter from './routes/componentes.mjs';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/componentes', componentesRouter);

app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});