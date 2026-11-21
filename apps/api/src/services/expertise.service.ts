import { prisma } from '../lib/prisma';
import { ExpertiseCreateInput, Locale } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class ExpertiseService {
  static async listPublic(locale: Locale = Locale.FR) {
    const expertises = await prisma.expertise.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    return expertises
      .filter((e) => e.translations.length > 0)
      .map((e) => ({
        id: e.id,
        icon: e.icon,
        displayOrder: e.displayOrder,
        title: e.translations[0].title,
        slug: e.translations[0].slug,
        shortDescription: e.translations[0].shortDescription,
        fullContent: e.translations[0].fullContent,
        metaTitle: e.translations[0].metaTitle,
        metaDescription: e.translations[0].metaDescription,
      }));
  }

  static async getBySlug(slug: string, locale: Locale = Locale.FR) {
    const translation = await prisma.expertiseTranslation.findUnique({
      where: {
        locale_slug: {
          locale,
          slug,
        },
      },
      include: {
        expertise: {
          include: {
            translations: true,
          },
        },
      },
    });

    if (!translation || !translation.expertise.isPublished) {
      throw new AppError(404, 'NOT_FOUND', 'Domaine d’expertise introuvable.');
    }

    const alternates = translation.expertise.translations
      .filter((t) => t.locale !== locale)
      .map((t) => ({
        locale: t.locale,
        slug: t.slug,
      }));

    return {
      id: translation.expertiseId,
      icon: translation.expertise.icon,
      locale: translation.locale,
      title: translation.title,
      slug: translation.slug,
      shortDescription: translation.shortDescription,
      fullContent: translation.fullContent,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription,
      alternates,
    };
  }

  static async listAdmin() {
    return prisma.expertise.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: true,
      },
    });
  }

  static async create(data: ExpertiseCreateInput) {
    return prisma.$transaction(async (tx) => {
      const expertise = await tx.expertise.create({
        data: {
          icon: data.icon,
          displayOrder: data.displayOrder,
          isPublished: true,
        },
      });

      for (const t of data.translations) {
        await tx.expertiseTranslation.create({
          data: {
            expertiseId: expertise.id,
            locale: t.locale,
            title: t.title,
            slug: t.slug,
            shortDescription: t.shortDescription,
            fullContent: t.fullContent,
            metaTitle: t.metaTitle || null,
            metaDescription: t.metaDescription || null,
          },
        });
      }

      return tx.expertise.findUnique({
        where: { id: expertise.id },
        include: { translations: true },
      });
    });
  }
}
