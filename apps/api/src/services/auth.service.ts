import argon2 from 'argon2';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/error';
import { LoginInput, Role } from '@notaria/contracts';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MB
      timeCost: 3,
      parallelism: 1,
    });
  }

  static async verifyPassword(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      // Return generic error to prevent user enumeration
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Identifiants de connexion invalides.');
    }

    const isValid = await this.verifyPassword(user.passwordHash, data.password);
    if (!isValid) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Identifiants de connexion invalides.');
    }

    // Log the successful authentication in AuditLog
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        entity: 'User',
        entityId: user.id,
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as Role,
    };
  }

  static async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user || !user.isActive) {
      throw new AppError(401, 'UNAUTHORIZED', 'Utilisateur introuvable ou compte désactivé.');
    }

    return user;
  }
}
