import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { handleApiError } from '@/lib/api-helpers';

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.json({
      success: true,
      message: 'Déconnexion effectuée avec succès.',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
