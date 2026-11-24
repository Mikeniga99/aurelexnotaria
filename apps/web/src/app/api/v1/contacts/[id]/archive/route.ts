import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole, AppError } from '@/lib/api-helpers';

// PATCH /api/v1/contacts/[id]/archive — Admin: archive/unarchive message
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireStaffRole();
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const isArchived = body.isArchived !== undefined ? Boolean(body.isArchived) : true;

    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Message introuvable.');
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { isArchived },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return handleApiError(err);
  }
}
