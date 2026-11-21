import { prisma } from '../lib/prisma';
import { AppointmentCreateInput, AppointmentStatusUpdateInput, AppointmentStatus } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class AppointmentService {
  static async create(data: AppointmentCreateInput) {
    const appointment = await prisma.appointment.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        motif: data.motif,
        preferredDate: data.preferredDate,
        preferredTimeSlot: data.preferredTimeSlot || null,
        message: data.message || null,
        status: AppointmentStatus.PENDING,
      },
    });

    // Public return doesn't leak internal data
    return {
      id: appointment.id,
      fullName: appointment.fullName,
      email: appointment.email,
      motif: appointment.motif,
      preferredDate: appointment.preferredDate,
      status: appointment.status,
      createdAt: appointment.createdAt,
    };
  }

  static async listAdmin(filters?: {
    status?: AppointmentStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 15;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
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

    return {
      data: appointments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getById(id: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!appointment) {
      throw new AppError(404, 'NOT_FOUND', 'Demande de rendez-vous introuvable.');
    }

    return appointment;
  }

  static async updateStatus(
    id: string,
    data: AppointmentStatusUpdateInput,
    userId: string
  ) {
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Demande de rendez-vous introuvable.');
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: data.status,
        internalNotes:
          data.internalNotes !== undefined
            ? data.internalNotes
            : existing.internalNotes,
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'APPOINTMENT_STATUS_UPDATE',
        entity: 'Appointment',
        entityId: id,
        details: JSON.stringify({
          from: existing.status,
          to: data.status,
          notes: data.internalNotes,
        }),
      },
    });

    return updated;
  }
}
