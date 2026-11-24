import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { handleApiError, AppError } from '@/lib/api-helpers';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn || !session.userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'Non authentifié.');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
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

    return NextResponse.json({ success: true, data: user });
  } catch (err) {
    return handleApiError(err);
  }
}
