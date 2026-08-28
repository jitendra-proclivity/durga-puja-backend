import { Router } from 'express';
import { getContent, updateContent } from '../controllers/content.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getContent);           // public — the live site reads this
router.put('/', requireAuth, updateContent); // admin-only — the admin panel writes this

export default router;
