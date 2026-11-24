import { z } from 'zod';
import { Role } from './enums';

export const RegisterSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
  firstName: z.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum([
    Role.VISITOR,
    Role.COLLABORATOR,
    Role.EDITOR,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  ]),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserDto = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  role: z.enum([
    Role.COLLABORATOR,
    Role.EDITOR,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  ]).default(Role.COLLABORATOR),
});
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
