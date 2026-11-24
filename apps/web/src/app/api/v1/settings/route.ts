import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStaffRole, handleApiError, recordAuditLog } from '@/lib/api-helpers';

export const dynamic = 'force-dynamic';

const DEFAULT_SETTINGS: Record<string, string> = {
  office_name: 'Aurelex Notaires & Associés',
  office_siret: '842 194 002 00018',
  office_address: '14, Place Vendôme, 75001 Paris',
  office_phone: '+33 (0)1 42 68 55 00',
  office_email: 'contact@aurelex-notaires.fr',
  office_hours: 'Du Lundi au Vendredi de 09h00 à 19h00 (sur rendez-vous)',
  rdv_enabled: 'true',
  rdv_slot_duration: '45',
  rdv_min_notice_hours: '24',
  rdv_auto_confirm: 'false',
  rate_tranche_1: '3.870',
  rate_tranche_2: '1.596',
  rate_tranche_3: '1.064',
  rate_tranche_4: '0.799',
  formalites_moyennes: '1200',
  template_rdv_received: 'Votre demande de rendez-vous a bien été enregistrée par notre secrétariat. Nous étudions votre dossier et vous confirmerons le créneau sous 24h ouvrées.',
  template_rdv_confirmed: 'Votre rendez-vous avec un notaire de l’office Aurelex est confirmé. Merci de vous munir des pièces justificatives demandées lors de votre entretien.',
};

export async function GET() {
  try {
    await requireStaffRole();

    const dbSettings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };

    for (const s of dbSettings) {
      settingsMap[s.key] = s.value;
    }

    return NextResponse.json({
      success: true,
      data: settingsMap,
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireStaffRole();
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: { message: 'Données invalides' } },
        { status: 400 }
      );
    }

    const updatedKeys: string[] = [];

    for (const [key, val] of Object.entries(body)) {
      if (typeof val === 'string') {
        await prisma.setting.upsert({
          where: { key },
          update: { value: val },
          create: { key, value: val, description: `Paramètre système ${key}` },
        });
        updatedKeys.push(key);
      }
    }

    await recordAuditLog({
      userId: session.userId,
      action: 'UPDATE_SETTINGS',
      entity: 'SETTING',
      details: { updatedKeysCount: updatedKeys.length, keys: updatedKeys },
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      message: 'Paramètres enregistrés avec succès.',
    });
  } catch (err) {
    return handleApiError(err);
  }
}
