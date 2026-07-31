import { Router } from 'express'
import multer from 'multer';
import {getEvents, postEvent, getEvent} from '../controllers/event.controller.js';

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10*1024*1024 // size limited to 10mb.
    }}); // multer stores the uploaded file temporarily in RAM instead of saving it to your server's disk.

router.get('/', getEvents);
router.post('/', upload.single('banner'), postEvent);
router.get('/:eventId', getEvent);


export default router;