import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { env } from './config/env';
import { errorHandler } from './middleware/error';

// Routes
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointment.routes';
import contactRoutes from './routes/contact.routes';
import articleRoutes from './routes/article.routes';
import expertiseRoutes from './routes/expertise.routes';
import teamRoutes from './routes/team.routes';
import faqRoutes from './routes/faq.routes';
import statsRoutes from './routes/stats.routes';

const app: Application = express();

// Security headers
app.use(helmet());

// CORS configuration (with credentials for secure cookie auth)
app.use(
  cors({
    origin: [env.CORS_ORIGIN, 'http://localhost:3000'],
    credentials: true,
  })
);

// Body parsing with size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Session management with HttpOnly cookies
app.use(
  session({
    name: 'notaria_session',
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: env.isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// Health check endpoint
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Aurelex Notaires API',
  });
});

// Mount API routes under /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/expertises', expertiseRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/stats', statsRoutes);

// Centralized error handling
app.use(errorHandler);

export default app;
