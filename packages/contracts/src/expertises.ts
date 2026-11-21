import { z } from 'zod';
import { Locale } from './enums';

export const ExpertiseTranslationSchema = z.object({
  locale: z.enum([Locale.FR, Locale.EN]),
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  shortDescription: z.string().min(5),
  fullContent: z.string().min(10),
  metaTitle: z.string().optional().or(z.literal('')),
  metaDescription: z.string().optional().or(z.literal('')),
});
export type ExpertiseTranslationInput = z.infer<typeof ExpertiseTranslationSchema>;

export const ExpertiseCreateSchema = z.object({
  icon: z.string().default('Scale'),
  displayOrder: z.number().int().default(0),
  translations: z.array(ExpertiseTranslationSchema).min(1),
});
export type ExpertiseCreateInput = z.infer<typeof ExpertiseCreateSchema>;
