'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Linkedin, Youtube, ShieldCheck } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#050B18] text-white border-t border-white/10">
      {/* ── Zone Principale du Footer ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Colonne 1 : Identité & Slogan officiel */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-[#D4B483]/50 group-hover:border-[#D4B483] transition-colors shrink-0 bg-white/95 p-0.5">
                <Image
                  src="/images/favicon.png"
                  alt="Aurelex Notaire"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-white leading-tight uppercase group-hover:text-[#D4B483] transition-colors">
                  Aurelex
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4B483] font-bold">
                  Notaire
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
              Conseiller aujourd'hui, sécuriser demain.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4B483]" />
              <span>Office Notarial · Paris Ier</span>
            </div>
          </div>

          {/* Colonne 2 : Liens de navigation centraux */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Navigation
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-xs font-medium text-slate-300">
              <li>
                <Link href="/etude" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Le cabinet
                </Link>
              </li>
              <li>
                <Link href="/expertises" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/#simulateur" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Simulateur & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/rendez-vous" className="hover:text-[#D4B483] transition-colors py-0.5 inline-block">
                  Prendre RDV
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Coordonnées & Réseaux sociaux */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Contact & Accès
            </div>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li>
                <a
                  href="tel:0142934567"
                  className="inline-flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4B483] group-hover:border-[#D4B483]/50 transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-200 group-hover:text-white">01 42 93 45 67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aurelex-notaire.fr"
                  className="inline-flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4B483] group-hover:border-[#D4B483]/50 transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white">contact@aurelex-notaire.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D4B483] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-300 leading-relaxed pt-1">12 Place de la République, 75001 Paris</span>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4B483] border border-white/10 hover:border-[#D4B483] text-slate-300 hover:text-slate-950 flex items-center justify-center transition-all text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#D4B483] border border-white/10 hover:border-[#D4B483] text-slate-300 hover:text-slate-950 flex items-center justify-center transition-all text-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre Basse de Copyright & Liens Légaux ── */}
      <div className="border-t border-white/10 bg-[#030712] pt-8 pb-32 lg:pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright */}
          <p className="text-xs text-slate-400 text-center md:text-left font-normal order-2 md:order-1">
            © 2026 AURELEX Notaire. Tous droits réservés.
          </p>

          {/* Liens légaux parfaitement alignés sur une seule ligne */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 order-1 md:order-2">
            <Link href="/mentions-legales" className="hover:text-[#D4B483] transition-colors whitespace-nowrap">
              Mentions légales
            </Link>
            <span className="text-slate-600">·</span>
            <Link href="/confidentialite" className="hover:text-[#D4B483] transition-colors whitespace-nowrap">
              Confidentialité
            </Link>
            <span className="text-slate-600">·</span>
            <Link href="/contact" className="hover:text-[#D4B483] transition-colors whitespace-nowrap">
              Plan du site
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
