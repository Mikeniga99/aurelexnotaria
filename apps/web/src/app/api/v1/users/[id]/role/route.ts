import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';
import { Role } from '@notaria/contracts';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireStaffRole();
    const { id } = await params;
    const body = await req.json();

    const { role, roleTitle, phone, bio } = body;

    if (!role || !Object.values(Role).includes(role)) {
      return NextResponse.json(
        { success: false, error: { message: 'Rôle d’accès invalide.' } },
        { status: 400 }
      );
    }

    // 1. Update User role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    // 2. If assigning as a staff member (COLLABORATOR or ADMIN), ensure team_members has a corresponding entry
    if (role !== Role.VISITOR && roleTitle) {
      const existingMember = await prisma.teamMember.findFirst({
        where: { email: { equals: updatedUser.email, mode: 'insensitive' } },
        include: { translations: true },
      });

      if (existingMember) {
        // Update existing team member
        await prisma.teamMember.update({
          where: { id: existingMember.id },
          data: {
            fullName: `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),
            phone: phone || existingMember.phone,
          },
        });

        // Update or create French translation
        const frTrans = existingMember.translations.find((t) => t.locale === 'fr');
        if (frTrans) {
          await prisma.teamMemberTranslation.update({
            where: { id: frTrans.id },
            data: { roleTitle, bio: bio || frTrans.bio },
          });
        } else {
          await prisma.teamMemberTranslation.create({
            data: {
              teamMemberId: existingMember.id,
              locale: 'fr',
              roleTitle,
              bio: bio || '',
            },
          });
        }
      } else {
        // Create new TeamMember record
        await prisma.teamMember.create({
          data: {
            fullName: `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),
            email: updatedUser.email,
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
        });
      }
    }

    // 3. Log audit event
    await recordAuditLog({
      userId: session.userId,
      action: 'PROMOTE_USER_ROLE',
      entity: 'User',
      entityId: id,
      details: {
        targetEmail: updatedUser.email,
        newRole: role,
        roleTitle: roleTitle || null,
      },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: `L'utilisateur ${updatedUser.firstName} ${updatedUser.lastName} a été promu au rôle ${role} avec succès.`,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
