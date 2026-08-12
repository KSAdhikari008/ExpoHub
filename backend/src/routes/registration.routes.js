import { Router } from "express";
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { eventIdValidator } from '../middleware/validators/event.validator.js';
import { getRegistrations, registerToEvent, getRegistration } from "../controllers/registration.controller.js";
import { registrationIdValidator } from "../middleware/validators/registration.validator.js";


const router = Router();

router.get('/', authenticateToken, authorizeRole('Visitor','Admin'), getRegistrations);
router.get('/:registrationId', authenticateToken, authorizeRole('Visitor','Admin'), registrationIdValidator, validate, getRegistration);
router.post("/:eventId", authenticateToken, authorizeRole("Visitor"), eventIdValidator, validate, registerToEvent)


export default router;