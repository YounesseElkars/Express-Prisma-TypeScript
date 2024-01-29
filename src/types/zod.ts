import { z } from 'zod';

// _____________  Author Schema  _____________

export const authorSchema = z.object({
  firstName: z.string().min(1, { message: 'Your first name must be at least 1 characters long' }).max(30, {
    message: 'your first name cannot be longer than 30 characters',
  }),
  lastName: z.string().min(1, { message: 'Your last name must be at least 1 characters long' }).max(30, {
    message: 'your last name cannot be longer than 30 characters',
  }),
});

// _____________  Book Schema  _____________

export const bookSchema = z.object({
  title: z.string().min(1, { message: 'title must be at least 1 characters long' }).max(250, {
    message: 'title cannot be longer than 250 characters',
  }),
  authorId: z.number(),
  datePublished: z.date(),
  isFiction: z.boolean(),
});

// _____________  User Schema  Login  _____________

const userBaseSchema = {
  username: z.string().min(1, { message: 'username must be at least 1 characters long' }).max(50, {
    message: 'username cannot be longer than 50 characters',
  }),
  password: z.string().min(1, { message: 'password must be at least 1 characters long' }).max(50, {
    message: 'password cannot be longer than 50 characters',
  }),
};

export const userSchema = z.object(userBaseSchema);

// _____________  User Update Schema   _____________

export const userUpdateSchema = z.object({
  ...userBaseSchema,
  fullName: z.string().min(1, { message: 'fullName must be at least 1 characters long' }).max(50, {
    message: 'fullName cannot be longer than 50 characters',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
});

// _____________  Export Types   _____________

export type TUserSchema = z.infer<typeof userSchema>;
export type TuserUpdateSchema = z.infer<typeof userUpdateSchema>;
