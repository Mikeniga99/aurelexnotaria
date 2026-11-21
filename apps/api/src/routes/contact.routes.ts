import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { publicFormLimiter } from '../middleware/rateLimiter';
import { Role } from '@notaria/contracts';

const router = Router();

// Public route to send message
router.post('/', publicFormLimiter, ContactController.create);

// Protected routes
router.get(
  '/',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ContactController.listAdmin
);

router.patch(
  '/:id/read',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ContactController.markAsRead
);

router.patch(
  '/:id/archive',
  requireAuth,
  requireRole(Role.COLLABORATOR, Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ContactController.toggleArchive
);

export default router;
