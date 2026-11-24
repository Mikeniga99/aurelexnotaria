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
    const { status, rejectionReason } = body;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json(
        { success: false, error: { message: 'Document non trouvé' } },
        { status: 404 }
      );
    }

    let meta: any = {};
    try {
      if (media.altText && media.altText.startsWith('{')) {
        meta = JSON.parse(media.altText);
      }
    } catch {}

    meta.status = status;
    if (rejectionReason !== undefined) meta.rejectionReason = rejectionReason;
    meta.verifiedBy = `${session.userFirstName} ${session.userLastName}`;
    meta.verifiedAt = new Date().toISOString();

    const updated = await prisma.media.update({
      where: { id },
      data: {
        altText: JSON.stringify(meta),
      },
    });

    await recordAuditLog({
      userId: session.userId,
      action: `DOCUMENT_${status}`,
      entity: 'DOCUMENT',
      entityId: id,
      details: {
        documentName: media.originalName,
        status,
        rejectionReason: rejectionReason || null,
        clientEmail: meta.clientEmail,
      },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        status,
        rejectionReason,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
