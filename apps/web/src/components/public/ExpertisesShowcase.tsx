'use client';

import React, { useState } from 'react';
import {
  Building2,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  FileCheck2,
  ArrowRight,
  ShieldAlert,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export function ExpertisesShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      numeral: 'I',
      tag: 'IMMOBILIER INSTITUTIONNEL & RÉSIDENTIEL',
      title: 'Sécurisation des Actes & Cessions Immobilières',
      icon: Building2,
      subtitle: 'Du compromis sous seing privé à l’acte authentique revêtu de la formule exécutoire.',
      description:
        'L’achat ou la vente d’un bien immobilier engage l’avenir financier d’une vie ou d’un bilan d’entreprise. L’office Aurelex Notaires procède à une analyse exhaustive de l’origine de propriété sur plus de trente ans, purge les droits de préemption urbains et sécurise le déblocage des fonds auprès des établissements prêteurs.',
      keyPoints: [
        'Rédaction de promesses unilatérales et de compromis de vente avec conditions suspensives d’emprunt.',
        'Assainissement des situations hypothécaires et radiation d’inscriptions.',
        'Immobilier d’investissement, VEFA, baux commerciaux et divisions en volumes.',
        'Téléactes et télétransmission dématérialisée immédiate à la publicité foncière.',
      ],
      ctaText: 'Initier un dossier immobilier',
    },
    {
      numeral: 'II',
      tag: 'DROIT CIVIL, SUCCESSIONS & FAMILLE',
      title: 'Transmission Supragénérationnelle & Droit de la Famille',
      icon: HeartHandshake,
      subtitle: 'Anticiper pour protéger, pacifier et optimiser la dévolution de vos actifs.',
      description:
        'Face aux complexités des familles contemporaines et aux barèmes fiscaux successoraux élevés, la donation-partage et le démembrement de propriété permettent de figer la valeur vénale des actifs et d’éviter les conflits liquidatifs entre héritiers lors de l’ouverture de la succession.',
      keyPoints: [
        'Donation-partage avec réserve d’usufruit et clause d’inaliénabilité.',
        'Règlement successoral complet : acte de notoriété, inventaire notarié et déclaration fiscale.',
        'Régimes matrimoniaux sur mesure, séparation de biens avec société d’acquêts, conventions de PACS.',
        'Mandats de protection future et testaments authentiques enregistrés au FCDDV.',
      ],
      ctaText: 'Consulter sur une succession ou donation',
    },
    {
      numeral: 'III',
      tag: 'INGÉNIERIE SOCIÉTAIRE & DIRIGEANTS',
      title: 'Droit des Entreprises, Fusions & Pacte Dutreil',
      icon: Briefcase,
      subtitle: 'Pérenniser l’outil professionnel et orchestrer la gouvernance actionnariale.',
      description:
        'Le chef d’entreprise doit concilier vision opérationnelle et protection patrimoniale. Nous accompagnons les fondateurs, repreneurs et holdings familiales lors de chaque acte structurant : rédaction des statuts de sociétés holding civiles ou SAS, cession de titres et sécurisation des transmissions.',
      keyPoints: [
        'Mise en place de pactes Dutreil : exonération de 75 % sur la valeur taxable des titres transmis.',
        'Constitution de SCI patrimoniales (choix stratégique IR / IS) et de SASU/SAS.',
        'Cession de fonds de commerce, séquestre notarial du prix et opposition créanciers.',
        'Pactes d’actionnaires, clauses de préemption et conventions de trésorerie intragroupe.',
      ],
      ctaText: 'Structurer votre entreprise',
    },
    {
      numeral: 'IV',
      tag: 'ARBITRAGE FISCAL & PATRIMOINE',
      title: 'Stratégie de Détention & Conseil Patrimonial',
      icon: TrendingUp,
      subtitle: 'Une ingénierie juridique au service de la résilience de vos avoirs.',
      description:
        'Le patrimoine requiert un audit pluridisciplinaire permanent : analyse civile des clauses bénéficiaires d’assurance-vie, optimisation de la trésorerie d’entreprise, démembrement temporaire ou viager, et fiscalité des plus-values immobilières ou mobilières.',
      keyPoints: [
        'Bilan patrimonial approfondi intégrant aspects civils, fiscaux et financiers.',
        'Rédaction de clauses bénéficiaires testamentaires ou d’assurance-vie démembrées.',
        'Optimisation de l’Impôt sur la Fortune Immobilière (IFI) et des déductions d’emprunt.',
        'Accompagnement des résidents et non-résidents dans la gestion de patrimoines internationaux.',
      ],
      ctaText: 'Demander un bilan patrimonial',
    },
  ];

  const current = pillars[activeTab];
  const IconComp = current.icon;

  return (
    <div className="space-y-10">
      {/* Tab Navigation Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pillars.map((item, idx) => {
          const isSelected = activeTab === idx;
          const TabIcon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-5 sm:p-6 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-aurelex-bordeaux to-aurelex-bordeaux-dark text-white border-aurelex-champagne shadow-bordeaux-lg'
                  : 'bg-white text-aurelex-ebene border-aurelex-beige-border hover:border-aurelex-champagne/60 hover:bg-aurelex-ivoire shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-serif text-2xl font-bold ${
                    isSelected ? 'text-aurelex-champagne' : 'text-aurelex-champagne-hover'
                  }`}
                >
                  {item.numeral}
                </span>
                <TabIcon
                  className={`w-5 h-5 ${
                    isSelected ? 'text-aurelex-champagne-light' : 'text-aurelex-bordeaux'
                  }`}
                />
              </div>

              <div
                className={`text-[10px] tracking-widest uppercase font-bold mb-1 line-clamp-1 ${
                  isSelected ? 'text-aurelex-champagne-soft' : 'text-aurelex-ebene/60'
                }`}
              >
                {item.tag}
              </div>

              <div
                className={`font-serif text-sm sm:text-base font-bold line-clamp-2 leading-snug ${
                  isSelected ? 'text-white' : 'text-aurelex-bordeaux'
                }`}
              >
                {item.title}
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-aurelex-champagne via-aurelex-champagne-light to-aurelex-champagne" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel - Editorial Luxury Card */}
      <div className="bg-white rounded-3xl border-2 border-aurelex-champagne/30 p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle Watermark Number */}
        <div className="absolute right-6 -bottom-10 font-serif text-[180px] font-bold text-aurelex-champagne/5 select-none pointer-events-none">
          {current.numeral}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/30 text-aurelex-bordeaux text-xs font-bold tracking-wider uppercase">
              <IconComp className="w-3.5 h-3.5 text-aurelex-champagne" />
              <span>Pilier {current.numeral} · {current.tag}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-aurelex-bordeaux leading-tight">
              {current.title}
            </h3>

            <p className="font-serif text-lg text-aurelex-champagne-hover font-medium italic">
              {current.subtitle}
            </p>

            <p className="text-sm sm:text-base text-aurelex-ebene/80 leading-relaxed">
              {current.description}
            </p>

            <div className="pt-3">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-aurelex-champagne" />
                <span>{current.ctaText}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-aurelex-ivoire p-6 sm:p-8 rounded-2xl border border-aurelex-beige-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aurelex-bordeaux border-b border-aurelex-beige-border pb-3">
              <FileCheck2 className="w-4 h-4 text-aurelex-champagne" />
              <span>Compétences Juridiques & Actes Cibles</span>
            </div>

            <ul className="space-y-3.5">
              {current.keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-aurelex-ebene/85">
                  <CheckCircle2 className="w-4 h-4 text-aurelex-champagne shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
