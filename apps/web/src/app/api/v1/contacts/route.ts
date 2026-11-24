import { NextRequest, NextResponse } from 'next/server';
import { ContactMessageCreateSchema } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole } from '@/lib/api-helpers';

// POST /api/v1/contacts — Public: create contact message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ContactMessageCreateSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone || null,
        subject: validated.subject,
        message: validated.message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: message.id },
        message: 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
      },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

// GET /api/v1/contacts — Admin: list contact messages
export async function GET(req: NextRequest) {
  try {
    await requireStaffRole();

    const { searchParams } = new URL(req.url);
    const isReadParam = searchParams.get('isRead');
    const isArchivedParam = searchParams.get('isArchived');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (isReadParam !== null) where.isRead = isReadParam === 'true';
    if (isArchivedParam !== null) {
      where.isArchived = isArchivedParam === 'true';
    } else {
      where.isArchived = false;
    }

    const [total, messages] = await Promise.all([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
