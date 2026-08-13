import { Router } from "express";
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { eventIdValidator } from '../middleware/validators/event.validator.js';
import { getRegistrations, registerToEvent, getRegistration, deleteRegistration } from "../controllers/registration.controller.js";
import { registrationIdValidator } from "../middleware/validators/registration.validator.js";


const router = Router();

router.get('/', authenticateToken, authorizeRole('Visitor'), getRegistrations);
router.get('/:eventId', authenticateToken, authorizeRole('Visitor'), eventIdValidator, validate, getRegistration);
router.delete('/:registrationId', authenticateToken, authorizeRole('Visitor','Admin'), registrationIdValidator, validate, deleteRegistration)
router.post("/:eventId", authenticateToken, authorizeRole("Visitor"), eventIdValidator, validate, registerToEvent)


export default router;