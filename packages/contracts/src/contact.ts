import { z } from 'zod';

export const ContactMessageCreateSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  email: z.string().email('Adresse e-mail valide requise'),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(3, 'Le sujet doit comporter au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit comporter au moins 10 caractères'),
});
export type ContactMessageCreateInput = z.infer<typeof ContactMessageCreateSchema>;

export const ContactMessageSchema = ContactMessageCreateSchema.extend({
  id: z.string().uuid(),
  isRead: z.boolean(),
  isArchived: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ContactMessageDto = z.infer<typeof ContactMessageSchema>;
