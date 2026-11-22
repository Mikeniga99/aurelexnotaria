import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  Building2,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  Globe2,
  Calendar,
  ArrowRight,
  Shield,
  Scale,
  Award,
  ChevronDown,
} from 'lucide-react';
import { NotaryFeeSimulator } from '@/components/public/NotaryFeeSimulator';

export default function HomePage() {
  const domaines = [
    {
      icon: Building2,
      img: '/images/domaine_immobilier.jpg',
      num: '01',
      title: 'Immobilier Résidentiel & Institutionnel',
      sub: "Sécurisation des compromis, vérifications d'hypothèques, VEFA et actes authentiques.",
    },
    {
      icon: HeartHandshake,
      img: '/images/domaine_famille.jpg',
      num: '02',
      title: 'Droit de la Famille & Successions',
      sub: 'Donation-partage, pactes civils, régimes matrimoniaux et règlements successoraux.',
    },
    {
      icon: Briefcase,
      img: '/images/domaine_entreprise.jpg',
      num: '03',
      title: 'Ingénierie Sociétaire & Dirigeants',
      sub: 'Transmission sous pacte Dutreil, cession de fonds de commerce et statuts sur mesure.',
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
    <div className="bg-[#F8FAFC]">

      {/* ═══════════════════════════════════
          1. HERO — THÈME CLAIR & DOUBLE IMAGE
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/80 to-[#F8FAFC]" />
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
          <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/82 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent" />
        </div>

        {/* Lueurs azur subtiles en arrière-plan */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)' }} />

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-24">
          <div className="max-w-3xl space-y-8">

            {/* Badge de légitimité */}
            <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-blue-700 border border-slate-200/90 shadow-xs animate-fade-in-up">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>Office Notarial · Place Vendôme · Paris Ier</span>
            </div>

            {/* Titre Principal */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="font-serif leading-tight">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light italic text-slate-800">
                  L'Excellence de l'Acte,
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold blue-gradient-text">
                  L'Éternité du Droit.
                </span>
              </h1>
            </div>

            {/* Sous-titre */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal animate-fade-in-up"
              style={{ animationDelay: '200ms' }}>
              Officiers publics investis d'une mission de confiance par l'État — vos actes civils, familiaux et patrimoniaux sécurisés à force probante et exécutoire.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link href="/rendez-vous" className="btn-liquid-primary">
                <Calendar className="w-4 h-4 text-white" />
                <span>Solliciter une consultation</span>
              </Link>
              <Link href="/expertises" className="btn-liquid-secondary">
                <span>Nos domaines d'action</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </Link>
            </div>

            {/* Garanties institutionnelles */}
            <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              {['Acte authentique électronique', 'Visioconférence certifiée', 'Membre CSN'].map((item) => (
                <div key={item} className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curseur de défilement */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-pulse-glow">
          <ChevronDown className="w-5 h-5 text-blue-600" />
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. BANDE STATISTIQUES — CLAIR
      ════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-10 px-6 text-center animate-blur-focus ${i < stats.length - 1 ? 'border-r border-slate-200/80' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="font-serif text-3xl sm:text-4xl font-bold blue-gradient-text mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. DOMAINES — BANDES IMMERSIVES LUMINEUSES
      ════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">

          {/* En-tête */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
              <span className="w-8 h-px bg-blue-600/40" />
              <span>Champs d'intervention juridique</span>
              <span className="w-8 h-px bg-blue-600/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Nos Domaines{' '}
              <span className="font-light italic blue-gradient-text">d'Expertise</span>
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Cinq piliers de compétences notariales au service de vos projets de vie et de patrimoine.
            </p>
          </div>

          {/* Bandes domaines */}
          <div className="space-y-6">
            {domaines.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative group overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[250px] flex items-center border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 bg-white ${
                    isEven ? 'animate-slide-left' : 'animate-slide-right'
                  }`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Image fond avec overlay lumineux doux */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-white/40 group-hover:from-white/92 transition-all duration-500" />
                  </div>

                  {/* Contenu */}
                  <div className={`relative z-10 flex items-center gap-6 p-8 sm:p-10 w-full max-w-3xl ${isEven ? '' : 'ml-auto'}`}>
                    {/* Numéro + Icône */}
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <span className="font-serif text-5xl font-light text-blue-600/25 leading-none select-none group-hover:text-blue-600/45 transition-colors duration-500">
                        {item.num}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:border-blue-400 group-hover:text-blue-700 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    {/* Texte */}
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <div className="neon-line w-16 group-hover:w-32 transition-all duration-500" />
                      <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                        {item.sub}
                      </p>
                    </div>

                    {/* Bouton flèche hover */}
                    <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <Link
                        href="/expertises"
                        className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider bg-white/90 px-4 py-2 rounded-full border border-slate-200 shadow-xs"
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
      <section className="py-24 lg:py-32 bg-white border-t border-slate-200 animate-blur-focus">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
              <span className="w-8 h-px bg-blue-600/40" />
              <span>Outil de simulation réglementé</span>
              <span className="w-8 h-px bg-blue-600/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">
              Estimez vos{' '}
              <span className="font-light italic blue-gradient-text">frais notariaux</span>
            </h2>
          </div>
          <NotaryFeeSimulator />
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. MANIFESTE INSTITUTIONNEL
      ════════════════════════════════════ */}
      <section className="relative py-28 lg:py-40 bg-slate-50 border-t border-slate-200 overflow-hidden animate-fade-in-up">
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Tradition législative · Loi du 25 ventôse an XI</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>

          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
            « Les notaires sont les officiers publics établis pour recevoir tous les actes et contrats… »
          </blockquote>

          <div className="neon-line max-w-xs mx-auto" />

          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ce texte fondateur n'est pas un vestige pour l'office <strong className="text-slate-900">Aurelex Notaires</strong> — c'est notre boussole quotidienne : certitude de la date, indiscutabilité du contenu, sauvegarde des droits.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-slate-600">
            {['Délégation par arrêté du Garde des Sceaux', 'Contrôle Chambre des Notaires de Paris', 'Membre Conseil Supérieur du Notariat'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. CTA FINALE
      ════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/40 border-t border-slate-200 animate-fade-in-up">
        <div className="max-w-3xl mx-auto px-5 text-center space-y-8">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Initiez votre
            <span className="block font-light italic blue-gradient-text">dossier notarial</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Consultation au cabinet Place Vendôme ou par visioconférence notariale certifiée. Réponse sous 24h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous" className="btn-liquid-primary">
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre rendez-vous</span>
            </Link>
            <Link href="/contact" className="btn-liquid-secondary">
              <span>Nous écrire</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
