import { PrismaClient, Role, AppointmentStatus, ContentStatus } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Nettoyage et initialisation des données Aurelex Notaires...');

  // 1. Create Super Admin User
  const passwordHash = await argon2.hash('AurelexAdmin2026!', {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aurelex-notaires.fr' },
    update: { passwordHash },
    create: {
      email: 'admin@aurelex-notaires.fr',
      passwordHash,
      firstName: 'Alexandre',
      lastName: 'de Saint-Germain',
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`[Seed] Super Administrateur créé : ${admin.email}`);

  // 2. Seed Expertises
  const expertisesData = [
    {
      icon: 'Building',
      displayOrder: 1,
      translations: [
        {
          locale: 'fr',
          title: 'Droit Immobilier & Actes Authentiques',
          slug: 'immobilier',
          shortDescription: 'Sécurisation intégrale de vos opérations d’achat, de vente et d’investissement foncier.',
          fullContent: 'L’office notarial Aurelex intervient dans tous les aspects du droit immobilier : promesses de vente, vérifications des servitudes, purges des droits de préemption et authentification des transferts de propriété.',
        },
        {
          locale: 'en',
          title: 'Real Estate Law & Authentic Deeds',
          slug: 'real-estate',
          shortDescription: 'End-to-end legal certainty for property acquisitions, sales, and investments.',
          fullContent: 'Aurelex Notaires assists international and domestic clients in real estate acquisitions, contract drafting, and title registration under French civil law.',
        },
      ],
    },
    {
      icon: 'HeartHandshake',
      displayOrder: 2,
      translations: [
        {
          locale: 'fr',
          title: 'Droit de la Famille & Successions',
          slug: 'famille-succession',
          shortDescription: 'Accompagnement bienveillant et rigoureux des moments charnières de votre vie familiale.',
          fullContent: 'Transmission de patrimoine, donations-partages, contrats de mariage, PACS, testaments authentiques et règlements amiables de successions.',
        },
        {
          locale: 'en',
          title: 'Family & Succession Law',
          slug: 'family-estate',
          shortDescription: 'Dedicated legal counsel for inheritance, donations, and family wealth preservation.',
          fullContent: 'We provide strategic guidance on cross-border inheritance, estate planning, marriage contracts, and inter-vivos family donations.',
        },
      ],
    },
  ];

  for (const exp of expertisesData) {
    const createdExp = await prisma.expertise.create({
      data: {
        icon: exp.icon,
        displayOrder: exp.displayOrder,
        isPublished: true,
      },
    });

    for (const t of exp.translations) {
      await prisma.expertiseTranslation.create({
        data: {
          expertiseId: createdExp.id,
          locale: t.locale,
          title: t.title,
          slug: t.slug,
          shortDescription: t.shortDescription,
          fullContent: t.fullContent,
        },
      });
    }
  }

  // 3. Seed Articles
  const article1 = await prisma.article.create({
    data: {
      isFeatured: true,
    },
  });

  await prisma.articleTranslation.create({
    data: {
      articleId: article1.id,
      locale: 'fr',
      title: 'Loi de finances : Les opportunités d’anticipation par la donation-partage',
      slug: 'loi-finances-donation-partage',
      excerpt: 'La donation-partage demeure l’outil d’excellence pour figer la valeur des biens transmis et éviter les conflits liquidatifs.',
      content: 'Dans le cadre de la planification patrimoniale, la donation-partage permet de répartir de son vivant des biens entre ses enfants en figeant leur valeur au jour de l’acte...',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  await prisma.articleTranslation.create({
    data: {
      articleId: article1.id,
      locale: 'en',
      title: 'French Finance Act: Estate planning benefits of inter-vivos gifts',
      slug: 'french-finance-act-gifts',
      excerpt: 'Inter-vivos gift-partition is the premier tool to fix property values and prevent future succession disputes.',
      content: 'Under French inheritance law, inter-vivos partition allows parents to allocate assets among children while freezing their valuation at deed date...',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  // 4. Seed Demonstrative Appointments
  await prisma.appointment.createMany({
    data: [
      {
        fullName: 'Claire de Montmirail',
        email: 'claire.montmirail@exemple.fr',
        phone: '06 12 34 56 78',
        motif: 'IMMOBILIER',
        preferredDate: '15 Décembre 2026',
        preferredTimeSlot: 'Matin (09h00 - 12h00)',
        message: 'Acquisition d’un appartement haussmannien dans le 8ème arrondissement. Promesse à régulariser sous 15 jours.',
        status: AppointmentStatus.REVIEWING,
        internalNotes: 'Dossier confié à Me Alexandre de Saint-Germain. Compromis d’agence reçu le 18/11.',
      },
      {
        fullName: 'Dr. Marc Vigneron',
        email: 'm.vigneron@clinique-paris.fr',
        phone: '01 45 67 89 10',
        motif: 'FAMILLE',
        preferredDate: 'Dès que possible',
        preferredTimeSlot: 'Après-midi (14h00 - 18h00)',
        message: 'Donation-partage au profit de nos 3 enfants avec clause de réserve d’usufruit.',
        status: AppointmentStatus.PENDING,
      },
      {
        fullName: 'SAS Invest Capital',
        email: 'contact@invest-cap.fr',
        phone: '01 40 50 60 70',
        motif: 'ENTREPRISE',
        preferredDate: 'Semaine prochaine',
        preferredTimeSlot: 'Indifférent',
        message: 'Mise en place d’un engagement collectif de conservation de titres (Pacte Dutreil).',
        status: AppointmentStatus.CONFIRMED,
        internalNotes: 'Rendez-vous fixé au jeudi 26 novembre à 15h00 au cabinet.',
      },
    ],
  });

  // 5. Seed Contact Messages
  await prisma.contactMessage.createMany({
    data: [
      {
        fullName: 'Julien Lefebvre',
        email: 'j.lefebvre@avocat-conseil.fr',
        phone: '06 98 76 54 32',
        subject: 'Demande de communication d’état liquidatif successoral',
        message: 'Chers confrères, je représente l’un des héritiers dans la succession ouverte à votre étude. Pourriez-vous me transmettre l’état provisoire ?',
        isRead: false,
        isArchived: false,
      },
      {
        fullName: 'Mme Béatrice Renaud',
        email: 'beatrice.renaud@gmail.com',
        phone: '01 30 40 50 60',
        subject: 'Renseignements sur le mandat de protection future',
        message: 'Bonjour, ma mère âgée souhaite désigner son tuteur par anticipation. Quels sont les documents à vous fournir ?',
        isRead: true,
        isArchived: false,
      },
    ],
  });

  console.log('[Seed] Initialisation terminée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
