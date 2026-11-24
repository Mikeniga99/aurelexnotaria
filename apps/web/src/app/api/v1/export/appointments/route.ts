import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await requireStaffRole();

    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    // Generate CSV string with UTF-8 BOM for Excel compatibility
    const headers = ['ID', 'Date Création', 'Nom Complet', 'Email', 'Téléphone', 'Motif', 'Date Souhaitée', 'Créneau', 'Statut', 'Assigné à', 'Notes Internes'];
    
    const rows = appointments.map((a) => [
      `"${a.id}"`,
      `"${new Date(a.createdAt).toISOString()}"`,
      `"${(a.fullName || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.motif || '').replace(/"/g, '""')}"`,
      `"${(a.preferredDate || '').replace(/"/g, '""')}"`,
      `"${(a.preferredTimeSlot || '').replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.assignedTo ? `${a.assignedTo.firstName} ${a.assignedTo.lastName}` : 'Non assigné'}"`,
      `"${(a.internalNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

    await recordAuditLog({
      userId: session.userId,
      action: 'EXPORT_APPOINTMENTS_CSV',
      entity: 'EXPORT',
      details: { count: appointments.length },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="aurelex_rendez_vous_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
