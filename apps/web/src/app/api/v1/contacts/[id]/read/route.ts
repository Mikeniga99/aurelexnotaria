import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole, AppError } from '@/lib/api-helpers';

// PATCH /api/v1/contacts/[id]/read — Admin: mark message as read/unread
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireStaffRole();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const isRead = body.isRead !== undefined ? Boolean(body.isRead) : true;

    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Message introuvable.');
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return handleApiError(err);
  }
}
