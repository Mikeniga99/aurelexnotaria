'use client';

import React from 'react';
import { usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Home, Briefcase, Users, Calendar, Phone } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  const locale = useLocale();

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetUrl = href === '/' ? `/${locale}` : `/${locale}${href}`;
    if (window.location.pathname === targetUrl) {
      window.location.reload();
    } else {
      window.location.href = targetUrl;
    }
  };

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/expertises', label: 'Domaines', icon: Briefcase },
    { href: '/rendez-vous', label: 'RDV', icon: Calendar, highlight: true },
    { href: '/equipe', label: 'Office', icon: Users },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="md:hidden fixed bottom-4 inset-x-3.5 sm:inset-x-8 max-w-md mx-auto z-50 pointer-events-auto">
      {/* Liquid Glass Pill Container */}
      <div className="relative rounded-[28px] bg-[#081226]/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 border-t-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.2)] h-[68px] px-1">
        
        {/* Reflet spéculaire de surface incurvé */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/15 via-transparent to-black/20 pointer-events-none" />

        {/* Grille stricte à 5 colonnes : répartition symétrique à 20% par onglet */}
        <div className="grid grid-cols-5 h-full items-center">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            if (item.highlight) {
              return (
                <div key={item.href} className="relative flex justify-center items-center h-full">
                  <a
                    href={item.href === '/' ? `/${locale}` : `/${locale}${item.href}`}
                    onClick={handleNavClick(item.href)}
                    className="absolute -top-2 flex flex-col items-center group z-20 cursor-pointer"
                    aria-label={item.label}
                  >
                    {/* Bouton RDV agrandi, parfaitement circulaire et abaissé */}
                    <div className="w-[54px] h-[54px] rounded-full aspect-square bg-gradient-to-tr from-[#D4B483] via-[#F8EBD9] to-[#BF9761] p-0.5 shadow-[0_8px_24px_rgba(212,180,131,0.5)] transition-transform duration-200 group-active:scale-95 group-hover:scale-105 flex items-center justify-center shrink-0">
                      <div className="w-full h-full rounded-full aspect-square bg-gradient-to-b from-[#E5CCA5] to-[#B89668] flex items-center justify-center shadow-inner">
                        <Icon className="w-6 h-6 text-[#0B1938] stroke-[2.3]" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#D4B483] uppercase tracking-wider mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {item.label}
                    </span>
                  </a>
                </div>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href === '/' ? `/${locale}` : `/${locale}${item.href}`}
                onClick={handleNavClick(item.href)}
                className="relative z-10 flex flex-col items-center justify-center h-full py-1 group transition-all duration-150 active:scale-[0.92] cursor-pointer"
              >
                <div className="relative flex flex-col items-center">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
                      isActive
                        ? 'text-[#D4B483] stroke-[2.4]'
                        : 'text-white/80 group-hover:text-white stroke-[1.8]'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10.5px] tracking-tight mt-1 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                    isActive
                      ? 'font-bold text-[#D4B483]'
                      : 'font-medium text-white/80 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

                {/* Point indicateur or avec emplacement fixe réservé */}
                <div className="h-1.5 flex items-center justify-center mt-0.5">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] shadow-[0_0_6px_#D4B483]" />
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
