import { z } from 'zod';
import { ContentStatus, Locale } from './enums';

export const ArticleTranslationUpsertSchema = z.object({
  locale: z.enum([Locale.FR, Locale.EN]),
  title: z.string().min(3, 'Le titre doit comporter au moins 3 caractères'),
  slug: z.string().min(2, 'Le slug est requis').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Format de slug invalide'),
  excerpt: z.string().max(500).optional().or(z.literal('')),
  content: z.string().min(10, 'Le contenu doit être renseigné'),
  metaTitle: z.string().max(70).optional().or(z.literal('')),
  metaDescription: z.string().max(160).optional().or(z.literal('')),
  status: z.enum([ContentStatus.DRAFT, ContentStatus.PUBLISHED, ContentStatus.ARCHIVED]).default(ContentStatus.DRAFT),
});
export type ArticleTranslationUpsertInput = z.infer<typeof ArticleTranslationUpsertSchema>;

export const ArticleCreateSchema = z.object({
  coverImage: z.string().optional().or(z.literal('')),
  categoryId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
  translations: z.array(ArticleTranslationUpsertSchema).min(1, 'Au moins une langue doit être renseignée'),
});
export type ArticleCreateInput = z.infer<typeof ArticleCreateSchema>;

export const ArticleUpdateSchema = z.object({
  coverImage: z.string().optional().or(z.literal('')),
  categoryId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().optional(),
  translations: z.array(ArticleTranslationUpsertSchema).optional(),
});
export type ArticleUpdateInput = z.infer<typeof ArticleUpdateSchema>;
