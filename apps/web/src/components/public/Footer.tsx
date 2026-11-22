'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, ArrowUp, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060D1F] text-white border-t border-slate-800">
      {/* ── Zone Principale du Footer ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">

          {/* Colonne 1 : Identité & Slogan (Identique à la maquette) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <span className="font-serif text-3xl font-light text-white tracking-widest">
                  A
                </span>
                <span className="absolute -bottom-0.5 inset-x-0 h-[1.5px] bg-[#D4B483] rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest text-white leading-tight uppercase">
                  Aurelex
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4B483] font-bold">
                  Notaire
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-xs">
              Conseiller aujourd'hui, sécuriser demain.
            </p>
          </div>

          {/* Colonne 2 : Liens de navigation centraux */}
          <div className="lg:col-span-4">
            <ul className="flex flex-wrap lg:flex-col gap-4 text-xs font-semibold tracking-wide text-slate-300">
              <li>
                <Link href="/etude" className="hover:text-[#D4B483] transition-colors">
                  Le cabinet
                </Link>
              </li>
              <li>
                <Link href="/expertises" className="hover:text-[#D4B483] transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-[#D4B483] transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/#simulateur" className="hover:text-[#D4B483] transition-colors">
                  Simulateur & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4B483] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Coordonnées & Réseaux sociaux */}
          <div className="lg:col-span-4 space-y-4">
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4B483] shrink-0" />
                <a href="tel:0142934567" className="hover:text-white transition-colors font-medium">
                  01 42 93 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4B483] shrink-0" />
                <a href="mailto:contact@aurelex-notaire.fr" className="hover:text-white transition-colors">
                  contact@aurelex-notaire.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4B483] shrink-0 mt-0.5" />
                <span>12 Place de la République, 75001 Paris</span>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D4B483] text-white hover:text-slate-950 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D4B483] text-white hover:text-slate-950 flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barre Basse de Copyright ── */}
      <div className="border-t border-slate-800/80 bg-[#040814] py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2025 AURELEX Notaire. Tous droits réservés.</p>

          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D4B483] text-white hover:text-slate-950 flex items-center justify-center transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
