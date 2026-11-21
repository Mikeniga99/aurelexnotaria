import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { Role } from '@notaria/contracts';

const router = Router();

// Public route
router.get('/', TeamController.listPublic);

// Admin routes
router.get(
  '/admin/all',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  TeamController.listAdmin
);

router.post(
  '/',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  TeamController.create
);

router.delete(
  '/:id',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  TeamController.delete
);

export default router;
