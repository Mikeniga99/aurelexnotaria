import { prisma } from '../lib/prisma';
import { AppointmentStatus, ContentStatus } from '@notaria/contracts';

export class StatsService {
  static async getDashboardStats() {
    const [
      totalAppointments,
      pendingAppointments,
      reviewingAppointments,
      confirmedAppointments,
      unreadMessages,
      totalMessages,
      publishedArticles,
      draftArticles,
      recentAppointments,
      recentMessages,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: AppointmentStatus.PENDING } }),
      prisma.appointment.count({ where: { status: AppointmentStatus.REVIEWING } }),
      prisma.appointment.count({ where: { status: AppointmentStatus.CONFIRMED } }),
      prisma.contactMessage.count({ where: { isRead: false, isArchived: false } }),
      prisma.contactMessage.count(),
      prisma.articleTranslation.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.articleTranslation.count({ where: { status: ContentStatus.DRAFT } }),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          motif: true,
          preferredDate: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true },
          },
        },
      }),
    ]);

    return {
      kpi: {
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          reviewing: reviewingAppointments,
          confirmed: confirmedAppointments,
        },
        messages: {
          unread: unreadMessages,
          total: totalMessages,
        },
        articles: {
          published: publishedArticles,
          draft: draftArticles,
        },
      },
      recentActivity: {
        appointments: recentAppointments,
        messages: recentMessages,
        auditLogs: recentAuditLogs,
      },
    };
  }
}
