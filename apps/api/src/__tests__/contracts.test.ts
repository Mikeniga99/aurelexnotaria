import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  LoginSchema,
  AppointmentCreateSchema,
  ContactMessageCreateSchema,
  AppointmentStatus,
  Role,
} from '@notaria/contracts';

describe('Contracts & Validations Zod (Unit Tests)', () => {
  describe('LoginSchema', () => {
    it('doit valider des identifiants corrects', () => {
      const valid = LoginSchema.safeParse({
        email: 'notaire@aurelex-notaires.fr',
        password: 'ValidPassword123!',
      });
      assert.strictEqual(valid.success, true);
    });

    it('doit refuser un email malformé', () => {
      const invalid = LoginSchema.safeParse({
        email: 'invalid-email',
        password: 'ValidPassword123!',
      });
      assert.strictEqual(invalid.success, false);
    });

    it('doit refuser un mot de passe trop court (< 8 caractères)', () => {
      const invalid = LoginSchema.safeParse({
        email: 'notaire@aurelex-notaires.fr',
        password: 'short',
      });
      assert.strictEqual(invalid.success, false);
    });
  });

  describe('AppointmentCreateSchema', () => {
    it('doit valider une demande de rendez-vous complète', () => {
      const valid = AppointmentCreateSchema.safeParse({
        fullName: 'Jean Dupont',
        email: 'jean.dupont@exemple.fr',
        phone: '01 42 68 00 00',
        motif: 'IMMOBILIER',
        preferredDate: '15 décembre 2026',
        preferredTimeSlot: 'Matin (09h00 - 12h00)',
        message: 'Achat appartement',
      });
      assert.strictEqual(valid.success, true);
    });

    it('doit refuser une demande sans motif ou sans numéro de téléphone', () => {
      const invalid = AppointmentCreateSchema.safeParse({
        fullName: 'Jean Dupont',
        email: 'jean.dupont@exemple.fr',
        phone: '', // Téléphone obligatoire
        motif: 'INVALIDE',
        preferredDate: 'Demain',
      });
      assert.strictEqual(invalid.success, false);
    });
  });

  describe('ContactMessageCreateSchema', () => {
    it('doit valider un message de contact correct', () => {
      const valid = ContactMessageCreateSchema.safeParse({
        fullName: 'Pierre Durand',
        email: 'pierre.durand@test.fr',
        subject: 'Demande de devis',
        message: 'Bonjour, je souhaite un devis pour une succession.',
      });
      assert.strictEqual(valid.success, true);
    });

    it('doit refuser un message de moins de 10 caractères', () => {
      const invalid = ContactMessageCreateSchema.safeParse({
        fullName: 'Pierre Durand',
        email: 'pierre.durand@test.fr',
        subject: 'Test',
        message: 'Court',
      });
      assert.strictEqual(invalid.success, false);
    });
  });
});
