import { Request, Response, NextFunction } from 'express';
import { sendNotFoundResponse } from '../utils/responseHandler';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  const notFoundMessage = {
    Requested_URL: request.originalUrl,
    success: false,
    error: 'Error 404 - Not Found',
  };
  return sendNotFoundResponse(response, notFoundMessage);
};
