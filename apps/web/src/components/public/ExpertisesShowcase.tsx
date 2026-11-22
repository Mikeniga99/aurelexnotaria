'use client';

import React, { useState } from 'react';
import {
  Building2,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  FileCheck2,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export function ExpertisesShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      tag: 'IMMOBILIER',
      title: 'Sécurisation des Actes & Cessions Immobilières',
      icon: Building2,
      color: 'from-blue-600/20 to-cyan-500/10',
      accent: 'text-cyan-400',
      border: 'border-cyan-400/30',
      subtitle: "Du compromis sous seing privé à l'acte authentique revêtu de la formule exécutoire.",
      description:
        "L'achat ou la vente d'un bien immobilier engage l'avenir financier d'une vie ou d'un bilan d'entreprise. L'office Aurelex Notaires procède à une analyse exhaustive de l'origine de propriété sur plus de trente ans, purge les droits de préemption urbains et sécurise le déblocage des fonds.",
      keyPoints: [
        "Rédaction de promesses unilatérales et de compromis de vente avec conditions suspensives d'emprunt.",
        'Assainissement des situations hypothécaires et radiation d\'inscriptions.',
        'Immobilier d\'investissement, VEFA, baux commerciaux et divisions en volumes.',
        'Téléactes et télétransmission dématérialisée immédiate à la publicité foncière.',
      ],
      ctaText: 'Initier un dossier immobilier',
    },
    {
      tag: 'FAMILLE & SUCCESSIONS',
      title: 'Transmission Supragénérationnelle & Droit de la Famille',
      icon: HeartHandshake,
      color: 'from-indigo-600/20 to-blue-500/10',
      accent: 'text-blue-300',
      border: 'border-blue-300/30',
      subtitle: 'Anticiper pour protéger, pacifier et optimiser la dévolution de vos actifs.',
      description:
        "Face aux complexités des familles contemporaines et aux barèmes fiscaux successoraux élevés, la donation-partage et le démembrement de propriété permettent de figer la valeur vénale des actifs et d'éviter les conflits liquidatifs entre héritiers.",
      keyPoints: [
        "Donation-partage avec réserve d'usufruit et clause d'inaliénabilité.",
        'Règlement successoral complet : acte de notoriété, inventaire notarié et déclaration fiscale.',
        "Régimes matrimoniaux sur mesure, séparation de biens avec société d'acquêts, conventions de PACS.",
        'Mandats de protection future et testaments authentiques enregistrés au FCDDV.',
      ],
      ctaText: 'Consulter sur une succession ou donation',
    },
    {
      tag: 'ENTREPRISES & DIRIGEANTS',
      title: 'Droit des Entreprises, Fusions & Pacte Dutreil',
      icon: Briefcase,
      color: 'from-violet-600/20 to-indigo-500/10',
      accent: 'text-violet-300',
      border: 'border-violet-300/30',
      subtitle: "Pérenniser l'outil professionnel et orchestrer la gouvernance actionnariale.",
      description:
        "Le chef d'entreprise doit concilier vision opérationnelle et protection patrimoniale. Nous accompagnons les fondateurs, repreneurs et holdings familiales lors de chaque acte structurant : rédaction des statuts de sociétés holding civiles ou SAS, cession de titres.",
      keyPoints: [
        'Mise en place de pactes Dutreil : exonération de 75 % sur la valeur taxable des titres transmis.',
        'Constitution de SCI patrimoniales (choix stratégique IR / IS) et de SASU/SAS.',
        'Cession de fonds de commerce, séquestre notarial du prix et opposition créanciers.',
        "Pactes d'actionnaires, clauses de préemption et conventions de trésorerie intragroupe.",
      ],
      ctaText: 'Structurer votre entreprise',
    },
    {
      tag: 'PATRIMOINE & FISCALITÉ',
      title: 'Stratégie de Détention & Conseil Patrimonial',
      icon: TrendingUp,
      color: 'from-sky-600/20 to-blue-400/10',
      accent: 'text-sky-300',
      border: 'border-sky-300/30',
      subtitle: 'Une ingénierie juridique au service de la résilience de vos avoirs.',
      description:
        "Le patrimoine requiert un audit pluridisciplinaire permanent : analyse civile des clauses bénéficiaires d'assurance-vie, optimisation de la trésorerie d'entreprise, démembrement temporaire ou viager, et fiscalité des plus-values immobilières ou mobilières.",
      keyPoints: [
        'Bilan patrimonial approfondi intégrant aspects civils, fiscaux et financiers.',
        "Rédaction de clauses bénéficiaires testamentaires ou d'assurance-vie démembrées.",
        "Optimisation de l'Impôt sur la Fortune Immobilière (IFI) et des déductions d'emprunt.",
        'Accompagnement des résidents et non-résidents dans la gestion de patrimoines internationaux.',
      ],
      ctaText: 'Demander un bilan patrimonial',
    },
  ];

  const current = pillars[activeTab];
  const IconComp = current.icon;

  return (
    <div className="space-y-8">
      {/* Tab Navigation — pill selector, no rigid cards */}
      <div className="flex flex-wrap gap-3 justify-center">
        {pillars.map((item, idx) => {
          const isSelected = activeTab === idx;
          const TabIcon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                isSelected
                  ? `bg-white/10 border-white/30 text-white shadow-lg shadow-blue-500/10 backdrop-blur-md`
                  : `bg-transparent border-white/10 text-white/50 hover:text-white/80 hover:border-white/20`
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isSelected ? item.accent : 'text-white/40'}`} />
              <span>{item.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Panel — no rigid frame, immersive liquid glass */}
      <div
        key={activeTab}
        className={`relative rounded-3xl overflow-hidden border ${current.border} animate-fade-in-up`}
        style={{ background: 'rgba(11,25,56,0.7)', backdropFilter: 'blur(20px)' }}
      >
        {/* Gradient wash */}
        <div className={`absolute inset-0 bg-gradient-to-br ${current.color} pointer-events-none`} />

        <div className="relative z-10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 ${current.accent} text-xs font-bold tracking-wider uppercase`}>
              <IconComp className="w-3.5 h-3.5" />
              <span>{current.tag}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              {current.title}
            </h3>

            <p className={`font-serif text-lg font-medium italic ${current.accent}`}>
              {current.subtitle}
            </p>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {current.description}
            </p>

            <div className="pt-3">
              <Link
                href="/rendez-vous"
                className="btn-liquid-primary inline-flex items-center gap-2 text-sm px-7 py-3.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Key points — no box, just list with neon dots */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${current.accent} border-b border-white/10 pb-3`}>
              <FileCheck2 className="w-4 h-4" />
              <span>Compétences Juridiques & Actes Cibles</span>
            </div>

            <ul className="space-y-3.5">
              {current.keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white/75">
                  <CheckCircle2 className={`w-4 h-4 ${current.accent} shrink-0 mt-0.5`} />
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
