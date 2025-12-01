//routes/bookRoutes.js
const express = require('express');
const router = express.Router();

//Aqui iran las rutas relacionadas con los libros
const {
    getBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/booksController');

router.get('/', getBooks);
router.get('/:id', getBooksById);
router.post('/createBook', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);



module.exports = router; // <- IMPORTANTE