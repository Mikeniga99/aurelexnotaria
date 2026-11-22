'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Globe, Calendar, Scale, Phone } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/etude', label: t('about') },
    { href: '/expertises', label: t('expertises') },
    { href: '/equipe', label: t('team') },
    { href: '/actualites', label: t('news') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300">
      {/* ── Bande officielle supérieure ── */}
      <div className="hidden lg:block bg-[#0B1938] text-white py-2 px-8 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold tracking-wider uppercase text-[11px]">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Office Notarial · 18 Place Vendôme · Paris Ier</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200 font-medium">Actes Authentiques Électroniques & Visioconférence</span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a
              href="tel:+33142862400"
              className="flex items-center gap-1.5 text-white hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">01 42 86 24 00</span>
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="/admin"
              className="text-slate-300 hover:text-white transition-colors uppercase tracking-wider text-[11px] font-semibold"
            >
              Administration
            </a>
            <span className="text-slate-500">|</span>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 text-white hover:text-cyan-300 transition-colors uppercase font-bold text-[11px] bg-slate-800/80 px-2.5 py-0.5 rounded"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Barre de Navigation Principale ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <div
          className={`rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between bg-white border-2 border-slate-200 shadow-md ${
            scrolled ? 'shadow-lg border-slate-300 py-2.5' : ''
          }`}
        >
          {/* Logo & Identité */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-white flex items-center justify-center group-hover:border-blue-600 transition-colors p-1">
              <Image
                src="/images/Logo_AURELEX.png"
                alt="Aurelex Notaires Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#0B1938] block group-hover:text-blue-700 transition-colors">
                AURELEX
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#6B0F1A] font-extrabold block -mt-1">
                Notaires & Associés
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all relative ${
                    isActive
                      ? 'text-blue-800 bg-blue-50 border border-blue-300'
                      : 'text-slate-800 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Droite */}
          <div className="flex items-center gap-3">
            <Link
              href="/rendez-vous"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>{t('appointment')}</span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleLocale}
                className="px-2.5 py-1.5 rounded-lg border-2 border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 uppercase"
              >
                {locale === 'fr' ? 'EN' : 'FR'}
              </button>
              <a
                href="tel:+33142862400"
                className="p-2 rounded-xl bg-blue-700 text-white shadow-xs"
                aria-label="Appeler l'office"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
