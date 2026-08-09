import { Router } from "express";
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { eventIdValidator } from '../middleware/validators/event.validator.js';
import { getRegistrations, registerToEvent } from "../controllers/registration.controller.js";


const router = Router();

router.get('/', authenticateToken, authorizeRole('Visitor','Admin'), getRegistrations);
router.post("/:eventId", authenticateToken, authorizeRole("Visitor"), eventIdValidator, validate, registerToEvent)


export default router;