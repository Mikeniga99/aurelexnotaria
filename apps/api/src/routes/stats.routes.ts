import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { Role } from '@notaria/contracts';

const router = Router();

router.get(
  '/dashboard',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  StatsController.getDashboardStats
);

export default router;
