import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import HttpStatusCode from '../utils/HttpStatusCode';
import { JsonWebTokenError } from 'jsonwebtoken';

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  // Log the error stack for debugging purposes

  /*

   REPLACE IT WITH WINSTON
    console.error(error.stack);
  */

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return response
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ success: false, errors: error.errors.map((e: any) => e.message) });
  }

  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const res =
      process.env.APP_ENV == 'developement'
        ? { error: 'Prisma Error occurred', details: error }
        : { error: 'Error occurred' };

    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(res);
  }

  // Handle Json Web Token Error
  if (error instanceof JsonWebTokenError) {
    const res =
      process.env.APP_ENV == 'developement'
        ? { error: 'Json Web Token Error occurred', message: error }
        : { error: 'Error occurred' };

    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(res);
  }

  // Handle other types of errors
  const res =
    process.env.APP_ENV == 'developement'
      ? { success: false, error: 'Internal Server Error', message: error.message }
      : { success: false, error: 'Internal Server Error' };
  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(res);
};
