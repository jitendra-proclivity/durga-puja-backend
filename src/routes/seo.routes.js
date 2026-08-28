import { Router } from 'express';
import { getAllSeo, getSeoByPage, updateSeoByPage } from '../controllers/seo.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllSeo);
router.get('/:page', getSeoByPage);
router.put('/:page', requireAuth, updateSeoByPage);

export default router;
