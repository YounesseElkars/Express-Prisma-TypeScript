import express from 'express';
import type { Request, Response } from 'express';
import * as AuthorService from './author.service';
import HttpStatusCode from '../utils/HttpStatusCode';
import { authorSchema } from '../types/zod';
import { z } from 'zod';

export const authorRouter = express.Router();

// GET : Get List of all authors
authorRouter.get('/', async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(HttpStatusCode.OK).json(authors);
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

// GET : Get One author by ID
// Params query : id
authorRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return response.status(HttpStatusCode.OK).json(author);
    }
    return response.status(HttpStatusCode.NOT_FOUND).json({
      status: 'Error',
      message: 'Author Not Found',
    });
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});

// POST : Create one author
// Params body : firstName , lastName
authorRouter.post('/', async (request: Request, response: Response) => {
  try {
    const author = request.body;
    const data = authorSchema.parse(author);
    const newAuthor = await AuthorService.createAuthor(data);
    return response.status(HttpStatusCode.CREATED).json(newAuthor);
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

// PUT : update an author
// Params query : id
// Params body : firstName , lastName
authorRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    // Check if the author exist
    const existingAuthor = await AuthorService.getAuthor(id);
    if (!existingAuthor) {
      return response.status(HttpStatusCode.NOT_FOUND).json({ success: false, error: 'Author does not exist' });
    }
    const author = request.body;
    const data = authorSchema.parse(author);
    const updatedAuthor = await AuthorService.updateAuthor(data, id);
    return response.status(HttpStatusCode.OK).json(updatedAuthor);
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

// DELETE : delete an author
// Params query : id
authorRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    // Check if the author exist
    const existingAuthor = await AuthorService.getAuthor(id);
    if (!existingAuthor) {
      return response.status(HttpStatusCode.NOT_FOUND).json({ success: false, error: 'Author does not exist' });
    }
    await AuthorService.deleteAuthor(id);
    return response.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Author has been deleted',
    });
  } catch (error: any) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error.message);
  }
});
