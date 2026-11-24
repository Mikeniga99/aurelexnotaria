import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { handleApiError, AppError } from '@/lib/api-helpers';
import argon2 from 'argon2';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (!user || !user.isActive) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Identifiants de connexion invalides.');
    }

    const isValid = await argon2.verify(user.passwordHash, validated.password);
    if (!isValid) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Identifiants de connexion invalides.');
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        entity: 'User',
        entityId: user.id,
      },
    });

    // Set session
    const session = await getSession();
    session.userId = user.id;
    session.userEmail = user.email;
    session.userFirstName = user.firstName;
    session.userLastName = user.lastName;
    session.userRole = user.role;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      message: 'Connexion réussie.',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
