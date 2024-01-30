import * as UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { sendBadRequestResponse } from '../utils/responseHandler';
import { verifyToken } from '../utils/jwtHandler';

const protectAuth = async (request: Request, response: Response, next: NextFunction) => {
  const allCookies = request.cookies;
  const token = allCookies.jwt;
  if (token) {
    try {
      const decoded = verifyToken(token);
      const authUser = await UserService.getUserByID(decoded.id);
      if (authUser?.username) {
        request.user = authUser;
      }
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    return sendBadRequestResponse(response, 'Unauthorized - you need to login');
  }
};

export { protectAuth };
