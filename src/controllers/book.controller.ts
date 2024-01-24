import HttpStatusCode from '../utils/HttpStatusCode';
import * as BookService from '../services/book.service';
import * as AuthorService from '../services/author.service';
import { NextFunction, Request, Response } from 'express';
import { bookSchema } from '../types/zod';

export const listBooks = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const books = await BookService.listBooks();
    return response.status(HttpStatusCode.OK).json(books);
  } catch (error: any) {
    next(error);
  }
};

export const getBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const book = await BookService.getBook(id);
    return response.status(HttpStatusCode.OK).json(book);
  } catch (error: any) {
    next(error);
  }
};

export const createBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const book = request.body;
    book.datePublished = new Date(book.datePublished);
    const data = bookSchema.parse(book);
    const newBook = await BookService.createBook(data);
    return response.status(HttpStatusCode.CREATED).json(newBook);
  } catch (error: any) {
    next(error);
  }
};

export const updateBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const book = request.body;
    book.datePublished = new Date(book.datePublished);
    const data = bookSchema.parse(book);
    const updateBook = await BookService.updateBook(data, id);
    return response.status(HttpStatusCode.OK).json(updateBook);
  } catch (error: any) {
    next(error);
  }
};

export const deleteBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    await BookService.deleteBook(id);
    return response.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Author has been deleted',
    });
  } catch (error: any) {
    next(error);
  }
};

export const checkExistingBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const existingBook = await BookService.getBook(id);
    if (!existingBook) {
      return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Book Not Found',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const checkExistingBookAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorId: number = request.body.authorId;

    const existingAuthor = await AuthorService.getAuthor(authorId);

    if (!existingAuthor) {
      return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Author Not Found',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
