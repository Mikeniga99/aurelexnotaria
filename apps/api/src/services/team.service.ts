import { prisma } from '../lib/prisma';
import { Locale, TeamMemberCreateInput } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class TeamService {
  static async listPublic(locale: Locale = Locale.FR) {
    const members = await prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    return members
      .filter((m) => m.translations.length > 0)
      .map((m) => ({
        id: m.id,
        fullName: m.fullName,
        email: m.email,
        phone: m.phone,
        photoUrl: m.photoUrl,
        roleTitle: m.translations[0].roleTitle,
        bio: m.translations[0].bio,
      }));
  }

  static async listAdmin() {
    return prisma.teamMember.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: true,
      },
    });
  }

  static async create(data: TeamMemberCreateInput) {
    return prisma.$transaction(async (tx) => {
      const member = await tx.teamMember.create({
        data: {
          fullName: data.fullName,
          email: data.email || null,
          phone: data.phone || null,
          photoUrl: data.photoUrl || null,
          displayOrder: data.displayOrder,
        },
      });

      for (const t of data.translations) {
        await tx.teamMemberTranslation.create({
          data: {
            teamMemberId: member.id,
            locale: t.locale,
            roleTitle: t.roleTitle,
            bio: t.bio,
          },
        });
      }

      return tx.teamMember.findUnique({
        where: { id: member.id },
        include: { translations: true },
      });
    });
  }

  static async delete(id: string) {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Membre introuvable.');
    }
    return prisma.teamMember.delete({ where: { id } });
  }
}
