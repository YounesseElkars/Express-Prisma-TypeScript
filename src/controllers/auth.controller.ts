import HttpStatusCode from '../utils/HttpStatusCode';
import * as UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { TUserSchema, userSchema } from '../types/zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userRequest: TUserSchema = request.body;
    const user = await UserService.getUserByUsername(userRequest.username);

    if (!user) {
      return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Credentials Error (user)',
      });
    }

    const passwordCompare = await bcrypt.compare(userRequest.password, user.password);

    if (passwordCompare) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

      response.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.APP_ENV !== 'developement',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response.status(HttpStatusCode.OK).json({
        result: 'Login Successful',
        fullName: user.fullName,
        email: user.email,
      });
    } else {
      return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Credentials Error (password)',
      });
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

    return response.status(HttpStatusCode.OK).json({
      message: 'User logged out',
    });
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
