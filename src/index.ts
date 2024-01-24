import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authorRouter from './routes/author.router';
import bookRouter from './routes/book.router';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// CORS Middleware
app.use(cors());
// JSON Middleware
app.use(express.json());

// Main Routes
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

// Not Found Middleware
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
