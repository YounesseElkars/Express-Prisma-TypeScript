import express from 'express';
import * as ProfileController from '../controllers/profile.controller';
import { protectAuth } from '../middleware/auth-middleware';
const router = express.Router();

// Acess : Private
// GET : profile information ( fullName , username , email )
router.get('/', protectAuth, ProfileController.getUserProfile);

// Acess : Private
// PUT : Change profile information
// Params body : fullName , username , password , email
router.put('/', protectAuth, ProfileController.validateUpdateUserProfile, ProfileController.updateUserProfile);

export default router;
