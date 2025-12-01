const pool = require('../db/conexion');

// Obtener todos los libros
async function getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books ORDER BY id');
    return rows;
}

// Obtener un libro por ID
async function getBooksById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return rows[0];
}

// Insertar nuevo libro
async function createBook(title, autor) {
    const { rows } = await pool.query(
        'INSERT INTO books (title, autor) VALUES ($1, $2) RETURNING id',
        [title, autor]
    );
    return rows[0].id;
}

// Actualizar libro existente
async function updateBook(id, title, autor) {
    const { rowCount } = await pool.query(
        'UPDATE books SET title = $1, autor = $2 WHERE id = $3',
        [title, autor, id]
    );
    return rowCount;
}

// Eliminar libro
async function deleteBook(id) {
    const { rowCount } = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return rowCount;
}

module.exports = {
    getAllBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook
};