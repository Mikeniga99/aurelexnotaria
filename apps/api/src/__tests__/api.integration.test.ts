import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app';

describe('Aurelex Notaires API (Integration Tests with Supertest)', () => {
  describe('GET /api/v1/health', () => {
    it('doit répondre 200 avec le statut du service', async () => {
      const res = await request(app).get('/api/v1/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'ok');
      assert.strictEqual(res.body.service, 'Aurelex Notaires API');
    });
  });

  describe('RBAC & Route Protection Tests (Security)', () => {
    it('doit refuser l’accès aux rendez-vous administratifs sans session (401)', async () => {
      const res = await request(app).get('/api/v1/appointments');
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'UNAUTHORIZED');
    });

    it('doit refuser l’accès au tableau de bord stats sans session (401)', async () => {
      const res = await request(app).get('/api/v1/stats/dashboard');
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'UNAUTHORIZED');
    });

    it('doit refuser l’accès à la liste des messages sans session (401)', async () => {
      const res = await request(app).get('/api/v1/contacts');
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'UNAUTHORIZED');
    });
  });

  describe('Public Endpoints & Input Validations', () => {
    it('doit renvoyer 400 avec des détails Zod si le formulaire de rendez-vous est invalide', async () => {
      const res = await request(app)
        .post('/api/v1/appointments')
        .send({
          fullName: 'A', // Trop court
          email: 'not-an-email',
          motif: 'INVALID_MOTIF',
        });

      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'VALIDATION_ERROR');
      assert.strictEqual(Array.isArray(res.body.error.details), true);
    });

    it('doit renvoyer 400 si le formulaire de contact est incomplet', async () => {
      const res = await request(app)
        .post('/api/v1/contacts')
        .send({
          fullName: 'Test',
          email: 'invalid',
        });

      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'VALIDATION_ERROR');
    });
  });
});
