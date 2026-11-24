import { NextRequest, NextResponse } from 'next/server';
import { AppointmentStatusUpdateSchema } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole, AppError } from '@/lib/api-helpers';

// PATCH /api/v1/appointments/[id]/status — Admin: update appointment status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireStaffRole();
    const { id } = await params;
    const body = await req.json();
    const validated = AppointmentStatusUpdateSchema.parse(body);

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Demande de rendez-vous introuvable.');
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: validated.status,
        internalNotes:
          validated.internalNotes !== undefined
            ? validated.internalNotes
            : existing.internalNotes,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId!,
        action: 'APPOINTMENT_STATUS_UPDATE',
        entity: 'Appointment',
        entityId: id,
        details: JSON.stringify({
          from: existing.status,
          to: validated.status,
          notes: validated.internalNotes,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Statut du rendez-vous mis à jour avec succès.',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
