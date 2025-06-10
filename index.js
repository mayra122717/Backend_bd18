const express = require('express');
const app = express();
const dotenv = require('dotenv');
//cors para poder realizar peticiones desde una API de otro dominio React
const cors = require('cors')
dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173'
}));

const authRoutes = require('./routes/auth');

app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));