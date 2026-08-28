import { Router } from 'express';
import multer from 'multer';
import { listEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.controller.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
const router = Router();

router.get('/', listEvents);
router.post('/', requireAuth, upload.single('image'), createEvent);
router.put('/:id', requireAuth, upload.single('image'), updateEvent);
router.delete('/:id', requireAuth, deleteEvent);

export default router;
