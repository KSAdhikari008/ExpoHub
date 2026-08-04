import { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/auth.controller.js";


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUser);


export default router;