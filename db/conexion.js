// db/conexion.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Necesario para Supabase
  }
});

// Probar conexión (opcional pero útil)
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL en Supabase');
});

pool.on('error', (err) => {
  console.error('❌ Error en la conexión PostgreSQL:', err.message);
});

module.exports = pool;