import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  Users,
  Home,
  Shield,
  Briefcase,
  UserCheck,
  Scale,
  Handshake,
  Lock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Play,
  Star,
} from 'lucide-react';
import { NotaryFeeSimulator } from '@/components/public/NotaryFeeSimulator';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export default function HomePage() {
  const serviceCards = [
    {
      title: 'Droit de la famille',
      sub: 'Mariage, divorce, succession',
      img: '/images/domaine_famille.jpg',
      icon: Users,
      href: '/expertises',
    },
    {
      title: 'Droit immobilier',
      sub: 'Achat, vente, bail',
      img: '/images/domaine_immobilier.jpg',
      icon: Home,
      href: '/expertises',
    },
    {
      title: 'Droit patrimonial',
      sub: 'Contrat, transmission',
      img: '/images/domaine_patrimoine.jpg',
      icon: Shield,
      href: '/expertises',
    },
    {
      title: 'Droit des affaires',
      sub: 'Création, cession, accompagnement',
      img: '/images/domaine_entreprise.jpg',
      icon: Briefcase,
      href: '/expertises',
    },
    {
      title: 'Conseil personnalisé',
      sub: 'Un interlocuteur unique',
      img: '/images/domaine_international.jpg',
      icon: UserCheck,
      href: '/rendez-vous',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO IMMERSIF (IDENTIQUE À LA MAQUETTE)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center overflow-hidden pt-28 pb-32 lg:pb-36">

        {/* Image architecturale moderne crépusculaire */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arriere_grand_ecran.jpg"
            alt="Cabinet Aurelex Notaire"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient d'ombre doux pour garantir 100% de lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/30" />
        </div>

        {/* Courbe dorée fluide en bas à gauche (Ruban décoratif) */}
        <div className="absolute bottom-6 left-0 w-80 sm:w-96 h-40 pointer-events-none opacity-40 z-10">
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <path
              d="M-50 180 C 100 170, 180 120, 260 50 C 310 10, 360 40, 420 80"
              stroke="#D4B483"
              strokeWidth="2"
            />
            <path
              d="M-60 195 C 90 185, 170 135, 250 65 C 300 25, 350 55, 410 95"
              stroke="#D4B483"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Contenu textuel Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl space-y-6">

            {/* Surtitre doré avec expansion typographique */}
            <ScrollReveal variant="eyebrow" delay={80}>
              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D4B483] uppercase">
                <span className="w-8 h-px bg-[#D4B483]" />
                <span>CONSEIL · ACCOMPAGNEMENT · SÉCURITÉ</span>
                <span className="w-8 h-px bg-[#D4B483]" />
              </div>
            </ScrollReveal>

            {/* Titre principal : Révélation éditoriale masquée (Apple Display Rise) */}
            <ScrollReveal variant="title" delay={160}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-none">
                Aurelex Notaire
              </h1>
            </ScrollReveal>

            {/* Sous-titre cursif : Défloutage d'encre optique */}
            <ScrollReveal variant="focus" delay={240}>
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic text-white/95 leading-tight pt-1">
                À vos côtés, à chaque étape de votre vie
              </p>
            </ScrollReveal>

            {/* Paragraphe descriptif */}
            <ScrollReveal variant="focus" delay={320}>
              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed font-normal">
                Un accompagnement juridique sur mesure, avec rigueur et bienveillance.
              </p>
            </ScrollReveal>

            {/* Boutons d'action Apple-grade */}
            <ScrollReveal variant="card" delay={380}>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                {/* Bouton Or Plein */}
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center gap-2 bg-[#D4B483] hover:bg-[#c5a065] text-slate-950 font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-black/30 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.96]"
                >
                  <span>Prendre rendez-vous</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Bouton Verre Dépoli Translucide avec Play */}
                <Link
                  href="/etude"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider border border-white/30 backdrop-blur-md transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.96]"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                  </div>
                  <span>Découvrir le cabinet</span>
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. LES 5 CARTES FLOTTANTES (OVERLAPPING HERO)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-16 sm:-mt-20 lg:-mt-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {serviceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal
                key={idx}
                variant="card"
                delay={idx * 60}
                className="h-full"
              >
                <div
                  className="bg-white rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 active:scale-[0.98] overflow-hidden flex flex-col border border-slate-100 group h-full"
                >
                  {/* Photo en haut */}
                  <div className="h-32 sm:h-36 relative overflow-hidden bg-slate-100">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Pastille icône flottante au centre */}
                  <div className="-mt-5 mx-auto w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center relative z-10 text-slate-700 group-hover:text-[#D4B483] group-hover:border-[#D4B483] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Contenu textuel */}
                  <div className="p-4 pt-2 text-center flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {card.sub}
                      </p>
                    </div>

                    <Link
                      href={card.href}
                      className="text-[11px] font-bold text-slate-700 hover:text-[#C5A065] inline-flex items-center justify-center gap-1 mt-3 transition-colors pt-1"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION « NOTRE ÉTUDE » (HAUSSMANNIEN + 3 PILIERS)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Filigrane discret du grand "A" à droite */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-slate-900 font-serif text-[420px] font-light leading-none">
          A
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Colonne Gauche : Immeuble Haussmannien de prestige */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="glide-left">
                <div className="relative aspect-[4/5] max-h-[500px] overflow-hidden rounded-[2.5rem] shadow-xl border-2 border-slate-100 bg-white">
                  <Image
                    src="/images/etude_paris.jpg"
                    alt="Immeuble de prestige Aurelex Notaires"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Colonne Centre : Descriptif et engagement */}
            <div className="lg:col-span-4 space-y-6">
              {/* Surtitre or avec expansion */}
              <ScrollReveal variant="eyebrow" delay={80}>
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C5A065] uppercase">
                  <span>NOTRE ÉTUDE</span>
                  <span className="w-8 h-px bg-[#C5A065]" />
                </div>
              </ScrollReveal>

              {/* Titre : Révélation éditoriale majestueuse */}
              <ScrollReveal variant="title" delay={150}>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 leading-tight">
                  Une étude notariale moderne et engagée
                </h2>
              </ScrollReveal>

              {/* Texte : Défloutage d'encre */}
              <ScrollReveal variant="focus" delay={230}>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Installés au cœur de votre région, nous mettons notre expertise juridique au service de vos projets, avec une approche humaine et une exigence de qualité.
                </p>
              </ScrollReveal>

              {/* Bouton sombre pilule */}
              <ScrollReveal variant="glide-right" delay={300}>
                <div>
                  <Link
                    href="/etude"
                    className="inline-flex items-center gap-2 bg-[#060D1F] hover:bg-[#0B1938] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 active:scale-[0.96]"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Colonne Droite : 3 Piliers de réassurance avec carrés champagne */}
            <div className="lg:col-span-3 space-y-5">
              {[
                { icon: Scale, label: 'Une expertise reconnue' },
                { icon: Handshake, label: 'Un accompagnement personnalisé' },
                { icon: Lock, label: 'Une confidentialité garantie' },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <ScrollReveal key={idx} variant="counter" delay={idx * 90}>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:border-[#D4B483]/50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[#F9F5EE] text-[#C5A065] flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {item.label}
                      </span>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. SECTION « ILS NOUS FONT CONFIANCE » (AVIS & DÉCOUPE STYLO)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8">

          {/* Surtitre & Titre */}
          <div className="space-y-2">
            <ScrollReveal variant="eyebrow">
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C5A065] uppercase">
                <span className="w-6 h-px bg-[#C5A065]" />
                <span>ILS NOUS FONT CONFIANCE</span>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="title" delay={120}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
                Leur satisfaction, notre plus belle réussite
              </h2>
            </ScrollReveal>
          </div>

          {/* Disposition Split : Carte Témoignage gauche + Découpe Stylo droite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Carte Avis Blanc Luxe */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal variant="quote" delay={140}>
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-lg relative space-y-5">
                  {/* Guillemet doré */}
                  <div className="text-4xl font-serif text-[#D4B483] leading-none select-none">
                    “
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    "Un cabinet à l'écoute, très professionnel et d'une grande réactivité.{' '}
                    <strong className="text-slate-950 font-bold">
                      Nous recommandons vivement AURELEX Notaire.
                    </strong>"
                  </p>

                  {/* Auteur et étoiles or */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-bold text-slate-900">— Sophie M.</span>
                    <div className="flex items-center gap-1 text-[#D4B483]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4B483]" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Boutons flèches de navigation carrousel */}
              <ScrollReveal variant="card" delay={220}>
                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-400 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
                    aria-label="Témoignage précédent"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-400 text-slate-700 flex items-center justify-center shadow-xs transition-colors"
                    aria-label="Témoignage suivant"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Photo Découpée en Biseau : Stylo de prestige sur cuir */}
            <div className="lg:col-span-6">
              <ScrollReveal variant="glide-right" delay={180}>
                <div className="relative h-[260px] sm:h-[320px] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                  <Image
                    src="/images/domaine_patrimoine.jpg"
                    alt="Signature d'acte notarié"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/40 via-transparent to-black/20" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SIMULATEUR DE FRAIS (REQUIS POUR LE TEST TECHNIQUE)
      ═══════════════════════════════════════════════════════ */}
      <section id="simulateur" className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <ScrollReveal variant="eyebrow" delay={80}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>Barème Légal Officiel</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="title" delay={150}>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
                Simulateur Réglementé des Frais Notariaux
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="focus" delay={230}>
              <p className="text-sm text-slate-600">
                Estimez immédiatement les débours, droits de mutation et émoluments réglementés de votre acquisition.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="card" delay={260}>
            <NotaryFeeSimulator />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. BANNIÈRE CTA BLEU NUIT (IDENTIQUE À LA MAQUETTE)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-14 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-[#0B1938] rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl text-white">

          {/* Courbe dorée lumineuse en arrière-plan */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 1000 200" fill="none" className="w-full h-full">
              <path
                d="M0 150 C 300 180, 600 50, 1000 80"
                stroke="#D4B483"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Gauche : Icône calendrier + Textes */}
            <ScrollReveal variant="glide-left" delay={120}>
              <div className="flex items-center gap-6 text-center lg:text-left flex-col sm:flex-row">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-7 h-7 text-[#D4B483]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Prenez rendez-vous en quelques clics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Un créneau vous sera proposé rapidement
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Droite : Bouton Pilule Doré */}
            <ScrollReveal variant="card" delay={200}>
              <div className="shrink-0">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center gap-2 bg-[#D4B483] hover:bg-[#c5a065] text-slate-950 font-bold px-8 py-4 rounded-full text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
                >
                  <span>Réserver un rendez-vous</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

    </div>
  );
}
