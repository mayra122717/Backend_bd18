const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const db = require('./db'); // ← ESTA LÍNEA ES FUNDAMENTAL

app.use(cors({
  origin: 'https://frontend-bd18.vercel.app', // tu dominio exacto de Vercel
  credentials: true // solo si usas cookies/autenticación
}));

const authRoutes = require('./routes/auth');
app.use(express.json());
app.use('/api', authRoutes);

// Ruta de prueba de conexión a PostgreSQL
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error('Error conectando a la base de datos:', err.message);
    res.status(500).send('Error de conexión con la base de datos');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
