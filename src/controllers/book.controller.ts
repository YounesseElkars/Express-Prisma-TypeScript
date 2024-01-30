import HttpStatusCode from '../utils/HttpStatusCode';
import * as BookService from '../services/book.service';
import * as AuthorService from '../services/author.service';
import { NextFunction, Request, Response } from 'express';
import { bookSchema } from '../types/zod';
import { TBookWrite } from '../types/general';
import { sendNotFoundResponse, sendSuccessNoDataResponse, sendSuccessResponse } from '../utils/responseHandler';

export const listBooks = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const books = await BookService.listBooks();
    return sendSuccessResponse(response, books);
  } catch (error: any) {
    next(error);
  }
};

export const getBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const book = await BookService.getBook(id);
    return sendSuccessResponse(response, book);
  } catch (error: any) {
    next(error);
  }
};

export const createBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const book: TBookWrite = request.body;
    book.datePublished = new Date(book.datePublished);
    const newBook = await BookService.createBook(book);
    return sendSuccessResponse(response, newBook, HttpStatusCode.CREATED);
  } catch (error: any) {
    next(error);
  }
};

export const updateBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const book: TBookWrite = request.body;
    book.datePublished = new Date(book.datePublished);
    const updateBook = await BookService.updateBook(book, id);
    return sendSuccessResponse(response, updateBook);
  } catch (error: any) {
    next(error);
  }
};

export const deleteBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    await BookService.deleteBook(id);
    return sendSuccessNoDataResponse(response, 'Book has been deleted');
  } catch (error: any) {
    next(error);
  }
};

export const checkExistingBook = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const existingBook = await BookService.getBook(id);
    if (!existingBook) {
      return sendNotFoundResponse(response, 'Book Not Found');
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
      return sendNotFoundResponse(response, 'Author Not Found');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateBookData = (request: Request, response: Response, next: NextFunction) => {
  try {
    const book = request.body;
    book.datePublished = new Date(book.datePublished);
    bookSchema.parse(book);
    next();
  } catch (error) {
    next(error);
  }
};
