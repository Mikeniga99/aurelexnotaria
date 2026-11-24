import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await requireStaffRole();

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const entity = searchParams.get('entity') || undefined;
    const action = searchParams.get('action') || undefined;

    const where: any = {};
    if (entity && entity !== 'ALL') where.entity = entity;
    if (action && action !== 'ALL') where.action = action;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + logs.length < total,
        },
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
