import { Router } from 'express';
import { getPageContent, updatePageContent } from '../controllers/pageContent.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getPageContent);
router.put('/', requireAuth, updatePageContent);

export default router;
