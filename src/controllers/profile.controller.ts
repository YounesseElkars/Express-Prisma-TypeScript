import { TuserUpdateSchema, userUpdateSchema } from '../types/zod';
import HttpStatusCode from '../utils/HttpStatusCode';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as UserService from '../services/user.service';

export const getUserProfile = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = {
      id: request.user?.id,
      fullName: request.user?.fullName,
      username: request.user?.username,
      email: request.user?.email,
    };
    return response.status(HttpStatusCode.OK).json({
      user: user,
    });
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

    return response.status(HttpStatusCode.OK).json({
      message: 'User Updated Succesfuly ',
      data: user,
    });
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

/*



export const validateLoginData = (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = request.body;
    userSchema.parse(data);
    next();
  } catch (error) {
    next(error);
  }
};




*/

/*
  const user = await userModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    message: 'Update User Profile',
  });
  
*/
