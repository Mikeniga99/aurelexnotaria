-- Seed Aurelex Notaires

-- 1. Super Admin
INSERT INTO "users" ("id", "email", "passwordHash", "firstName", "lastName", "role", "isActive", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@aurelex-notaires.fr',
  '$argon2id$v=19$m=65536,t=3,p=1$RwiRQTM9UHjK1aEN1eet/Q$v2whVKkOknb6bV3XzDx27chQjV/WRruFZRSIm6SxjII',
  'Alexandre',
  'de Saint-Germain',
  'SUPER_ADMIN',
  true,
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO UPDATE SET
  "passwordHash" = EXCLUDED."passwordHash",
  "role" = 'SUPER_ADMIN',
  "isActive" = true;

-- 2. Expertises & Traductions
DO $$
DECLARE
  exp1_id text := gen_random_uuid()::text;
  exp2_id text := gen_random_uuid()::text;
  art1_id text := gen_random_uuid()::text;
BEGIN
  -- Expertise 1: Immobilier
  INSERT INTO "expertises" ("id", "icon", "displayOrder", "isPublished", "createdAt", "updatedAt")
  VALUES (exp1_id, 'Building', 1, true, NOW(), NOW());

  INSERT INTO "expertise_translations" ("id", "expertiseId", "locale", "title", "slug", "shortDescription", "fullContent")
  VALUES 
  (gen_random_uuid()::text, exp1_id, 'fr', 'Droit Immobilier & Actes Authentiques', 'immobilier', 
   'Sécurisation intégrale de vos opérations d’achat, de vente et d’investissement foncier.', 
   'L’office notarial Aurelex intervient dans tous les aspects du droit immobilier : promesses de vente, vérifications des servitudes, purges des droits de préemption et authentification des transferts de propriété.'),
  (gen_random_uuid()::text, exp1_id, 'en', 'Real Estate Law & Authentic Deeds', 'real-estate', 
   'End-to-end legal certainty for property acquisitions, sales, and investments.', 
   'Aurelex Notaires assists international and domestic clients in real estate acquisitions, contract drafting, and title registration under French civil law.');

  -- Expertise 2: Famille & Succession
  INSERT INTO "expertises" ("id", "icon", "displayOrder", "isPublished", "createdAt", "updatedAt")
  VALUES (exp2_id, 'HeartHandshake', 2, true, NOW(), NOW());

  INSERT INTO "expertise_translations" ("id", "expertiseId", "locale", "title", "slug", "shortDescription", "fullContent")
  VALUES 
  (gen_random_uuid()::text, exp2_id, 'fr', 'Droit de la Famille & Successions', 'famille-succession', 
   'Accompagnement bienveillant et rigoureux des moments charnières de votre vie familiale.', 
   'Transmission de patrimoine, donations-partages, contrats de mariage, PACS, testaments authentiques et règlements amiables de successions.'),
  (gen_random_uuid()::text, exp2_id, 'en', 'Family & Succession Law', 'family-estate', 
   'Dedicated legal counsel for inheritance, donations, and family wealth preservation.', 
   'We provide strategic guidance on cross-border inheritance, estate planning, marriage contracts, and inter-vivos family donations.');

  -- 3. Article 1
  INSERT INTO "articles" ("id", "coverImage", "isFeatured", "createdAt", "updatedAt")
  VALUES (art1_id, NULL, true, NOW(), NOW());

  INSERT INTO "article_translations" ("id", "articleId", "locale", "title", "slug", "excerpt", "content", "status", "publishedAt", "createdAt", "updatedAt")
  VALUES
  (gen_random_uuid()::text, art1_id, 'fr', 
   'Loi de finances : Les opportunités d’anticipation par la donation-partage', 
   'loi-finances-donation-partage', 
   'La donation-partage demeure l’outil d’excellence pour figer la valeur des biens transmis et éviter les conflits liquidatifs.', 
   'Dans le cadre de la planification patrimoniale, la donation-partage permet de répartir de son vivant des biens entre ses enfants en figeant leur valeur au jour de l’acte...', 
   'PUBLISHED', NOW(), NOW(), NOW()),
  (gen_random_uuid()::text, art1_id, 'en', 
   'French Finance Act: Estate planning benefits of inter-vivos gifts', 
   'french-finance-act-gifts', 
   'Inter-vivos gift-partition is the premier tool to fix property values and prevent future succession disputes.', 
   'Under French inheritance law, inter-vivos partition allows parents to allocate assets among children while freezing their valuation at deed date...', 
   'PUBLISHED', NOW(), NOW(), NOW());

END $$;

-- 4. Rendez-vous de démonstration
INSERT INTO "appointments" ("id", "fullName", "email", "phone", "motif", "preferredDate", "preferredTimeSlot", "message", "status", "internalNotes", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'Claire de Montmirail', 'claire.montmirail@exemple.fr', '06 12 34 56 78', 'IMMOBILIER', '15 Décembre 2026', 'Matin (09h00 - 12h00)', 'Acquisition d’un appartement haussmannien dans le 8ème arrondissement. Promesse à régulariser sous 15 jours.', 'REVIEWING', 'Dossier confié à Me Alexandre de Saint-Germain. Compromis d’agence reçu le 18/11.', NOW(), NOW()),
(gen_random_uuid()::text, 'Dr. Marc Vigneron', 'm.vigneron@clinique-paris.fr', '01 45 67 89 10', 'FAMILLE', 'Dès que possible', 'Après-midi (14h00 - 18h00)', 'Donation-partage au profit de nos 3 enfants avec clause de réserve d’usufruit.', 'PENDING', NULL, NOW(), NOW()),
(gen_random_uuid()::text, 'SAS Invest Capital', 'contact@invest-cap.fr', '01 40 50 60 70', 'ENTREPRISE', 'Semaine prochaine', 'Indifférent', 'Mise en place d’un engagement collectif de conservation de titres (Pacte Dutreil).', 'CONFIRMED', 'Rendez-vous fixé au jeudi 26 novembre à 15h00 au cabinet.', NOW(), NOW());

-- 5. Messages de contact de démonstration
INSERT INTO "contact_messages" ("id", "fullName", "email", "phone", "subject", "message", "isRead", "isArchived", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'Julien Lefebvre', 'j.lefebvre@avocat-conseil.fr', '06 98 76 54 32', 'Demande de communication d’état liquidatif successoral', 'Chers confrères, je représente l’un des héritiers dans la succession ouverte à votre étude. Pourriez-vous me transmettre l’état provisoire ?', false, false, NOW(), NOW()),
(gen_random_uuid()::text, 'Mme Béatrice Renaud', 'beatrice.renaud@gmail.com', '01 30 40 50 60', 'Renseignements sur le mandat de protection future', 'Bonjour, ma mère âgée souhaite désigner son tuteur par anticipation. Quels sont les documents à vous fournir ?', true, false, NOW(), NOW());
