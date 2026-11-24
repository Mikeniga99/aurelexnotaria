import { NextRequest, NextResponse } from 'next/server';
import { ArticleUpdateSchema, ContentStatus } from '@notaria/contracts';
import { prisma } from '@/lib/prisma';
import { handleApiError, requireStaffRole, AppError } from '@/lib/api-helpers';

// PATCH /api/v1/articles/[id] — Admin: update article
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireStaffRole();
    const { id } = await params;
    const body = await req.json();
    const validated = ArticleUpdateSchema.parse(body);

    const article = await prisma.$transaction(async (tx) => {
      const existing = await tx.article.findUnique({ where: { id } });
      if (!existing) throw new AppError(404, 'NOT_FOUND', 'Article introuvable.');

      await tx.article.update({
        where: { id },
        data: {
          coverImage: validated.coverImage !== undefined ? validated.coverImage : existing.coverImage,
          categoryId: validated.categoryId !== undefined ? validated.categoryId : existing.categoryId,
          isFeatured: validated.isFeatured !== undefined ? validated.isFeatured : existing.isFeatured,
        },
      });

      if (validated.translations && validated.translations.length > 0) {
        for (const t of validated.translations) {
          await tx.articleTranslation.upsert({
            where: { articleId_locale: { articleId: id, locale: t.locale } },
            update: {
              title: t.title,
              slug: t.slug,
              excerpt: t.excerpt || null,
              content: t.content,
              metaTitle: t.metaTitle || null,
              metaDescription: t.metaDescription || null,
              status: t.status,
              publishedAt: t.status === ContentStatus.PUBLISHED ? new Date() : undefined,
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

      return tx.article.findUnique({ where: { id }, include: { translations: true } });
    });

    return NextResponse.json({ success: true, data: article });
  } catch (err) {
    return handleApiError(err);
  }
}

// DELETE /api/v1/articles/[id] — Admin: delete article
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireStaffRole();
    const { id } = await params;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, 'NOT_FOUND', 'Article introuvable.');

    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Article supprimé avec succès.' });
  } catch (err) {
    return handleApiError(err);
  }
}
