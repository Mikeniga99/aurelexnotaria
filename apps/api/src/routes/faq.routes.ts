import { Router } from 'express';
import { FAQController } from '../controllers/faq.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { Role } from '@notaria/contracts';

const router = Router();

// Public route
router.get('/', FAQController.listPublic);

// Admin routes
router.get(
  '/admin/all',
  requireAuth,
  requireRole(Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  FAQController.listAdmin
);

router.post(
  '/',
  requireAuth,
  requireRole(Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  FAQController.create
);

router.delete(
  '/:id',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  FAQController.delete
);

export default router;
