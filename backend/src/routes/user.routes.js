import { Router } from 'express'
import {getUser, getUsers, getUserById, patchUser} from '../controllers/user.controller.js';
import { authorizeRole, authenticateToken } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { userIdValidator } from '../middleware/validators/user.validator.js';
const router = Router();

router.get('/', authenticateToken, authorizeRole('Admin'), getUsers) // (Admin)
router.get('/me', authenticateToken,  getUser) // return logged in user. (any) 
router.get('/:userId', authenticateToken, authorizeRole('Admin'), userIdValidator, validate, getUserById); // (admin)

// router.patch('/:id', patchUser) // work on later.

export default router;