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
    <nav className="md:hidden fixed bottom-0 inset-x-0 w-full z-50 bg-[#0B1938] border-t border-[#D4B483]/30 shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group -mt-2"
                aria-label={item.label}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4B483] via-[#F3E5D0] to-[#C49E6C] p-0.5 shadow-lg shadow-[#D4B483]/30 transition-transform group-active:scale-95 group-hover:scale-105 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#E2C9A0] to-[#BFA173] flex items-center justify-center shadow-inner">
                    <Icon className="w-6 h-6 text-[#0B1938] stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#D4B483] uppercase tracking-wider mt-1 drop-shadow-sm">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors duration-150 group ${
                isActive ? 'text-[#D4B483]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <div className="relative flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#D4B483] stroke-[2.4]' : 'text-slate-300 group-hover:text-white stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] tracking-wide mt-1 ${
                  isActive ? 'font-bold text-[#D4B483]' : 'font-medium text-slate-300 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#D4B483] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
