import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireStaffRole();

    const [staffUsers, publicMembers] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: { in: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'COLLABORATOR'] },
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: { assignedAppointments: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.teamMember.findMany({
        orderBy: { displayOrder: 'asc' },
        include: {
          translations: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        staffUsers,
        publicMembers,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireStaffRole();
    const body = await req.json();

    const { fullName, email, phone, roleTitle, bio } = body;

    if (!fullName || !roleTitle) {
      return NextResponse.json(
        { success: false, error: { message: 'Nom et titre du rôle sont requis.' } },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        fullName,
        email: email || null,
        phone: phone || null,
        translations: {
          create: [
            {
              locale: 'fr',
              roleTitle,
              bio: bio || '',
            },
            {
              locale: 'en',
              roleTitle,
              bio: bio || '',
            },
          ],
        },
      },
      include: { translations: true },
    });

    await recordAuditLog({
      userId: session.userId,
      action: 'CREATE_TEAM_MEMBER',
      entity: 'TEAM_MEMBER',
      entityId: member.id,
      details: { fullName, roleTitle },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
