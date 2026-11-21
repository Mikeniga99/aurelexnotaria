import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/stats.service';

export class StatsController {
  static async getDashboardStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await StatsService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
