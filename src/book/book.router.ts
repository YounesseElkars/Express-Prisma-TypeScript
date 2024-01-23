import express from 'express';
import type { Request, Response } from 'express';
import * as BookService from './book.service';
import HttpStatusCode from '../utils/HttpStatusCode';
import { bookSchema } from '../types/zod';
import { z } from 'zod';

export const bookRouter = express.Router();

// GET: List all the books
bookRouter.get('/', async (request: Request, response: Response) => {
  try {
    const books = await BookService.listBooks();
    return response.status(HttpStatusCode.OK).json(books);
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

// GET : Get One book by ID
// Params query : id
bookRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const book = await BookService.getBook(id);
    if (book) {
      return response.status(HttpStatusCode.OK).json(book);
    }
    return response.status(HttpStatusCode.NOT_FOUND).json({
      status: 'Error',
      message: 'Book Not Found',
    });
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

// POST : Create one book
// Params body : title , authorId , datePublished , isFiction
bookRouter.post('/', async (request: Request, response: Response) => {
  try {
    const book = request.body;
    book.datePublished = new Date(book.datePublished);

    const data = bookSchema.parse(book);

    const newBook = await BookService.createBook(data);
    return response.status(HttpStatusCode.CREATED).json(newBook);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return response
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ success: false, errors: error.errors.map((e: any) => e.message) });
    } else {
      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
});

// PUT : update one book
// Params body : title , authorId , datePublished , isFiction
bookRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    // Check if the book exist
    const existingBook = await BookService.getBook(id);
    if (!existingBook) {
      return response.status(HttpStatusCode.NOT_FOUND).json({ success: false, error: 'Book does not exist' });
    }
    const book = request.body;
    book.datePublished = new Date(book.datePublished);
    const data = bookSchema.parse(book);
    const updateBook = await BookService.updateBook(data, id);
    return response.status(HttpStatusCode.OK).json(updateBook);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return response
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ success: false, errors: error.errors.map((e: any) => e.message) });
    } else {
      return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
});

// DELETE : delete a book
// Params query : id
bookRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    // Check if the book exist
    const existingBook = await BookService.getBook(id);
    if (!existingBook) {
      return response.status(HttpStatusCode.NOT_FOUND).json({ success: false, error: 'Book does not exist' });
    }
    await BookService.deleteBook(id);
    return response.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Author has been deleted',
    });
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});
