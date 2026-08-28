import { Router } from 'express';
import multer from 'multer';
import { listImages, createImage, updateImage, deleteImage } from '../controllers/gallery.controller.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
const router = Router();

router.get('/', listImages);
router.post('/', requireAuth, upload.single('image'), createImage);
router.put('/:id', requireAuth, updateImage);
router.delete('/:id', requireAuth, deleteImage);

export default router;
