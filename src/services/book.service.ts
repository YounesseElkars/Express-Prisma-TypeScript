import { db } from '../utils/db.server';
import { TBookID, TBookRead, TBookWrite } from '../types/general';

export const listBooks = async (): Promise<TBookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const getBook = async (id: TBookID): Promise<TBookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const createBook = async (book: TBookWrite): Promise<TBookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parsedDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parsedDate,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const updateBook = async (book: TBookWrite, id: TBookID): Promise<TBookRead> => {
  const { title, isFiction, datePublished, authorId } = book;
  return db.book.update({
    where: {
      id,
    },
    data: {
      title,
      isFiction,
      datePublished,
      authorId,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const deleteBook = async (id: TBookID): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};
