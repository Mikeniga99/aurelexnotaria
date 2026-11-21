import { Request, Response, NextFunction } from 'express';
import { Role } from '@notaria/contracts';
import { AppError } from './error';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userEmail?: string;
    userRole?: Role;
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.session || !req.session.userId) {
    throw new AppError(401, 'UNAUTHORIZED', 'Authentification requise pour accéder à cette ressource.');
  }
  next();
}

export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.session || !req.session.userId || !req.session.userRole) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentification requise.');
    }

    const currentRole = req.session.userRole;

    // Super Admin has all rights
    if (currentRole === Role.SUPER_ADMIN) {
      return next();
    }

    if (!allowedRoles.includes(currentRole)) {
      throw new AppError(
        403,
        'FORBIDDEN',
        'Permissions insuffisantes pour effectuer cette opération.'
      );
    }

    next();
  };
}
