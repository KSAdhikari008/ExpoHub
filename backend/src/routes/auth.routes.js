import { Router } from "express";
import { loginUser, registerUser, getUser } from "../controllers/auth.controller.js";
import { registerValidation } from "../middleware/validators/authValidator.js";
import { validate } from "../middleware/validate.js";


const router = Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginUser);
router.get('/me', getUser);


export default router;