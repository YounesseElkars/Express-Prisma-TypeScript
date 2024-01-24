import express from 'express';
import * as AuthorController from '../controllers/author.controller';

const router = express.Router();

// GET : Get List of all authors
router.get('/', AuthorController.listAuthors);

// GET : Get One author by ID
// Params query : id
router.get('/:id', AuthorController.checkExistingAuthor, AuthorController.getAuthor);

// POST : Create one author
// Params body : firstName , lastName
router.post('/', AuthorController.createAuthor);

// PUT : update an author
// Params query : id
// Params body : firstName , lastName
router.put('/:id', AuthorController.checkExistingAuthor, AuthorController.updateAuthor);

// DELETE : delete an author
// Params query : id
router.delete('/:id', AuthorController.checkExistingAuthor, AuthorController.deleteAuthor);

export default router;
