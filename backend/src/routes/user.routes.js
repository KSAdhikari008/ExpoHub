import { Router } from 'express'
import {getUser, getUsers, getUserById, patchUser} from '../controllers/user.controller.js';
import { authorizeRole, authenticateToken } from '../middleware/auth.middleware.js';
const router = Router();

router.get('/', authenticateToken, authorizeRole('Admin'), getUsers) // return all users. Used by Admin
router.get('/me', authenticateToken,  getUser) // return current authenticated user. Used by any user. 
router.get('/:userId', authenticateToken, authorizeRole('Admin'), getUserById); // Used by Admin.

// router.patch('/:id', patchUser) // work on later.

export default router;