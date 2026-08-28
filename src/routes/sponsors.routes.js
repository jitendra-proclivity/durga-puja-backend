import { Router } from 'express';
import multer from 'multer';
import { listSponsors, createSponsor, updateSponsor, deleteSponsor } from '../controllers/sponsors.controller.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 } });
const router = Router();

router.get('/', listSponsors);
router.post('/', requireAuth, upload.single('logo'), createSponsor);
router.put('/:id', requireAuth, upload.single('logo'), updateSponsor);
router.delete('/:id', requireAuth, deleteSponsor);

export default router;
