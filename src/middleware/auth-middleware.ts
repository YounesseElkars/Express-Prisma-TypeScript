import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCode from '../utils/HttpStatusCode';

const protectAuth = async (request: Request, response: Response, next: NextFunction) => {
  const allCookies = request.cookies;
  const token = allCookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const authUser = await UserService.getUserByID(decoded.id);
      if (authUser?.username) {
        request.user = authUser;
      }
      next();
    } catch (error: any) {
      console.log(JSON.stringify(error));
      console.log(typeof error);

      next(error);
    }
  } else {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Unauthorized - you need to login' });
  }
};

export { protectAuth };
