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
    <header className="fixed top-0 inset-x-0 z-40 transition-all duration-500">
      {/* ── Desktop Top Announcement Strip ── */}
      <div className="hidden lg:block bg-aurelex-navy-deep/80 backdrop-blur-md border-b border-white/10 text-white/70 py-1.5 px-8 text-[11px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider uppercase text-[10px]">
              <Scale className="w-3.5 h-3.5" />
              <span>Office Notarial · Paris Ier · 18 Place Vendôme</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-white/60">Actes Authentiques Électroniques & Visioconférence</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+33142862400"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>01 42 86 24 00</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="/admin"
              className="text-white/50 hover:text-cyan-400 transition-colors uppercase tracking-wider text-[10px]"
            >
              Administration
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 text-white hover:text-cyan-400 transition-colors uppercase font-bold text-[10px]"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Liquid Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div
          className={`rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
            scrolled
              ? 'liquid-glass-dark shadow-2xl'
              : 'bg-aurelex-navy-deep/70 backdrop-blur-xl border border-white/10'
          }`}
        >
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg border border-cyan-400/30 group-hover:border-cyan-400 transition-colors bg-white/5 flex items-center justify-center">
              <Image
                src="/images/Logo_AURELEX.png"
                alt="Aurelex Notaires Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block group-hover:text-cyan-300 transition-colors">
                AURELEX
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-cyan-300/80 font-bold block -mt-1">
                Notaires & Associés
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all relative ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm border border-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action (Desktop: CTA, Mobile: Phone + Lang) */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/rendez-vous"
              className="hidden sm:inline-flex btn-liquid-primary"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t('appointment')}</span>
            </Link>

            {/* Mobile Lang Button */}
            <button
              onClick={toggleLocale}
              className="md:hidden flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold border border-white/15"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
