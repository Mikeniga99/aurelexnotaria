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
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl px-3 py-2 flex items-center justify-around shadow-[0_10px_30px_rgba(15,23,42,0.12)] border border-slate-200">
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
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/35 group-active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mt-1">
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
                  ? 'text-blue-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
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
