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
    <footer className="bg-[#0B1938] text-white border-t border-slate-800">
      {/* Ligne d'accentuation bleue */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Identité */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 bg-white shrink-0 p-1">
                <Image src="/images/Logo_AURELEX.png" alt="Aurelex" fill className="object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight block">AURELEX</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-blue-300 font-bold block">Notaires & Associés</span>
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">{t('tagline')}</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Scale className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Officiers Publics & Ministériels</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Membre du Conseil Supérieur du Notariat</span>
              </div>
            </div>
            <div>
              <Link href="/rendez-vous"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-full px-5 py-2.5 shadow-md transition-colors">
                <span>Prendre rendez-vous</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-bold mb-5">Navigation</h3>
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
                    className="text-sm text-slate-200 hover:text-white hover:underline transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-0.5 bg-blue-400 group-hover:w-3.5 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domaines */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-bold mb-5">Domaines</h3>
            <ul className="space-y-3">
              {['Droit Immobilier', 'Famille & Succession', 'Droit des Sociétés', 'Fiscalité Patrimoniale', 'Droit International'].map((item) => (
                <li key={item}>
                  <Link href="/expertises"
                    className="text-sm text-slate-200 hover:text-white hover:underline transition-colors flex items-center gap-2 group">
                    <span className="w-2 h-0.5 bg-blue-400 group-hover:w-3.5 transition-all" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-bold mb-5">L'Office</h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: tContact('address') },
                { icon: Phone, value: tContact('phone') },
                { icon: Mail, value: tContact('email') },
                { icon: Clock, value: tContact('openingHours') },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-start gap-3 text-sm text-slate-200">
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barre basse */}
      <div className="border-t border-slate-800 bg-[#060D1F] max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>{t('copyright')}</p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">{t('legalNotice')}</Link>
            <span className="text-slate-600">·</span>
            <Link href="/confidentialite" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
            <span className="text-slate-600">·</span>
            <a href="/admin" className="hover:text-white transition-colors font-semibold">Administration</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
