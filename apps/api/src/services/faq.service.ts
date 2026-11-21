import { prisma } from '../lib/prisma';
import { FAQCreateInput, Locale } from '@notaria/contracts';
import { AppError } from '../middleware/error';

export class FAQService {
  static async listPublic(locale: Locale = Locale.FR) {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    return faqs
      .filter((f) => f.translations.length > 0)
      .map((f) => ({
        id: f.id,
        category: f.category,
        question: f.translations[0].question,
        answer: f.translations[0].answer,
      }));
  }

  static async listAdmin() {
    return prisma.fAQ.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        translations: true,
      },
    });
  }

  static async create(data: FAQCreateInput) {
    return prisma.$transaction(async (tx) => {
      const faq = await tx.fAQ.create({
        data: {
          category: data.category,
          displayOrder: data.displayOrder,
          isPublished: true,
        },
      });

      for (const t of data.translations) {
        await tx.fAQTranslation.create({
          data: {
            faqId: faq.id,
            locale: t.locale,
            question: t.question,
            answer: t.answer,
          },
        });
      }

      return tx.fAQ.findUnique({
        where: { id: faq.id },
        include: { translations: true },
      });
    });
  }

  static async delete(id: string) {
    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError(404, 'NOT_FOUND', 'Question FAQ introuvable.');
    }
    return prisma.fAQ.delete({ where: { id } });
  }
}
