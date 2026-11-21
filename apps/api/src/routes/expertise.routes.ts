import { Router } from 'express';
import { ExpertiseController } from '../controllers/expertise.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { Role } from '@notaria/contracts';

const router = Router();

// Public routes
router.get('/', ExpertiseController.listPublic);
router.get('/detail/:slug', ExpertiseController.getBySlug);

// Admin routes
router.get(
  '/admin/all',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  ExpertiseController.listAdmin
);

router.post(
  '/',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  ExpertiseController.create
);

export default router;
