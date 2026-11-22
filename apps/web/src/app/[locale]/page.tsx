import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Calendar, ChevronDown, Shield, Scale, ArrowRight,
  Building, HeartHandshake, Briefcase, TrendingUp, Globe2,
} from 'lucide-react';
import { NotaryFeeSimulator } from '@/components/public/NotaryFeeSimulator';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');

  const domaines = [
    {
      icon: Building,
      img: '/images/domaine_immobilier.jpg',
      num: '01',
      title: 'Droit Immobilier & Actes Authentiques',
      sub: 'Sécurisation de vos acquisitions, cessions et investissements fonciers.',
    },
    {
      icon: HeartHandshake,
      img: '/images/domaine_famille.jpg',
      num: '02',
      title: 'Famille & Transmission',
      sub: 'Donations, successions, contrats de mariage et mandats de protection.',
    },
    {
      icon: Briefcase,
      img: '/images/domaine_entreprise.jpg',
      num: '03',
      title: 'Droit des Affaires & Sociétés',
      sub: 'Pacte Dutreil, cessions de fonds de commerce, création de sociétés.',
    },
    {
      icon: TrendingUp,
      img: '/images/domaine_patrimoine.jpg',
      num: '04',
      title: 'Fiscalité & Stratégie Patrimoniale',
      sub: 'Audit patrimonial, démembrement, assurance-vie et structuration.',
    },
    {
      icon: Globe2,
      img: '/images/domaine_international.jpg',
      num: '05',
      title: 'Droit Notarial International',
      sub: 'Succession transfrontalière, acquisitions non-résidents, apostille.',
    },
  ];

  const stats = [
    { value: '25+', label: "Années d'expérience" },
    { value: '1 800+', label: 'Actes reçus / an' },
    { value: '99,4 %', label: 'Clients satisfaits' },
    { value: '6', label: 'Associés & juristes' },
  ];

  return (
    <div className="bg-aurelex-navy-deep">

      {/* ═══════════════════════════════════
          1. HERO — IMAGE DOUBLE SELON ÉCRAN
      ════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Fond Mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/arriere_mobile.jpg"
            alt="Hero Aurelex Notaires Mobile"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-aurelex-navy-deep/80 via-aurelex-navy-deep/60 to-aurelex-navy-deep/90" />
        </div>

        {/* Fond Grand Écran */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/arriere_grand_ecran.jpg"
            alt="Hero Aurelex Notaires"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-aurelex-navy-deep/85 via-aurelex-navy-deep/60 to-aurelex-navy-deep/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-aurelex-navy-deep via-transparent to-transparent" />
        </div>

        {/* Lueurs bleues ambiantes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)' }} />

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-24">
          <div className="max-w-3xl space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 liquid-glass-pill rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300 animate-fade-in-up">
              <Scale className="w-3.5 h-3.5" />
              <span>Office Notarial · Place Vendôme · Paris Ier</span>
            </div>

            {/* Headline */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="font-serif leading-tight">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light italic text-white/80">
                  L'Excellence de l'Acte,
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold blue-gradient-text">
                  L'Éternité du Droit.
                </span>
              </h1>
            </div>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed font-light animate-fade-in-up"
              style={{ animationDelay: '200ms' }}>
              Officiers publics investis d'une mission de confiance par l'État — vos actes civils, familiaux et patrimoniaux sécurisés à force probante et exécutoire.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link href="/rendez-vous" className="btn-liquid-primary shadow-liquid-blue">
                <Calendar className="w-4 h-4 text-cyan-300" />
                <span>Solliciter une consultation</span>
              </Link>
              <Link href="/expertises" className="btn-liquid-secondary">
                <span>Nos domaines d'action</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              {['Acte authentique électronique', 'Visioconférence certifiée', 'Membre CSN'].map((item) => (
                <div key={item} className="inline-flex items-center gap-1.5 text-[11px] text-white/50 font-medium">
                  <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-pulse-glow">
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. BANDE STATISTIQUES
      ════════════════════════════════════ */}
      <section className="border-y border-white/10 bg-aurelex-navy/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-10 px-6 text-center animate-blur-focus ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="font-serif text-3xl sm:text-4xl font-bold blue-gradient-text mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. DOMAINES — BANDES IMMERSIVES
      ════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">

          {/* En-tête */}
          <div className="text-center space-y-5 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              <span className="w-8 h-px bg-cyan-400/60" />
              <span>Champs d'intervention juridique</span>
              <span className="w-8 h-px bg-cyan-400/60" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Nos Domaines{' '}
              <span className="font-light italic blue-gradient-text">d'Expertise</span>
            </h2>
            <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              Cinq piliers de compétences notariales au service de vos projets de vie et de patrimoine.
            </p>
          </div>

          {/* Bandes domaines */}
          <div className="space-y-5">
            {domaines.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative group overflow-hidden rounded-2xl min-h-[200px] sm:min-h-[240px] flex items-center ${
                    isEven ? 'animate-slide-left' : 'animate-slide-right'
                  }`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Image fond */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-aurelex-navy-deep/90 via-aurelex-navy-deep/70 to-aurelex-navy-deep/30 group-hover:from-aurelex-navy-deep/85 transition-all duration-500" />
                  </div>

                  {/* Contenu */}
                  <div className={`relative z-10 flex items-center gap-6 p-8 sm:p-10 w-full max-w-3xl ${isEven ? '' : 'ml-auto'}`}>
                    {/* Numéro + Icône */}
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <span className="font-serif text-5xl font-light text-cyan-400/30 leading-none select-none group-hover:text-cyan-400/50 transition-colors duration-500">
                        {item.num}
                      </span>
                      <div className="w-11 h-11 rounded-xl liquid-glass-dark flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>

                    {/* Texte */}
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                        {item.title}
                      </h3>
                      <div className="neon-line w-16 group-hover:w-32 transition-all duration-500" />
                      <p className="text-sm text-white/60 leading-relaxed max-w-md">
                        {item.sub}
                      </p>
                    </div>

                    {/* Flèche hover */}
                    <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <Link
                        href="/expertises"
                        className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider"
                      >
                        <span>Découvrir</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. SIMULATEUR FRAIS NOTARIAUX
      ════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-white/10 animate-blur-focus">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              <span className="w-8 h-px bg-cyan-400/60" />
              <span>Outil de simulation réglementé</span>
              <span className="w-8 h-px bg-cyan-400/60" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Estimez vos{' '}
              <span className="font-light italic blue-gradient-text">frais notariaux</span>
            </h2>
          </div>
          <NotaryFeeSimulator />
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. MANIFESTE — FOND SOMBRE IMMERSIF
      ════════════════════════════════════ */}
      <section className="relative py-28 lg:py-40 overflow-hidden border-t border-white/10 animate-fade-in-up">
        {/* Lueur centrale */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full blur-[120px] opacity-10"
            style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400">
            <span className="w-8 h-px bg-cyan-400/60" />
            <span>Tradition législative · Loi du 25 ventôse an XI</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>

          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white/90 leading-tight">
            « Les notaires sont les officiers publics établis pour recevoir tous les actes et contrats… »
          </blockquote>

          <div className="neon-line max-w-xs mx-auto" />

          <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            Ce texte fondateur n'est pas un vestige pour l'office <strong className="text-white/80">Aurelex Notaires</strong> — c'est notre boussole quotidienne : certitude de la date, indiscutabilité du contenu, sauvegarde des droits.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-white/40">
            {['Délégation par arrêté du Garde des Sceaux', 'Contrôle Chambre des Notaires de Paris', 'Membre Conseil Supérieur du Notariat'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. CTA FINALE
      ════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-white/10 animate-fade-in-up">
        <div className="max-w-3xl mx-auto px-5 text-center space-y-8">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Initiez votre
            <span className="block font-light italic blue-gradient-text">dossier notarial</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-lg mx-auto">
            Consultation au cabinet Place Vendôme ou par visioconférence notariale certifiée. Réponse sous 24h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous" className="btn-liquid-primary shadow-liquid-blue">
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>Prendre rendez-vous</span>
            </Link>
            <Link href="/contact" className="btn-liquid-secondary">
              <span>Nous écrire</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
