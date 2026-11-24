import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole } from '@/lib/api-helpers';
import { Locale } from '@notaria/contracts';

// GET /api/v1/articles/admin/all — Admin: list all articles with translations
export async function GET(req: NextRequest) {
  try {
    await requireStaffRole();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    const [total, articles] = await Promise.all([
      prisma.article.count(),
      prisma.article.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { include: { translations: true } },
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
        missingTranslations: [!hasFr ? Locale.FR : null, !hasEn ? Locale.EN : null].filter(Boolean),
      };
    });

    return NextResponse.json({
      success: true,
      data: formatted,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
