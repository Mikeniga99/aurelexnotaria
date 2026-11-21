import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Scale } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  return (
    <footer className="bg-aurelex-ebene text-aurelex-ivoire border-t border-aurelex-bordeaux-dark">
      {/* Upper Footer: Branding & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-aurelex-champagne/40">
                <Image
                  src="/images/logo.png"
                  alt="Aurelex Notaires Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  AURELEX
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-aurelex-champagne block -mt-1 font-semibold">
                  Notaires & Associés
                </span>
              </div>
            </div>
            <p className="text-sm text-aurelex-champagne-soft/80 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-aurelex-champagne font-medium pt-2">
              <Scale className="w-4 h-4" />
              <span>Officiers Publics & Ministériels</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/etude" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/expertises" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('expertises')}
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('team')}
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-aurelex-champagne transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Info */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              {tContact('title')}
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-aurelex-champagne shrink-0 mt-0.5" />
                <span>{tContact('address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-aurelex-champagne shrink-0" />
                <span>{tContact('phone')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-aurelex-champagne shrink-0" />
                <span>{tContact('email')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-aurelex-champagne shrink-0 mt-0.5" />
                <span>{tContact('openingHours')}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Deontology & Legal obligations */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Cadre & Déontologie
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              L’activité des notaires est strictement réglementée par le Code de commerce, le Conseil Supérieur du Notariat (CSN) et la Chambre des Notaires de Paris.
            </p>
            <div className="space-y-2 text-xs">
              <div className="text-aurelex-champagne font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('regulatedFees')}</span>
              </div>
              <div className="text-aurelex-champagne font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('mediator')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Mentions */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>{t('copyright')}</p>
          <div className="flex items-center space-x-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              {t('legalNotice')}
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
