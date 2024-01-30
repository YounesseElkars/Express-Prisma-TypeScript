import express from 'express';
import * as AuthorController from '../controllers/author.controller';
import { protectAuth } from '../middleware/auth-middleware';

const router = express.Router();

// Acess : Public
// GET : Get List of all authors
router.get('/', AuthorController.listAuthors);

// Acess : Public
// GET : Get One author by ID
// Params query : id
router.get('/:id', AuthorController.checkExistingAuthor, AuthorController.getAuthor);

// Acess : Private
// POST : Create one author
// Params body : firstName , lastName
router.post('/', protectAuth, AuthorController.validateAuthorData, AuthorController.createAuthor);

// Acess : Private
// PUT : update an author
// Params query : id
// Params body : firstName , lastName
router.put(
  '/:id',
  protectAuth,
  AuthorController.validateAuthorData,
  AuthorController.checkExistingAuthor,
  AuthorController.updateAuthor
);

// Acess : Private
// DELETE : delete an author
// Params query : id
router.delete('/:id', protectAuth, AuthorController.checkExistingAuthor, AuthorController.deleteAuthor);

export default router;
