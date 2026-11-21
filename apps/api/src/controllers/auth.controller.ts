import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginSchema } from '@notaria/contracts';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = LoginSchema.parse(req.body);
      const user = await AuthService.login(validated);

      // Store in server-side session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userRole = user.role;

      res.status(200).json({
        success: true,
        data: user,
        message: 'Connexion réussie.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getMe(req.session.userId!);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('notaria_session');
      res.status(200).json({
        success: true,
        message: 'Déconnexion effectuée avec succès.',
      });
    });
  }
}
