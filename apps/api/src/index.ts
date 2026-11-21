import app from './app';
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
  console.log(`[Aurelex Notaires API] Serveur démarré avec succès sur le port ${env.PORT}`);
  console.log(`[Aurelex Notaires API] Environnement : ${env.NODE_ENV}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt gracieux du serveur...');
  server.close(() => {
    process.exit(0);
  });
});
