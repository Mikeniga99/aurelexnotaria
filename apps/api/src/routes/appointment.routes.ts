import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { publicFormLimiter } from '../middleware/rateLimiter';
import { Role } from '@notaria/contracts';

const router = Router();

// Public route to book appointment
router.post('/', publicFormLimiter, AppointmentController.create);

// Protected routes for staff
router.get(
  '/',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  AppointmentController.listAdmin
);

router.get(
  '/:id',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  AppointmentController.getById
);

router.patch(
  '/:id/status',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  AppointmentController.updateStatus
);

export default router;
