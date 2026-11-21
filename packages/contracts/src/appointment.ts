import { z } from 'zod';
import { AppointmentStatus } from './enums';

export const AppointmentMotif = {
  IMMOBILIER: 'IMMOBILIER', // Achat, vente, prêt hypothécaire
  FAMILLE: 'FAMILLE', // Mariage, PACS, succession, donation, testament
  ENTREPRISE: 'ENTREPRISE', // Création société, cession de fonds, pacte d'associés
  PATRIMOINE: 'PATRIMOINE', // Stratégie patrimoniale, fiscalité
  AUTRE: 'AUTRE',
} as const;
export type AppointmentMotif = (typeof AppointmentMotif)[keyof typeof AppointmentMotif];

export const AppointmentCreateSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  email: z.string().email('Adresse e-mail valide requise'),
  phone: z.string().min(6, 'Numéro de téléphone requis'),
  motif: z.enum([
    AppointmentMotif.IMMOBILIER,
    AppointmentMotif.FAMILLE,
    AppointmentMotif.ENTREPRISE,
    AppointmentMotif.PATRIMOINE,
    AppointmentMotif.AUTRE,
  ]),
  preferredDate: z.string().min(1, 'La date ou période souhaitée est requise'),
  preferredTimeSlot: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
});
export type AppointmentCreateInput = z.infer<typeof AppointmentCreateSchema>;

export const AppointmentStatusUpdateSchema = z.object({
  status: z.enum([
    AppointmentStatus.PENDING,
    AppointmentStatus.REVIEWING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.REJECTED,
    AppointmentStatus.CANCELLED,
  ]),
  internalNotes: z.string().optional(),
});
export type AppointmentStatusUpdateInput = z.infer<typeof AppointmentStatusUpdateSchema>;

export const AppointmentDtoSchema = AppointmentCreateSchema.extend({
  id: z.string().uuid(),
  status: z.enum([
    AppointmentStatus.PENDING,
    AppointmentStatus.REVIEWING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.REJECTED,
    AppointmentStatus.CANCELLED,
  ]),
  internalNotes: z.string().nullable().optional(),
  assignedToId: z.string().uuid().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type AppointmentDto = z.infer<typeof AppointmentDtoSchema>;
