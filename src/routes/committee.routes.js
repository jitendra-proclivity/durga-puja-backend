import { Router } from 'express';
import multer from 'multer';
import { listMembers, createMember, updateMember, deleteMember } from '../controllers/committee.controller.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 6 * 1024 * 1024 } });
const router = Router();

router.get('/', listMembers);
router.post('/', requireAuth, upload.single('photo'), createMember);
router.put('/:id', requireAuth, upload.single('photo'), updateMember);
router.delete('/:id', requireAuth, deleteMember);

export default router;
