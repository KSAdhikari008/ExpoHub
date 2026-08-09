import { Router } from 'express'
import {getEvents, postEvent, getEvent} from '../controllers/event.controller.js';
import { uploadImage }
 from '../middleware/multer.middleware.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { eventValidator, eventIdValidator } from '../middleware/validators/event.validator.js';

const router = Router();

router.get("/", getEvents); // (all)
router.get("/:eventId", eventIdValidator, validate, getEvent ); // (all)
router.post("/", authenticateToken, authorizeRole("Admin"), uploadImage.single("banner"), eventValidator, validate, postEvent );// validation after upload,req.file and req.body are available validate


export default router;