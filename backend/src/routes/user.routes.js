import { Router } from 'express'
import {getUser, postUser, patchUser} from '../controllers/user.controller.js';
const router = Router();

router.get('/', getUser)
router.post('/', postUser)
router.patch('/:id', patchUser)

export default router;