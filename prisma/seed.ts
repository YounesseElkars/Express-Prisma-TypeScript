import { Author, Book } from '.prisma/client';
import { db } from '../src/utils/db.server';

type TAuthor = Omit<Author, 'id' | 'createdAt' | 'updatedAt'>;
type TBook = Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>;

function getAuthors(): Array<TAuthor> {
  return [
    { firstName: 'john', lastName: 'doe' },
    { firstName: 'william', lastName: 'william' },
  ];
}

function getBooks(): Array<TBook> {
  return [
    {
      title: 'Book 1',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'Book 2',
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  const author = await db.author.findFirst({
    where: {
      firstName: 'william',
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { datePublished, isFiction, title } = book;
      return db.book.create({
        data: {
          datePublished,
          isFiction,
          title,
          authorId: author?.id || 0,
        },
      });
    })
  );
}

seed();
