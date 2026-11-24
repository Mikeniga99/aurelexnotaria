import { NextRequest, NextResponse } from 'next/server';
import { AppointmentCreateSchema, AppointmentStatus } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireAuth, requireStaffRole } from '@/lib/api-helpers';

// POST /api/v1/appointments — Public: create appointment request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = AppointmentCreateSchema.parse(body);

    const appointment = await prisma.appointment.create({
      data: {
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone,
        motif: validated.motif,
        preferredDate: validated.preferredDate,
        preferredTimeSlot: validated.preferredTimeSlot || null,
        message: validated.message || null,
        status: AppointmentStatus.PENDING,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: appointment.id,
          fullName: appointment.fullName,
          email: appointment.email,
          motif: appointment.motif,
          preferredDate: appointment.preferredDate,
          status: appointment.status,
          createdAt: appointment.createdAt,
        },
        message:
          "Votre demande de rendez-vous a bien été enregistrée. Un membre de l'étude vous contactera.",
      },
      { status: 201 }
    );
  } catch (err) {
    return handleApiError(err);
  }
}

// GET /api/v1/appointments — Admin: list appointments
export async function GET(req: NextRequest) {
  try {
    await requireStaffRole();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as AppointmentStatus | null;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, appointments] = await Promise.all([
      prisma.appointment.count({ where }),
      prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: appointments,
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
