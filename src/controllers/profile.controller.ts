import { TuserUpdateSchema, userUpdateSchema } from '../types/zod';
import HttpStatusCode from '../utils/HttpStatusCode';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as UserService from '../services/user.service';
import { sendSuccessResponse } from '../utils/responseHandler';

export const getUserProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = {
      id: request.user?.id,
      fullName: request.user?.fullName,
      username: request.user?.username,
      email: request.user?.email,
    };
    return sendSuccessResponse(response, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let userId = '';
    if (request.user) {
      userId = request.user?.id;
    }
    const data: TuserUpdateSchema = request.body;
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const dataWithHash = { ...data, password: hashedPassword };

    const user = await UserService.updateUserByID(userId, dataWithHash);
    return sendSuccessResponse(response, user);
  } catch (error) {
    next(error);
  }
};

export const validateUpdateUserProfile = (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = request.body;
    userUpdateSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};
