import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from '../utils/HttpStatusCode';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  return response.status(HttpStatusCode.NOT_FOUND).json({
    Requested_URL: request.originalUrl,
    success: false,
    error: 'Error 404 - Not Found',
  });
};
