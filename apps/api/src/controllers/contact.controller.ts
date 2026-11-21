import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';
import { ContactMessageCreateSchema } from '@notaria/contracts';

export class ContactController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = ContactMessageCreateSchema.parse(req.body);
      const message = await ContactService.create(validated);
      res.status(201).json({
        success: true,
        data: message,
        message: 'Votre message a bien été transmis à l’étude. Nous vous répondrons dans les meilleurs délais.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { isRead, isArchived, page, limit } = req.query;
      const result = await ContactService.listAdmin({
        isRead: isRead !== undefined ? isRead === 'true' : undefined,
        isArchived: isArchived !== undefined ? isArchived === 'true' : undefined,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const isRead = req.body.isRead !== undefined ? Boolean(req.body.isRead) : true;
      const message = await ContactService.markAsRead(req.params.id, isRead);
      res.status(200).json({
        success: true,
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }

  static async toggleArchive(req: Request, res: Response, next: NextFunction) {
    try {
      const isArchived = Boolean(req.body.isArchived);
      const message = await ContactService.toggleArchive(req.params.id, isArchived);
      res.status(200).json({
        success: true,
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
}
