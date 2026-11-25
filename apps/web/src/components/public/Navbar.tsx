'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Calendar, Search, ChevronDown, Menu, X, ArrowRight, User, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';

interface SessionUser {
  firstName: string;
  lastName: string;
  role: string;
}

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Vérification session au montage
  useEffect(() => {
    fetch('/api/v1/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.data) {
          setSessionUser({
            firstName: data.data.firstName || '',
            lastName: data.data.lastName || '',
            role: data.data.role || 'VISITOR',
          });
        }
      })
      .catch(() => {})
      .finally(() => setSessionChecked(true));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' });
    setSessionUser(null);
    window.location.reload();
  };

  const isAdmin = sessionUser && ['ADMIN', 'SUPER_ADMIN', 'COLLABORATOR', 'EDITOR'].includes(sessionUser.role);

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

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const anchor = href.replace('/', '');
      const currentPath = window.location.pathname;
      const homePath = `/${locale}`;
      if (currentPath === homePath || currentPath === '/' || currentPath === `${homePath}/`) {
        const el = document.querySelector(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.location.href = `/${locale}${href.replace('/', '')}`;
      return;
    }

    const targetUrl = href === '/' ? `/${locale}` : `/${locale}${href}`;
    if (window.location.pathname === targetUrl) {
      window.location.reload();
    } else {
      window.location.href = targetUrl;
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
                <a
                  key={link.label}
                  href={link.href === '/' ? `/${locale}` : `/${locale}${link.href}`}
                  onClick={handleNavClick(link.href)}
                  className={`flex items-center gap-1 transition-colors relative py-1 cursor-pointer ${
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
                </a>
              );
            })}
          </nav>

          {/* Right Action (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`/${locale}/rendez-vous`}
              onClick={handleNavClick('/rendez-vous')}
              className="inline-flex items-center gap-2 bg-[#060D1F]/90 hover:bg-[#060D1F] text-white px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider border border-white/20 shadow-md hover:border-[#D4B483] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.96] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4B483]" />
              <span>Rendez-vous</span>
            </a>

            <a
              href={`/${locale}/#simulateur`}
              onClick={handleNavClick('/#simulateur')}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 hover:scale-105 active:scale-[0.94] cursor-pointer"
              title="Simulateur de frais"
            >
              <Search className="w-3.5 h-3.5" />
            </a>

            {/* Boutons selon l'état de session */}
            {sessionChecked && sessionUser ? (
              // ── Utilisateur connecté ──
              <>
                {isAdmin && (
                  <a
                    href="/admin"
                    className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-200 hover:border-[#D4B483]/60"
                    title="Tableau de bord"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#D4B483]" />
                    <span>Admin</span>
                  </a>
                )}
                <a
                  href="/espace-client"
                  className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-[#D4B483]/40 px-3 py-2 rounded-full transition-all duration-200"
                  title="Mon espace"
                >
                  <User className="w-3.5 h-3.5 text-[#D4B483]" />
                  <span className="max-w-[80px] truncate">{sessionUser.firstName || 'Mon espace'}</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/40 px-3 py-2 rounded-full transition-all duration-200 cursor-pointer"
                  title="Se déconnecter"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : sessionChecked && !sessionUser ? (
              // ── Non connecté ──
              <>
                <a
                  href="/admin/login?mode=login"
                  className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-200 hover:border-[#D4B483]/60"
                  title="Se connecter"
                >
                  <User className="w-3.5 h-3.5 text-[#D4B483]" />
                  <span>Connexion</span>
                </a>
                <a
                  href="/admin/login?mode=register"
                  className="inline-flex items-center gap-1.5 text-xs text-white bg-aurelex-bordeaux/90 hover:bg-aurelex-bordeaux border border-[#D4B483]/40 hover:border-[#D4B483] px-3 py-2 rounded-full transition-all duration-200 shadow-sm"
                  title="Créer un compte"
                >
                  <UserPlus className="w-3.5 h-3.5 text-aurelex-champagne-light" />
                  <span>Inscription</span>
                </a>
              </>
            ) : (
              // ── Chargement (skeleton discret) ──
              <div className="w-28 h-8 rounded-full bg-white/10 animate-pulse" />
            )}
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
              <a
                key={link.label}
                href={link.href === '/' ? `/${locale}` : `/${locale}${link.href}`}
                onClick={handleNavClick(link.href)}
                className="text-sm font-semibold text-white/90 hover:text-[#D4B483] py-2 flex items-center justify-between border-b border-white/5 cursor-pointer"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </a>
            ))}
          </nav>
          <div className="pt-2 space-y-2.5">
            <a
              href={`/${locale}/rendez-vous`}
              onClick={handleNavClick('/rendez-vous')}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4B483] text-slate-950 font-bold py-3 rounded-full text-xs uppercase tracking-wider cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous en ligne</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {sessionChecked && sessionUser ? (
                <>
                  <a
                    href="/espace-client"
                    onClick={() => setMobileMenuOpen(false)}
                    className="col-span-1 w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-full text-xs border border-white/20 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#D4B483]" />
                    <span className="truncate">{sessionUser.firstName || 'Mon espace'}</span>
                  </a>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="col-span-1 w-full inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white font-medium py-2.5 rounded-full text-xs border border-red-400/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-300" />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/admin/login?mode=login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-full text-xs border border-white/20 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#D4B483]" />
                    <span>Connexion</span>
                  </a>
                  <a
                    href="/admin/login?mode=register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-aurelex-bordeaux/90 hover:bg-aurelex-bordeaux text-white font-medium py-2.5 rounded-full text-xs border border-[#D4B483]/40 transition-colors shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-aurelex-champagne-light" />
                    <span>Inscription</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
