import { NextRequest, NextResponse } from 'next/server';
import { RegisterSchema, Role } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { handleApiError, AppError } from '@/lib/api-helpers';
import argon2 from 'argon2';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = RegisterSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (existingUser) {
      throw new AppError(409, 'USER_EXISTS', 'Un compte existe déjà avec cette adresse email.');
    }

    const passwordHash = await argon2.hash(validated.password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });

    // Check if this email was pre-registered as a team member / office collaborator
    const preRegisteredMember = await prisma.teamMember.findFirst({
      where: {
        email: { equals: validated.email.toLowerCase(), mode: 'insensitive' },
      },
      include: { translations: true },
    });

    // If pre-registered, promote directly to COLLABORATOR; otherwise default to VISITOR (client)
    const assignedRole = preRegisteredMember ? Role.COLLABORATOR : Role.VISITOR;

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: validated.email.toLowerCase(),
        passwordHash,
        firstName: validated.firstName,
        lastName: validated.lastName,
        role: assignedRole,
        isActive: true,
      },
    });

    // Log the account creation in AuditLog
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: preRegisteredMember ? 'USER_REGISTER_STAFF_AUTO_PROMOTED' : 'USER_REGISTER',
        entity: 'User',
        entityId: newUser.id,
        details: preRegisteredMember
          ? JSON.stringify({
              preRegisteredMemberId: preRegisteredMember.id,
              roleAssigned: 'COLLABORATOR',
              title: preRegisteredMember.translations?.[0]?.roleTitle || 'Collaborateur',
            })
          : null,
      },
    });

    // Start session directly
    const session = await getSession();
    session.userId = newUser.id;
    session.userEmail = newUser.email;
    session.userFirstName = newUser.firstName;
    session.userLastName = newUser.lastName;
    session.userRole = newUser.role;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
        message: 'Compte créé avec succès.',
      },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}
