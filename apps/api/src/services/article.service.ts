import { prisma } from '../lib/prisma';
import { ArticleCreateInput, ArticleUpdateInput, ContentStatus, Locale } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class ArticleService {
  /**
   * Public list of articles by locale
   */
  static async listPublic(locale: Locale = Locale.FR, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = {
      status: ContentStatus.PUBLISHED,
      locale,
    };

    const [total, translations] = await Promise.all([
      prisma.articleTranslation.count({ where }),
      prisma.articleTranslation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: {
          article: {
            include: {
              category: {
                include: {
                  translations: {
                    where: { locale },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    const items = translations.map((t) => ({
      id: t.articleId,
      slug: t.slug,
      title: t.title,
      excerpt: t.excerpt,
      content: t.content,
      coverImage: t.article.coverImage,
      category: t.article.category?.translations[0]?.name || null,
      publishedAt: t.publishedAt || t.createdAt,
    }));

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Public article detail by slug and locale
   */
  static async getBySlug(slug: string, locale: Locale = Locale.FR) {
    const translation = await prisma.articleTranslation.findUnique({
      where: {
        locale_slug: {
          locale,
          slug,
        },
      },
      include: {
        article: {
          include: {
            category: {
              include: {
                translations: {
                  where: { locale },
                },
              },
            },
            translations: {
              select: {
                locale: true,
                slug: true,
                title: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!translation || translation.status !== ContentStatus.PUBLISHED) {
      throw new AppError(404, 'NOT_FOUND', 'Article introuvable ou non publié.');
    }

    // Determine alternate links for hreflang
    const alternateLocales = translation.article.translations
      .filter((t) => t.locale !== locale && t.status === ContentStatus.PUBLISHED)
      .map((t) => ({
        locale: t.locale,
        slug: t.slug,
      }));

    return {
      id: translation.articleId,
      locale: translation.locale,
      slug: translation.slug,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      coverImage: translation.article.coverImage,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription,
      category: translation.article.category?.translations[0]?.name || null,
      publishedAt: translation.publishedAt || translation.createdAt,
      alternates: alternateLocales,
    };
  }

  /**
   * Admin list of articles with all translations and missing translation alerts
   */
  static async listAdmin(page = 1, limit = 15) {
    const skip = (page - 1) * limit;

    const [total, articles] = await Promise.all([
      prisma.article.count(),
      prisma.article.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            include: {
              translations: true,
            },
          },
          translations: true,
        },
      }),
    ]);

    const formatted = articles.map((article) => {
      const hasFr = article.translations.some((t) => t.locale === Locale.FR);
      const hasEn = article.translations.some((t) => t.locale === Locale.EN);

      return {
        ...article,
        hasFr,
        hasEn,
        missingTranslations: [
          !hasFr ? Locale.FR : null,
          !hasEn ? Locale.EN : null,
        ].filter(Boolean),
      };
    });

    return {
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Create an article with translations in transaction
   */
  static async create(data: ArticleCreateInput) {
    return prisma.$transaction(async (tx) => {
      const article = await tx.article.create({
        data: {
          coverImage: data.coverImage || null,
          categoryId: data.categoryId || null,
          isFeatured: data.isFeatured || false,
        },
      });

      for (const t of data.translations) {
        await tx.articleTranslation.create({
          data: {
            articleId: article.id,
            locale: t.locale,
            title: t.title,
            slug: t.slug,
            excerpt: t.excerpt || null,
            content: t.content,
            metaTitle: t.metaTitle || null,
            metaDescription: t.metaDescription || null,
            status: t.status,
            publishedAt: t.status === ContentStatus.PUBLISHED ? new Date() : null,
          },
        });
      }

      return tx.article.findUnique({
        where: { id: article.id },
        include: { translations: true },
      });
    });
  }

  /**
   * Update article
   */
  static async update(id: string, data: ArticleUpdateInput) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.article.findUnique({ where: { id } });
      if (!existing) {
        throw new AppError(404, 'NOT_FOUND', 'Article introuvable.');
      }

      await tx.article.update({
        where: { id },
        data: {
          coverImage: data.coverImage !== undefined ? data.coverImage : existing.coverImage,
          categoryId: data.categoryId !== undefined ? data.categoryId : existing.categoryId,
          isFeatured: data.isFeatured !== undefined ? data.isFeatured : existing.isFeatured,
        },
      });

      if (data.translations && data.translations.length > 0) {
        for (const t of data.translations) {
          await tx.articleTranslation.upsert({
            where: {
              articleId_locale: {
                articleId: id,
                locale: t.locale,
              },
            },
            update: {
              title: t.title,
              slug: t.slug,
              excerpt: t.excerpt || null,
              content: t.content,
              metaTitle: t.metaTitle || null,
              metaDescription: t.metaDescription || null,
              status: t.status,
              publishedAt:
                t.status === ContentStatus.PUBLISHED ? new Date() : undefined,
            },
            create: {
              articleId: id,
              locale: t.locale,
              title: t.title,
              slug: t.slug,
              excerpt: t.excerpt || null,
              content: t.content,
              metaTitle: t.metaTitle || null,
              metaDescription: t.metaDescription || null,
              status: t.status,
              publishedAt: t.status === ContentStatus.PUBLISHED ? new Date() : null,
            },
          });
        }
      }

      return tx.article.findUnique({
        where: { id },
        include: { translations: true },
      });
    });
  }

  /**
   * Delete article
   */
  static async delete(id: string) {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Article introuvable.');
    }

    return prisma.article.delete({ where: { id } });
  }
}
