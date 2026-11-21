import { z } from 'zod';
import { Locale } from './enums';

export const FAQTranslationSchema = z.object({
  locale: z.enum([Locale.FR, Locale.EN]),
  question: z.string().min(5),
  answer: z.string().min(10),
});
export type FAQTranslationInput = z.infer<typeof FAQTranslationSchema>;

export const FAQCreateSchema = z.object({
  category: z.string().min(2), // IMMOBILIER, FAMILLE, ENTREPRISE, etc.
  displayOrder: z.number().int().default(0),
  translations: z.array(FAQTranslationSchema).min(1),
});
export type FAQCreateInput = z.infer<typeof FAQCreateSchema>;
