import express from 'express';
import * as BookController from '../controllers/book.controller';

const router = express.Router();

// GET: List all the books
router.get('/', BookController.listBooks);

// GET : Get One book by ID
// Params query : id
router.get('/:id', BookController.getBook);

// POST : Create one book
// Params body : title , authorId , datePublished , isFiction
router.post('/', BookController.createBook);

// PUT : update one book
// Params body : title , authorId , datePublished , isFiction
router.put('/:id', BookController.updateBook);

// DELETE : delete a book
// Params query : id
router.delete('/:id', BookController.deleteBook);

export default router;
