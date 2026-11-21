import { prisma } from '../lib/prisma';
import { ContactMessageCreateInput } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class ContactService {
  static async create(data: ContactMessageCreateInput) {
    return prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });
  }

  static async listAdmin(filters?: {
    isRead?: boolean;
    isArchived?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 15;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.isRead !== undefined) {
      where.isRead = filters.isRead;
    }
    if (filters?.isArchived !== undefined) {
      where.isArchived = filters.isArchived;
    } else {
      where.isArchived = false; // default to non-archived
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

    return {
      data: messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async markAsRead(id: string, isRead = true) {
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Message introuvable.');
    }

    return prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
  }

  static async toggleArchive(id: string, isArchived: boolean) {
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Message introuvable.');
    }

    return prisma.contactMessage.update({
      where: { id },
      data: { isArchived },
    });
  }
}
