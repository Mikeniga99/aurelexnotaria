import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config(); // fallback to local .env

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://notaria_user:notaria_password@localhost:5432/notaria_db?schema=public',
  SESSION_SECRET: process.env.SESSION_SECRET || 'aurelex_default_secret_key_minimum_32_characters_notaria',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL || 'contact@aurelex-notaires.fr',
  isProduction: process.env.NODE_ENV === 'production',
};
