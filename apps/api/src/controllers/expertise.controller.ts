import { Request, Response, NextFunction } from 'express';
import { ExpertiseService } from '../services/expertise.service';
import { ExpertiseCreateSchema, Locale } from '@notaria/contracts';

export class ExpertiseController {
  static async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const expertises = await ExpertiseService.listPublic(locale);
      res.status(200).json({
        success: true,
        data: expertises,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const expertise = await ExpertiseService.getBySlug(req.params.slug, locale);
      res.status(200).json({
        success: true,
        data: expertise,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(_req: Request, res: Response, next: NextFunction) {
    try {
      const expertises = await ExpertiseService.listAdmin();
      res.status(200).json({
        success: true,
        data: expertises,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = ExpertiseCreateSchema.parse(req.body);
      const expertise = await ExpertiseService.create(validated);
      res.status(201).json({
        success: true,
        data: expertise,
      });
    } catch (error) {
      next(error);
    }
  }
}
