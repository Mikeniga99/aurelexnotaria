import { z } from 'zod';
import { Locale } from './enums';

export const TeamMemberTranslationSchema = z.object({
  locale: z.enum([Locale.FR, Locale.EN]),
  roleTitle: z.string().min(2), // ex: Notaire Associé, Notaire Salarié, Premier Clerc
  bio: z.string().min(10),
});
export type TeamMemberTranslationInput = z.infer<typeof TeamMemberTranslationSchema>;

export const TeamMemberCreateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  photoUrl: z.string().optional().or(z.literal('')),
  displayOrder: z.number().int().default(0),
  translations: z.array(TeamMemberTranslationSchema).min(1),
});
export type TeamMemberCreateInput = z.infer<typeof TeamMemberCreateSchema>;
