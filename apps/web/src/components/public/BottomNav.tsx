'use client';

import React from 'react';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Home, Briefcase, Users, Calendar, Phone } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/expertises', label: 'Domaines', icon: Briefcase },
    { href: '/rendez-vous', label: 'RDV', icon: Calendar, highlight: true },
    { href: '/equipe', label: 'Office', icon: Users },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-50 pointer-events-auto">
      {/* Liquid Glass Pill Container */}
      <div className="relative overflow-visible rounded-[26px] bg-[#0B1938]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 border-t-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] px-2 py-2 flex items-center justify-around">
        
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/15 via-transparent to-black/25 pointer-events-none" />

        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group -mt-2 z-10"
                aria-label={item.label}
              >
                {/* Raised Circular Button with Gold/Champagne Glow */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4B483] via-[#F3E5D0] to-[#C49E6C] p-0.5 shadow-[0_8px_24px_rgba(212,180,131,0.45)] transition-transform duration-200 group-active:scale-95 group-hover:scale-105 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E2C9A0] to-[#BFA173] flex items-center justify-center shadow-inner">
                    <Icon className="w-6 h-6 text-[#0B1938] stroke-[2.4]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#D4B483] uppercase tracking-wider mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative z-10 flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? 'text-[#D4B483] bg-white/10'
                  : 'text-white/85 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="relative flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
                    isActive
                      ? 'text-[#D4B483] stroke-[2.4]'
                      : 'text-white/90 group-hover:text-white stroke-[2]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] tracking-wide mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${
                  isActive
                    ? 'font-bold text-[#D4B483]'
                    : 'font-medium text-white/90 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] shadow-[0_0_6px_#D4B483] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
