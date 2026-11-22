import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Building, HeartHandshake, Briefcase, TrendingUp, Globe2, Calendar, ArrowRight } from 'lucide-react';

export default function ExpertisesPage() {
  const t = useTranslations('expertises');

  const expertises = [
    {
      icon: Building,
      img: '/images/domaine_immobilier.jpg',
      num: '01',
      title: 'Droit Immobilier & Actes Authentiques',
      subtitle: "Sécurisation intégrale de vos opérations d'achat, de vente et d'investissement foncier.",
      details: [
        'Rédaction et signature de promesses unilatérales et compromis de vente.',
        'Purges des droits de préemption urbains (DPU) et vérifications hypothécaires.',
        'Règlements de copropriété, divisions parcellaires et servitudes.',
        'Prêts immobiliers, hypothèques conventionnelles et inscriptions de privilèges.',
      ],
    },
    {
      icon: HeartHandshake,
      img: '/images/domaine_famille.jpg',
      num: '02',
      title: 'Famille & Transmission',
      subtitle: 'Accompagnement rigoureux des moments charnières de votre vie familiale.',
      details: [
        'Donations simples, donations-partages et donations entre époux.',
        'Successions : actes de notoriété, déclarations fiscales, partages amiables.',
        'Contrats de mariage, conventions de PACS et régimes matrimoniaux.',
        'Testaments authentiques, mandats de protection future.',
      ],
    },
    {
      icon: Briefcase,
      img: '/images/domaine_entreprise.jpg',
      num: '03',
      title: 'Droit des Affaires & Sociétés',
      subtitle: 'Conseil stratégique pour les dirigeants, repreneurs et investisseurs.',
      details: [
        'Constitution de sociétés civiles (SCI, SCEA) et commerciales (SAS, SARL).',
        'Pacte Dutreil : exonération fiscale à concurrence de 75 % de la valeur des titres.',
        'Cession de fonds de commerce, baux commerciaux et parts sociales.',
        "Transmission intergénérationnelle d'entreprises familiales.",
      ],
    },
    {
      icon: TrendingUp,
      img: '/images/domaine_patrimoine.jpg',
      num: '04',
      title: 'Fiscalité & Stratégie Patrimoniale',
      subtitle: 'Optimisation de la structuration et de la préservation de vos actifs.',
      details: [
        'Audit patrimonial civil et fiscal sur mesure.',
        'Démembrement de propriété (usufruit temporaire ou viager).',
        'Assurance-vie et clauses bénéficiaires démembrées.',
        "Stratégies de détention immobilière (SCI à l'IR vs IS).",
      ],
    },
    {
      icon: Globe2,
      img: '/images/domaine_international.jpg',
      num: '05',
      title: 'Droit Notarial International',
      subtitle: 'Dossiers transfrontaliers pour expatriés et non-résidents.',
      details: [
        'Règlement européen des successions (choix de loi successorale).',
        'Acquisitions immobilières en France par non-résidents.',
        'Régimes matrimoniaux internationaux et conventions de La Haye.',
        'Procurations authentiques internationales et apostille.',
      ],
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">

      {/* ── HERO avec image fond ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/domaine_immobilier.jpg" alt="Expertises Aurelex" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Champs d'action juridique</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── EXPERTISES IMMERSIVES CLAIR ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
          {expertises.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative group overflow-hidden rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 bg-white ${isEven ? 'animate-slide-left' : 'animate-slide-right'}`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Image fond avec overlay lumineux */}
                <div className="absolute inset-0">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${isEven
                    ? 'bg-gradient-to-r from-white/96 via-white/88 to-white/40'
                    : 'bg-gradient-to-l from-white/96 via-white/88 to-white/40'
                  } transition-all duration-500`} />
                </div>

                {/* Contenu */}
                <div className="relative z-10 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[320px]">
                  {/* Col Gauche : Header domaine */}
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-6xl font-light text-blue-600/25 group-hover:text-blue-600/40 transition-colors leading-none select-none">
                        {item.num}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:border-blue-400 group-hover:text-blue-700 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h2>
                    <div className="neon-line w-12 group-hover:w-28 transition-all duration-500" />
                    <p className="text-sm text-slate-600 leading-relaxed max-w-sm">{item.subtitle}</p>
                    <Link href="/rendez-vous" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800 transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Consultation dans ce domaine</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Col Droite : Liste prestations */}
                  <div className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 shadow-sm ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-blue-700 font-bold mb-5">
                      Prestations & Actes Authentiques
                    </h4>
                    <ul className="space-y-3.5">
                      {item.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-slate-200 animate-fade-in-up">
        <div className="max-w-2xl mx-auto px-5 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Un dossier, <span className="font-light italic blue-gradient-text">une expertise dédiée</span>
          </h2>
          <Link href="/rendez-vous" className="btn-liquid-primary inline-flex">
            <Calendar className="w-4 h-4 text-white" />
            <span>Solliciter un entretien préliminaire</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
