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
    <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 pointer-events-auto">
      <div className="liquid-glass-dark rounded-3xl px-3 py-2 flex items-center justify-around shadow-2xl border border-white/15">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/40 group-active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-aurelex-navy-deep flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400 font-bold scale-105'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
