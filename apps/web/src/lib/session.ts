import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userRole?: string;
  isLoggedIn?: boolean;
}

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'notaria_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
