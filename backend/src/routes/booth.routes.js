import { Router } from 'express'
import multer from 'multer';
import { getBooths, createBooth, deleteBooth } from '../controllers/booth.controller.js';
import { uploadImage } from '../middleware/multer.middleware.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { boothValidator, boothIdValidator } from '../middleware/validators/booth.validator.js';

const router = Router();

router.get('/', authenticateToken, authorizeRole('Admin'), getBooths); // (Admin)
router.post("/", authenticateToken, authorizeRole("Admin"), uploadImage.single("poster"), boothValidator, validate, createBooth );
router.delete('/:boothId', authenticateToken, authorizeRole("Admin"), boothIdValidator, validate, deleteBooth );

// make bookBooth api for exhibitor.


export default router;