import { NextResponse } from 'next/server';
import { getSession } from './session';
import { prisma } from './prisma';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function handleApiError(err: unknown): NextResponse {
  if (err instanceof AppError) {
    return NextResponse.json(
      { success: false, error: { code: err.code, message: err.message, details: err.details } },
      { status: err.statusCode }
    );
  }

  // Zod error
  if (err && typeof err === 'object' && 'name' in err && (err as any).name === 'ZodError') {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Les données soumises sont invalides.',
          details: (err as any).errors?.map((e: any) => ({
            path: e.path?.join('.'),
            message: e.message,
          })),
        },
      },
      { status: 400 }
    );
  }

  console.error('[API Error]:', err);
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          process.env.NODE_ENV === 'production'
            ? 'Une erreur interne est survenue. Veuillez réessayer ultérieurement.'
            : (err instanceof Error ? err.message : String(err)),
      },
    },
    { status: 500 }
  );
}

/**
 * Guard that checks if the user is authenticated.
 * Returns the session or throws a 401 response (via NextResponse).
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    throw new AppError(401, 'UNAUTHORIZED', 'Vous devez être connecté pour accéder à cette ressource.');
  }
  return session;
}

/**
 * Guard that checks if the user is authenticated and has administrative/office privileges.
 */
export async function requireStaffRole() {
  const session = await requireAuth();
  if (session.userRole === 'VISITOR' || !session.userRole) {
    throw new AppError(403, 'FORBIDDEN', 'Accès réservé au personnel de l’office notarial.');
  }
  return session;
}

/**
 * Audit log helper: creates an entry in audit_logs for traceability and legal compliance.
 */
export async function recordAuditLog(params: {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Record<string, any> | string | null;
  ipAddress?: string | null;
}) {
  try {
    const detailsStr = params.details
      ? typeof params.details === 'string'
        ? params.details
        : JSON.stringify(params.details)
      : null;

    await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        details: detailsStr,
        ipAddress: params.ipAddress || null,
      },
    });
  } catch (err) {
    console.warn('[AuditLog] Failed to record audit log:', err);
  }
}
