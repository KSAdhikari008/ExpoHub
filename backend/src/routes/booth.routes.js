import { Router } from 'express'
import multer from 'multer';
import { getEventBooths, getBooth, createBooth, deleteBooth, bookBooth, removeBooking } from '../controllers/booth.controller.js';
import { uploadImage } from '../middleware/multer.middleware.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { boothValidator, boothIdValidator } from '../middleware/validators/booth.validator.js';
import { eventIdValidator } from '../middleware/validators/event.validator.js';

const router = Router();

router.get('/:eventId', authenticateToken, authorizeRole('Admin','Exhibitor'), eventIdValidator, validate, getEventBooths); // (Admin)
router.get('/:boothId', authenticateToken, authorizeRole('Exhibitor', 'Admin'), boothIdValidator, validate, getBooth)
router.post("/", authenticateToken, authorizeRole("Admin"), uploadImage.single("poster"), boothValidator, validate, createBooth );
router.delete('/:boothId', authenticateToken, authorizeRole("Admin"), boothIdValidator, validate, deleteBooth );
router.patch('/booking/:boothId', authenticateToken, authorizeRole("Exhibitor",'Admin'), boothIdValidator, validate, bookBooth );
router.patch('/removeBooking/:boothId', authenticateToken, authorizeRole('Exhibitor','Admin'), boothIdValidator, validate, removeBooking)

export default router;