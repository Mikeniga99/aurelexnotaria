import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { Role } from '@notaria/contracts';

const router = Router();

// Public routes
router.get('/', ArticleController.listPublic);
router.get('/detail/:slug', ArticleController.getBySlug);

// Admin routes
router.get(
  '/admin/all',
  requireAuth,
  requireRole(Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ArticleController.listAdmin
);

router.post(
  '/',
  requireAuth,
  requireRole(Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ArticleController.create
);

router.put(
  '/:id',
  requireAuth,
  requireRole(Role.EDITOR, Role.ADMIN, Role.SUPER_ADMIN),
  ArticleController.update
);

router.delete(
  '/:id',
  requireAuth,
  requireRole(Role.ADMIN, Role.SUPER_ADMIN),
  ArticleController.delete
);

export default router;
