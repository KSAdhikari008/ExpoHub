import { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../middleware/validators/authValidator.js";
import { validate } from "../middleware/validate.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const router = Router();

router.post('/register', registerValidator, validate, registerUser); // (all)
router.post('/login', loginValidator, validate, loginUser); // (all)
router.get('/me', authenticateToken, getUser); // get current user role (any user)


export default router;