const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');

// Libros
router.get('/books', bookController.getAllBooks);
router.get('/books/filter/by-pages', bookController.getBooksByPageCount);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Autores
router.get('/authors', authorController.getAllAuthors);
router.get('/authors/filter/by-birth-year', authorController.getAuthorsByBirthYear);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.createAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;
