import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Building, HeartHandshake, Briefcase, TrendingUp, Globe2, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export default function ExpertisesPage() {
  const t = useTranslations('expertises');

  const expertises = [
    {
      icon: Building,
      img: '/images/domaine_immobilier.jpg',
      num: '01',
      tag: 'IMMOBILIER',
      title: 'Droit Immobilier & Actes Authentiques',
      subtitle: "Sécurisation intégrale de vos opérations d'achat, de vente et d'investissement foncier.",
      details: [
        'Rédaction et signature de promesses unilatérales et compromis de vente avec conditions suspensives.',
        'Purges des droits de préemption urbains (DPU) et vérifications des origines de propriété sur 30 ans.',
        'Immobilier d’investissement, VEFA, baux commerciaux et divisions en copropriété.',
        'Prêts immobiliers, hypothèques conventionnelles et radiation d’inscriptions.',
      ],
    },
    {
      icon: HeartHandshake,
      img: '/images/domaine_famille.jpg',
      num: '02',
      tag: 'FAMILLE',
      title: 'Famille, Successions & Transmission',
      subtitle: 'Accompagnement rigoureux des moments charnières de votre vie familiale.',
      details: [
        'Donations simples, donations-partages transgénérationnelles avec réserve d’usufruit.',
        'Règlement complet des successions : acte de notoriété, inventaire notarié et déclaration fiscale.',
        'Contrats de mariage sur mesure, conventions de PACS et changements de régimes matrimoniaux.',
        'Testaments authentiques et mandats de protection future enregistrés au FCDDV.',
      ],
    },
    {
      icon: Briefcase,
      img: '/images/domaine_entreprise.jpg',
      num: '03',
      tag: 'ENTREPRISES',
      title: 'Droit des Affaires & Sociétés',
      subtitle: 'Conseil stratégique pour les dirigeants, repreneurs et investisseurs.',
      details: [
        'Mise en place de pactes Dutreil : exonération fiscale de 75 % de la valeur taxable des titres transmis.',
        'Constitution de sociétés civiles immobilières (SCI) et sociétés commerciales (SAS, SARL).',
        'Cession de fonds de commerce, séquestre du prix de vente et opposition des créanciers.',
        'Pactes d’actionnaires, gouvernance familiale et transmission d’entreprises.',
      ],
    },
    {
      icon: TrendingUp,
      img: '/images/domaine_patrimoine.jpg',
      num: '04',
      tag: 'PATRIMOINE',
      title: 'Fiscalité & Stratégie Patrimoniale',
      subtitle: 'Optimisation de la structuration et de la préservation de vos actifs.',
      details: [
        'Bilan patrimonial approfondi intégrant aspects civils, fiscaux et financiers.',
        'Démembrement temporaire ou viager de la propriété immobilière ou mobilière.',
        'Rédaction de clauses bénéficiaires testamentaires et d’assurance-vie démembrées.',
        'Optimisation de l’Impôt sur la Fortune Immobilière (IFI) et des déductions d’emprunt.',
      ],
    },
    {
      icon: Globe2,
      img: '/images/domaine_international.jpg',
      num: '05',
      tag: 'INTERNATIONAL',
      title: 'Droit Notarial International',
      subtitle: 'Dossiers transfrontaliers pour expatriés, binationaux et non-résidents.',
      details: [
        'Règlement européen des successions : choix de la loi successorale applicable (professio juris).',
        'Acquisitions et cessions immobilières en France par des investisseurs résidant à l’étranger.',
        'Régimes matrimoniaux internationaux et conventions internationales de La Haye.',
        'Procurations authentiques dématérialisées, apostille et légalisation consulaire.',
      ],
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/domaine_immobilier.jpg"
            alt="Expertises notariales Aurelex"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <ScrollReveal variant="right" delay={150}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              {t('title')}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={260}>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CARTES ÉDITORIALES D'EXPERTISES ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          {expertises.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

                  {/* Photo du domaine */}
                  <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full ${isEven ? '' : 'lg:order-2'}`}>
                    <ScrollReveal variant={isEven ? 'left' : 'right'} className="w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-full relative">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-blue-900 flex items-center gap-2 shadow-sm">
                        <Icon className="w-4 h-4 text-blue-700" />
                        <span>{item.tag}</span>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Contenu textuel avec rebond de la droite */}
                  <div className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                    <ScrollReveal variant={isEven ? 'right' : 'left'} delay={150}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-3xl font-extrabold text-blue-700">
                            {item.num}.
                          </span>
                          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 leading-snug">
                            {item.title}
                          </h2>
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                          {item.subtitle}
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* Prestations détaillées */}
                    <ScrollReveal variant="bottom" delay={250}>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                          Actes & Prestations Réglementées
                        </h3>
                        <ul className="space-y-3">
                          {item.details.map((d, di) => (
                            <li key={di} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                              <span className="leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="bottom" delay={320}>
                      <div className="pt-2">
                        <Link
                          href="/rendez-vous"
                          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.96]"
                        >
                          <Calendar className="w-4 h-4 text-white" />
                          <span>Prendre rendez-vous dans ce domaine</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </Link>
                      </div>
                    </ScrollReveal>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BANDE CTA ── */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-5 text-center space-y-6">
          <ScrollReveal variant="right">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
              Un projet juridique spécifique ?
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={150}>
            <p className="text-base text-slate-700">
              Nos notaires et juristes spécialisés étudient vos pièces et vous répondent dans un cadre strictement confidentiel.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="pop" delay={240}>
            <Link href="/rendez-vous" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.96]">
              <Calendar className="w-4 h-4 text-white" />
              <span>Initier une consultation notariale</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
