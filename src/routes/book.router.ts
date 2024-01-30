import express from 'express';
import * as BookController from '../controllers/book.controller';
import { protectAuth } from '../middleware/auth-middleware';

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
router.post(
  '/',
  protectAuth,
  BookController.validateBookData,
  BookController.checkExistingBookAuthor,
  BookController.createBook
);

// Acess : Private
// PUT : update one book
// Params query : id
// Params body : title , authorId , datePublished , isFiction
router.put(
  '/:id',
  protectAuth,
  BookController.validateBookData,
  BookController.checkExistingBook,
  BookController.checkExistingBookAuthor,
  BookController.updateBook
);

// Acess : Private
// DELETE : delete a book
// Params query : id
router.delete('/:id', protectAuth, BookController.checkExistingBook, BookController.deleteBook);

export default router;
