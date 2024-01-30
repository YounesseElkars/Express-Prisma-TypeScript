import * as UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { TUserSchema, userSchema } from '../types/zod';
import { sendSuccessNoDataResponse, sendSuccessResponse, sendUnauthorizedResponse } from '../utils/responseHandler';
import { comparePasswords } from '../utils/bcryptHandler';
import { generateToken } from '../utils/jwtHandler';

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userRequest: TUserSchema = request.body;
    const user = await UserService.getUserByUsername(userRequest.username);

    if (!user) {
      return sendUnauthorizedResponse(response, 'Credentials Error');
    }

    const passwordCompare = await comparePasswords(userRequest.password, user.password);

    if (passwordCompare) {
      const token = generateToken({ id: user.id }, '30d');

      response.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.APP_ENV !== 'developement',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const responseData = {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      };
      return sendSuccessResponse(response, responseData);
    } else {
      return sendUnauthorizedResponse(response, 'Credentials Error');
    }
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (request: Request, response: Response, next: NextFunction) => {
  try {
    response.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return sendSuccessNoDataResponse(response, 'Logout Successful');
  } catch (error) {
    next(error);
  }
};

// Middlewares ________________________

export const validateLoginData = (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = request.body;
    userSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};
