'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X, Globe, Calendar, ShieldCheck, ChevronRight, Scale, Clock } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-aurelex-beige-border shadow-sm">
      {/* Top Bar: Official Notarial Notice */}
      <div className="bg-gradient-to-r from-aurelex-ebene via-aurelex-bordeaux-dark to-aurelex-ebene text-white py-2 px-4 sm:px-8 border-b border-aurelex-champagne/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] tracking-wide">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-aurelex-champagne uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Office Notarial — Paris Ier</span>
            </span>
            <span className="hidden md:inline text-white/30">·</span>
            <span className="hidden md:inline text-white/70">
              18 Place Vendôme · Actes Authentiques Électroniques
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="/admin"
              className="text-white/80 hover:text-aurelex-champagne transition-colors flex items-center gap-1 font-semibold"
            >
              <span>{t('admin')}</span>
              <ChevronRight className="w-3 h-3 text-aurelex-champagne" />
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={toggleLocale}
              className="flex items-center space-x-1.5 font-bold hover:text-aurelex-champagne transition-colors text-white"
              title="Changer de langue / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-aurelex-champagne" />
              <span className="uppercase">{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-aurelex-champagne/40 group-hover:scale-105 transition-all bg-gradient-to-tr from-aurelex-bordeaux to-aurelex-bordeaux-hover">
              <Image
                src="/images/logo.png"
                alt="Aurelex Notaires Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-aurelex-bordeaux group-hover:text-aurelex-bordeaux-hover transition-colors">
                AURELEX
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-aurelex-ebene/75 font-bold -mt-1">
                Notaires & Associés
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all relative py-2 ${
                    isActive
                      ? 'text-aurelex-bordeaux font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-aurelex-champagne after:to-aurelex-champagne-light'
                      : 'text-aurelex-ebene/75 hover:text-aurelex-bordeaux'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA: Prendre Rendez-vous */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-aurelex-bordeaux via-aurelex-bordeaux-hover to-aurelex-bordeaux-dark text-white text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all border border-aurelex-champagne/40"
            >
              <Calendar className="w-4 h-4 text-aurelex-champagne-light" />
              <span>{t('appointment')}</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-aurelex-ebene hover:bg-aurelex-beige transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-aurelex-beige-border px-6 pt-4 pb-8 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-aurelex-ebene hover:bg-aurelex-beige hover:text-aurelex-bordeaux"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-aurelex-beige-border">
            <Link
              href="/rendez-vous"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg"
            >
              <Calendar className="w-4 h-4 text-aurelex-champagne-light" />
              <span>{t('appointment')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
