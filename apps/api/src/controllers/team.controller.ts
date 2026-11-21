import { Request, Response, NextFunction } from 'express';
import { TeamService } from '../services/team.service';
import { Locale, TeamMemberCreateSchema } from '@notaria/contracts';

export class TeamController {
  static async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const locale = (req.query.locale as Locale) || Locale.FR;
      const members = await TeamService.listPublic(locale);
      res.status(200).json({
        success: true,
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAdmin(_req: Request, res: Response, next: NextFunction) {
    try {
      const members = await TeamService.listAdmin();
      res.status(200).json({
        success: true,
        data: members,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = TeamMemberCreateSchema.parse(req.body);
      const member = await TeamService.create(validated);
      res.status(201).json({
        success: true,
        data: member,
        message: 'Membre ajouté avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await TeamService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Membre retiré avec succès.',
      });
    } catch (error) {
      next(error);
    }
  }
}
