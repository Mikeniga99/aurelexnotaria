import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentCreateSchema, AppointmentStatusUpdateSchema } from '@notaria/contracts';

export class AppointmentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = AppointmentCreateSchema.parse(req.body);
      const appointment = await AppointmentService.create(validated);
      res.status(201).json({
        success: true,
        data: appointment,
        message: 'Votre demande de rendez-vous a bien été enregistrée. Un membre de l’étude vous contactera.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, search, page, limit } = req.query;
      const result = await AppointmentService.listAdmin({
        status: status as any,
        search: search as string,
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

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = AppointmentStatusUpdateSchema.parse(req.body);
      const updated = await AppointmentService.updateStatus(
        req.params.id,
        validated,
        req.session.userId!
      );
      res.status(200).json({
        success: true,
        data: updated,
        message: 'Statut du rendez-vous mis à jour avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }
}
