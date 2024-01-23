import { Author, Book } from '@prisma/client';

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
