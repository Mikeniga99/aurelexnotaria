'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Calendar, Search, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const homeUrl = `/${locale}`;
    if (
      window.location.pathname === homeUrl ||
      window.location.pathname === '/' ||
      window.location.pathname === `${homeUrl}/`
    ) {
      window.location.reload();
    } else {
      window.location.href = homeUrl;
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/etude', label: 'Le cabinet', hasDropdown: true },
    { href: '/expertises', label: 'Nos services', hasDropdown: true },
    { href: '/actualites', label: 'Actualités' },
    { href: '/#simulateur', label: 'Simulateur' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* ── Main Navigation Bar ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B1938]/95 backdrop-blur-md shadow-xl py-3 border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Logo & Identité officielle */}
          <a
            href={`/${locale}`}
            onClick={handleLogoClick}
            className="flex items-center gap-3 group cursor-pointer"
            title="Accueil Aurelex Notaire (Actualiser)"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md border border-[#D4B483]/50 group-hover:border-[#D4B483] transition-all shrink-0 bg-white/95 p-0.5">
              <Image
                src="/images/favicon.png"
                alt="Aurelex Notaire"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest text-white leading-tight uppercase group-hover:text-[#D4B483] transition-colors">
                Aurelex
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4B483] font-bold">
                Notaire
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) && !link.href.includes('#');
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-1 transition-colors relative py-1 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/80 hover:text-[#D4B483]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-white/60 -mr-0.5 mt-0.5" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4B483] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action (Desktop: Prendre rendez-vous pill + Search button) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 bg-[#060D1F]/90 hover:bg-[#060D1F] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider border border-white/20 shadow-md hover:border-[#D4B483] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.96]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4B483]" />
              <span>Prendre rendez-vous</span>
            </Link>

            <Link
              href="/#simulateur"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-[0.94]"
              title="Rechercher / Outil de calcul"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1938] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-fade-in-up">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-white/90 hover:text-[#D4B483] py-2 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Link
              href="/rendez-vous"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4B483] text-slate-950 font-bold py-3 rounded-full text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous en ligne</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
