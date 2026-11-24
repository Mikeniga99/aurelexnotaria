import { NextRequest, NextResponse } from 'next/server';
import { ArticleCreateSchema, Locale, ContentStatus } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireAuth, requireStaffRole } from '@/lib/api-helpers';

// GET /api/v1/articles?locale=fr&page=1&limit=10 — Public: list published articles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = (searchParams.get('locale') as Locale) || Locale.FR;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const where = { status: ContentStatus.PUBLISHED, locale };

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
                include: { translations: { where: { locale } } },
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

    return NextResponse.json({
      success: true,
      data: items,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

// POST /api/v1/articles — Admin: create article
export async function POST(req: NextRequest) {
  try {
    await requireStaffRole();
    const body = await req.json();
    const validated = ArticleCreateSchema.parse(body);

    const article = await prisma.$transaction(async (tx) => {
      const created = await tx.article.create({
        data: {
          coverImage: validated.coverImage || null,
          categoryId: validated.categoryId || null,
          isFeatured: validated.isFeatured || false,
        },
      });

      for (const t of validated.translations) {
        await tx.articleTranslation.create({
          data: {
            articleId: created.id,
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
        where: { id: created.id },
        include: { translations: true },
      });
    });

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (err) {
    return handleApiError(err);
  }
}
