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
    <nav className="md:hidden fixed bottom-2 inset-x-2 z-50 pointer-events-auto">
      <div className="bg-white/98 backdrop-blur-xl rounded-2xl px-2 py-2 flex items-center justify-around shadow-[0_4px_25px_rgba(0,0,0,0.15)] border-2 border-slate-200">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-4 flex flex-col items-center group"
              >
                <div className="w-13 h-13 rounded-full bg-blue-600 p-0.5 shadow-lg shadow-blue-600/40 group-active:scale-95 transition-transform flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-blue-700 font-extrabold scale-105'
                  : 'text-slate-700 hover:text-slate-950 font-semibold'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700 stroke-[2.5]' : 'text-slate-700'}`} />
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-700" />
                )}
              </div>
              <span className="text-[11px] tracking-wide mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
