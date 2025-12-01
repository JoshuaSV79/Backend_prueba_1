// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');
const pool = require('./db/conexion'); // <-- Importamos la conexión
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Ruta base
app.get('/', (req, res) => {
res.send(' API BookLibrary funcionando correctamente');
});
// Rutas principales
app.use('/api/books', booksRoutes);
// Funcion que hace una consulta de prueba mínima que
// confirma que todo el circuito conexión → consulta → respuesta está funcionando
async function testConnection() {
try {
const [rows] = await pool.query('SELECT 1 + 1 AS result'); //Le pide a MySQL que sume 1 + 1, y le ponga el alias result al valor
console.log(' Conexión a la base de datos establecida. Resultado:', rows[0].result);
} catch (error) {
console.error(' Error al conectar con la base de datos:', error.message);
}
}
// Iniciar servidor y probar conexión
app.listen(PORT, async () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
await testConnection(); // <--------------------- se ejecuta al arrancar el servidor
});
console.log('Joshua Veloz')
/**
¿Por qué usar algo tan simple? como testConnection()
Porque:
No requiere tablas existentes.
(Así evita errores si la BD aún no tiene tablas creadas.)
Prueba que el servidor MySQL está respondiendo.
Verifica que las credenciales del .env funcionan.
Confirma que el pool de mysql2/promise puede ejecutar consultas.
*/