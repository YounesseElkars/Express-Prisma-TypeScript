import { Author, Book, User } from '@prisma/client';

// _____________  Author Types  _____________

export type TAuthorID = Author['id'];
export type TAuthorRead = Omit<Author, 'createdAt' | 'updatedAt'>;
export type TAuthorWrite = Omit<Author, 'id' | 'createdAt' | 'updatedAt'>;

// _____________  Book Types  _____________

export type TBookID = Book['id'];
export type TBookRead = Pick<Book, 'id' | 'title' | 'datePublished' | 'isFiction'> & {
  author: TAuthorRead;
};
export type TBookWrite = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;

// _____________  User Types  _____________
export type TUserRegisterWrite = Omit<User, 'createdAt' | 'updatedAt'>;
export type TloginRead = Omit<User, 'createdAt' | 'updatedAt'>;
export type TloginRequest = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
