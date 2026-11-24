import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireStaffRole();
    const { id } = await params;
    const body = await req.json();
    const { assignedToId } = body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        assignedToId: assignedToId || null,
      },
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    await recordAuditLog({
      userId: session.userId,
      action: 'ASSIGN_APPOINTMENT',
      entity: 'APPOINTMENT',
      entityId: id,
      details: {
        assignedToId,
        assignedName: appointment.assignedTo
          ? `${appointment.assignedTo.firstName} ${appointment.assignedTo.lastName}`
          : 'Non assigné',
      },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
