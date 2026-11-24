import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await requireStaffRole();

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = ['ID', 'Date Création', 'Nom Complet', 'Email', 'Téléphone', 'Sujet', 'Message', 'Lu', 'Archivé'];
    
    const rows = messages.map((m) => [
      `"${m.id}"`,
      `"${new Date(m.createdAt).toISOString()}"`,
      `"${(m.fullName || '').replace(/"/g, '""')}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${m.isRead ? 'Oui' : 'Non'}"`,
      `"${m.isArchived ? 'Oui' : 'Non'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

    await recordAuditLog({
      userId: session.userId,
      action: 'EXPORT_CONTACTS_CSV',
      entity: 'EXPORT',
      details: { count: messages.length },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="aurelex_messages_contacts_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
