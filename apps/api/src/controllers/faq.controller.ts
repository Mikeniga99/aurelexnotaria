import { Request, Response, NextFunction } from 'express';
import { FAQService } from '../services/faq.service';
import { FAQCreateSchema, Locale } from '@notaria/contracts';

export class FAQController {
  static async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const faqs = await FAQService.listPublic(locale);
      res.status(200).json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(_req: Request, res: Response, next: NextFunction) {
    try {
      const faqs = await FAQService.listAdmin();
      res.status(200).json({
        success: true,
        data: faqs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = FAQCreateSchema.parse(req.body);
      const faq = await FAQService.create(validated);
      res.status(201).json({
        success: true,
        data: faq,
        message: 'Question FAQ créée avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await FAQService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Question FAQ supprimée avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }
}
