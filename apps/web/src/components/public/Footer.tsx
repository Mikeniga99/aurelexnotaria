import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Scale, ArrowRight } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="bg-aurelex-navy-deep border-t border-white/10">
      {/* Ligne néon */}
      <div className="neon-line" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Identité */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/30 bg-white/5 shrink-0">
                <Image src="/images/Logo_AURELEX.png" alt="Aurelex" fill className="object-contain p-1" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight block">AURELEX</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-cyan-300/70 font-semibold block">Notaires & Associés</span>
              </div>
            </div>
            <p className="text-sm text-white/45 leading-relaxed">{t('tagline')}</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-400/80 font-medium">
                <Scale className="w-3.5 h-3.5 shrink-0" />
                <span>Officiers Publics & Ministériels</span>
              </div>
              <div className="flex items-center gap-2 text-white/35">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Membre du Conseil Supérieur du Notariat</span>
              </div>
            </div>
            <Link href="/rendez-vous"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors border border-cyan-400/30 hover:border-cyan-400 rounded-full px-4 py-2">
              <span>Prendre rendez-vous</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold mb-5">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: tNav('home') },
                { href: '/etude', label: tNav('about') },
                { href: '/expertises', label: tNav('expertises') },
                { href: '/equipe', label: tNav('team') },
                { href: '/actualites', label: tNav('news') },
                { href: '/contact', label: tNav('contact') },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-cyan-400/30 group-hover:w-5 group-hover:bg-cyan-400 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domaines */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold mb-5">Domaines</h3>
            <ul className="space-y-3">
              {['Droit Immobilier', 'Famille & Succession', 'Droit des Sociétés', 'Fiscalité Patrimoniale', 'Droit International'].map((item) => (
                <li key={item}>
                  <Link href="/expertises"
                    className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-cyan-400/30 group-hover:w-5 group-hover:bg-cyan-400 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold mb-5">L'Office</h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: tContact('address') },
                { icon: Phone, value: tContact('phone') },
                { icon: Mail, value: tContact('email') },
                { icon: Clock, value: tContact('openingHours') },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-start gap-3 text-sm text-white/45">
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre basse */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/25">
          <p>{t('copyright')}</p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-white/60 transition-colors">{t('legalNotice')}</Link>
            <span className="text-white/10">·</span>
            <Link href="/confidentialite" className="hover:text-white/60 transition-colors">{t('privacyPolicy')}</Link>
            <span className="text-white/10">·</span>
            <a href="/admin" className="hover:text-white/60 transition-colors">Administration</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
