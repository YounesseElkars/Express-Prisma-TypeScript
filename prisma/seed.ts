import { hashPassword } from './../src/utils/bcryptHandler';
import { TAuthorWrite, TBookWrite, TUserRegisterWrite } from '../src/types/general';
import { db } from '../src/utils/db.server';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function getUser(): Promise<TUserRegisterWrite> {
  const password = 'admin';
  const hashedPassword = await hashPassword(password);
  return {
    id: uuidv4(),
    fullName: 'john doe',
    username: 'admin',
    password: hashedPassword,
    email: 'email@company.com',
  };
}

function getAuthors(): Array<TAuthorWrite> {
  return [
    { firstName: 'john', lastName: 'doe' },
    { firstName: 'william', lastName: 'parker' },
  ];
}

function getBooks(): Array<Omit<TBookWrite, 'authorId'>> {
  return [
    {
      title: 'Book 1',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'Book 2',
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}

async function seed() {
  // Delete user Records
  await db.user.deleteMany();
  console.log('Deleted records in user table');

  // Seed new user
  const user = await getUser();
  console.log(`[*] Seeding Author : ${JSON.stringify(user)}`);
  console.log(`[*] password : admin `);
  await db.user.create({
    data: {
      ...user,
    },
  });

  //Seed Author
  await Promise.all(
    getAuthors().map((author) => {
      console.log(`[*] Seeding Author : ${JSON.stringify(author)}`);
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

  // Seed book
  await Promise.all(
    getBooks().map((book) => {
      const createBook = {
        datePublished: book.datePublished,
        isFiction: book.isFiction,
        title: book.title,
        authorId: author?.id || 0,
      };
      console.log(`[*] Seeding Book : ${JSON.stringify(createBook)}`);
      return db.book.create({
        data: {
          ...createBook,
        },
      });
    })
  );
}

seed();
