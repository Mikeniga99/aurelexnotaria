import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Building, HeartHandshake, Briefcase, TrendingUp, Globe2, ChevronRight, FileText, Calendar } from 'lucide-react';

export default function ExpertisesPage() {
  const t = useTranslations('expertises');

  const expertises = [
    {
      icon: Building,
      slug: 'immobilier',
      title: 'Droit Immobilier & Actes Authentiques',
      subtitle: 'Sécurisation intégrale de vos opérations d’achat, de vente et d’investissement foncier.',
      details: [
        'Rédaction et signature de promesses unilatérales et compromis de vente.',
        'Puges des droits de préemption urbains (DPU) et vérifications hypothécaires.',
        'Règlements de copropriété, divisions parcellaires et servitudes.',
        'Prêts immobiliers, hypothèques conventionnelles et inscriptions de privilèges.',
      ],
    },
    {
      icon: HeartHandshake,
      slug: 'famille-succession',
      title: 'Droit de la Famille & Transmission',
      subtitle: 'Accompagnement bienveillant et rigoureux des moments charnières de votre vie familiale.',
      details: [
        'Donations simples, donations-partages et donations entre époux.',
        'Règlement des successions : actes de notoriété, déclarations fiscales, partages amiables.',
        'Contrats de mariage, conventions de PACS et changements de régimes matrimoniaux.',
        'Testaments olographes et authentiques, mandats de protection future.',
      ],
    },
    {
      icon: Briefcase,
      slug: 'entreprises',
      title: 'Droit des Affaires & Sociétés',
      subtitle: 'Conseil stratégique et juridique pour les dirigeants, repreneurs et investisseurs.',
      details: [
        'Constitution de sociétés civiles (SCI, SCEA) et commerciales (SAS, SARL).',
        'Pacte Dutreil : exonération fiscale à concurrence de 75 % de la valeur des titres transmis.',
        'Cession de fonds de commerce, baux commerciaux et cession de parts sociales.',
        'Transmission intergénérationnelle d’entreprises familiales.',
      ],
    },
    {
      icon: TrendingUp,
      slug: 'patrimoine',
      title: 'Stratégie & Fiscalité Patrimoniale',
      subtitle: 'Optimisation de la structuration et de la préservation de vos actifs dans le temps.',
      details: [
        'Audit patrimonial civil et fiscal sur mesure.',
        'Démembrement de propriété (usufruit temporaire ou viager et nue-propriété).',
        'Assurance-vie et clauses bénéficiaires sur-mesure démembrées.',
        'Stratégies de détention immobilière (SCI à l’IR vs IS).',
      ],
    },
    {
      icon: Globe2,
      slug: 'international',
      title: 'Droit Notarial International',
      subtitle: 'Règlement des dossiers transfrontaliers pour expatriés et non-résidents.',
      details: [
        'Règlement européen des successions (choix de la loi successorale applicable).',
        'Acquisitions immobilières en France par des non-résidents.',
        'Régimes matrimoniaux internationaux et conventions de La Haye.',
        'Procurations authentiques internationales et apostille.',
      ],
    },
  ];

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire via-white to-aurelex-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-aurelex-champagne" />
            <span>Champs d'Action Juridique</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
            {t('title')}
          </h1>
          <div className="w-20 h-1 bg-aurelex-champagne mx-auto rounded-full" />
          <p className="text-lg text-aurelex-ebene/80 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* List of Expertises */}
        <div className="space-y-8">
          {expertises.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-aurelex-beige-border hover:border-aurelex-champagne shadow-sm hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center">
                      <Icon className="w-7 h-7 text-aurelex-champagne" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-aurelex-bordeaux">
                      {item.title}
                    </h2>
                    <p className="text-sm text-aurelex-ebene/80 leading-relaxed">
                      {item.subtitle}
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/rendez-vous"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-aurelex-bordeaux hover:text-aurelex-champagne transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-aurelex-champagne" />
                        <span>Prendre rendez-vous dans ce domaine</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-aurelex-ivoire/60 p-6 rounded-2xl border border-aurelex-beige-border">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-4">
                      Prestations & Actes Authentiques
                    </h4>
                    <ul className="space-y-3">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-sm text-aurelex-ebene/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-aurelex-champagne shrink-0 mt-2" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
