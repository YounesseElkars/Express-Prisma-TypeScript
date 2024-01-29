import express from 'express';
import * as BookController from '../controllers/book.controller';

const router = express.Router();

// Acess : Public
// GET: List all the books
router.get('/', BookController.listBooks);

// Acess : Public
// GET : Get One book by ID
// Params query : id
router.get('/:id', BookController.checkExistingBook, BookController.getBook);

// Acess : Private
// POST : Create one book
// Params body : title , authorId , datePublished , isFiction
router.post('/', BookController.validateBookData, BookController.checkExistingBookAuthor, BookController.createBook);

// Acess : Private
// PUT : update one book
// Params query : id
// Params body : title , authorId , datePublished , isFiction
router.put(
  '/:id',
  BookController.validateBookData,
  BookController.checkExistingBook,
  BookController.checkExistingBookAuthor,
  BookController.updateBook
);

// Acess : Private
// DELETE : delete a book
// Params query : id
router.delete('/:id', BookController.checkExistingBook, BookController.deleteBook);

export default router;
