import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authorRouter from './routes/author.router';
import bookRouter from './routes/book.router';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
