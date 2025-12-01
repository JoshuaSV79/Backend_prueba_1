require('dotenv').config();
const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para producción
const corsOptions = {
  origin: [
    'https://joshuasv79.github.io',  // Tu GitHub Pages
    'http://localhost:5500',          // Live Server local
    'http://127.0.0.1:5500'          // Alternativa local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.json({ 
    message: 'API BookLibrary funcionando',
    endpoints: {
      getAll: 'GET /api/books',
      getById: 'GET /api/books/:id',
      create: 'POST /api/books/createBook',
      update: 'PUT /api/books/:id',
      delete: 'DELETE /api/books/:id'
    }
  });
});

// Rutas principales
app.use('/api/books', booksRoutes);

// Ruta para verificar conexión BD
app.get('/api/health', async (req, res) => {
  try {
    const pool = require('./db/conexion');
    await pool.query('SELECT 1');
    res.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Manejar errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejar errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
  console.log(`🌐 Frontend: https://joshuasv79.github.io`);
  console.log(`📚 API: http://localhost:${PORT}/api/books`);
});