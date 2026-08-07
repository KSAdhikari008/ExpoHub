import { Router } from 'express'
import {getEvents, postEvent, getEvent} from '../controllers/event.controller.js';
import { uploadImage } from '../middleware/multer.middleware.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { eventValidator } from '../middleware/validators/event.validator.js';

const router = Router();

router.get("/", getEvents); // access to all
router.post(
  "/",
  authenticateToken,
  authorizeRole("Admin"),
  uploadImage.single("banner"), // once req.file and req.body are available validate
  eventValidator,
  validate,
  postEvent
); // (admin)
router.get("/:eventId", getEvent);


export default router;