import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    const isStaff = session.userRole !== 'VISITOR' && Boolean(session.userRole);

    const medias = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const parsedDocs = medias.map((m) => {
      let meta: any = {};
      try {
        if (m.altText && m.altText.startsWith('{')) {
          meta = JSON.parse(m.altText);
        } else {
          meta = { category: 'GENERAL', status: 'PENDING', clientName: m.altText || 'Client Aurelex' };
        }
      } catch {
        meta = { category: 'GENERAL', status: 'PENDING' };
      }

      return {
        id: m.id,
        filename: m.filename,
        originalName: m.originalName,
        mimeType: m.mimeType,
        size: m.size,
        url: m.url,
        createdAt: m.createdAt,
        category: meta.category || 'PIECE_IDENTITE',
        status: meta.status || 'PENDING', // PENDING, VERIFIED, REJECTED
        rejectionReason: meta.rejectionReason || '',
        clientName: meta.clientName || 'Citoyen Aurelex',
        clientEmail: meta.clientEmail || '',
      };
    });

    // If visitor, filter only their documents
    const filtered = isStaff
      ? parsedDocs
      : parsedDocs.filter((d) => d.clientEmail === session.userEmail || !d.clientEmail);

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();

    const {
      originalName,
      category = 'PIECE_IDENTITE',
      size = 1024 * 150,
      mimeType = 'application/pdf',
      url = '/documents/piece-justificative-demo.pdf',
    } = body;

    const meta = {
      category,
      status: 'PENDING',
      clientName: `${session.userFirstName || ''} ${session.userLastName || ''}`.trim() || 'Client',
      clientEmail: session.userEmail || '',
    };

    const media = await prisma.media.create({
      data: {
        filename: `doc_${Date.now()}_${(originalName || 'document').replace(/[^a-zA-Z0-9.-]/g, '_')}`,
        originalName: originalName || 'Document déposé.pdf',
        mimeType,
        size,
        url,
        altText: JSON.stringify(meta),
      },
    });

    await recordAuditLog({
      userId: session.userId,
      action: 'UPLOAD_DOCUMENT',
      entity: 'DOCUMENT',
      entityId: media.id,
      details: { originalName, category, clientEmail: session.userEmail },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      data: {
        id: media.id,
        originalName: media.originalName,
        category,
        status: 'PENDING',
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
