import HttpStatusCode from '../utils/HttpStatusCode';
import * as AuthorService from '../services/author.service';
import { NextFunction, Request, Response } from 'express';
import { authorSchema } from '../types/zod';
import { TAuthorWrite } from '../types/general';

export const listAuthors = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(HttpStatusCode.OK).json(authors);
  } catch (error: any) {
    next(error);
  }
};

export const getAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author = await AuthorService.getAuthor(id);
    return response.status(HttpStatusCode.OK).json(author);
  } catch (error: any) {
    next(error);
  }
};

export const createAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const author: TAuthorWrite = request.body;
    const newAuthor = await AuthorService.createAuthor(author);
    return response.status(HttpStatusCode.CREATED).json(newAuthor);
  } catch (error: any) {
    next(error);
  }
};

export const updateAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author: TAuthorWrite = request.body;
    const updatedAuthor = await AuthorService.updateAuthor(author, id);
    return response.status(HttpStatusCode.OK).json(updatedAuthor);
  } catch (error: any) {
    next(error);
  }
};

export const deleteAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    await AuthorService.deleteAuthor(id);
    return response.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Author has been deleted',
    });
  } catch (error: any) {
    next(error);
  }
};

export const checkExistingAuthor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author = await AuthorService.getAuthor(id);
    if (!author) {
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

export const validateAuthorData = (request: Request, response: Response, next: NextFunction) => {
  try {
    const author = request.body;
    authorSchema.parse(author);
    next();
  } catch (error) {
    next(error);
  }
};
