'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X, Globe, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-aurelex-ivoire/95 backdrop-blur-md border-b border-aurelex-beige-border shadow-sm">
      {/* Top Banner: Notarial notice & language */}
      <div className="bg-aurelex-ebene text-aurelex-champagne-soft text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-aurelex-bordeaux">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-aurelex-champagne" />
          <span className="tracking-wide uppercase font-medium">Office Notarial — République Française</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/admin"
            className="text-xs text-aurelex-champagne-light hover:text-white transition-colors flex items-center gap-1 font-medium"
          >
            <span>{t('admin')}</span>
            <ChevronRight className="w-3 h-3" />
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={toggleLocale}
            className="flex items-center space-x-1.5 text-xs text-white hover:text-aurelex-champagne font-semibold transition-colors"
            title="Changer de langue / Change language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Aurelex */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md border border-aurelex-champagne/40 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Aurelex Notaires Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-aurelex-bordeaux">
                AURELEX
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-aurelex-ebene/70 font-semibold -mt-1">
                Notaires & Associés
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-aurelex-bordeaux relative py-1 ${
                    isActive
                      ? 'text-aurelex-bordeaux font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-aurelex-champagne'
                      : 'text-aurelex-ebene/80'
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow hover:shadow-lg hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-aurelex-champagne-light" />
              <span>{t('appointment')}</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-aurelex-ebene hover:bg-aurelex-beige transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-aurelex-ivoire border-b border-aurelex-beige-border px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-aurelex-ebene hover:bg-aurelex-beige hover:text-aurelex-bordeaux"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-aurelex-beige-border">
            <Link
              href="/rendez-vous"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-aurelex-bordeaux text-white py-3 rounded-lg font-semibold shadow"
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
