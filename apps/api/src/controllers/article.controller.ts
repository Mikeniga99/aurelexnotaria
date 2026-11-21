import { Request, Response, NextFunction } from 'express';
import { ArticleService } from '../services/article.service';
import { ArticleCreateSchema, ArticleUpdateSchema, Locale } from '@notaria/contracts';

export class ArticleController {
  static async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const result = await ArticleService.listPublic(locale, page, limit);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const article = await ArticleService.getBySlug(req.params.slug, locale);
      res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 15;

      const result = await ArticleService.listAdmin(page, limit);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = ArticleCreateSchema.parse(req.body);
      const article = await ArticleService.create(validated);
      res.status(201).json({
        success: true,
        data: article,
        message: 'Article créé avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = ArticleUpdateSchema.parse(req.body);
      const article = await ArticleService.update(req.params.id, validated);
      res.status(200).json({
        success: true,
        data: article,
        message: 'Article mis à jour avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ArticleService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Article supprimé avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }
}
