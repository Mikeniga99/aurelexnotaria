import React from 'react';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Practice info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-aurelex-champagne" />
                <span>Nous Écrire</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
                {t('title')}
              </h1>
              <p className="text-base text-aurelex-ebene/80 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-aurelex-beige/30 border border-aurelex-beige-border space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-aurelex-bordeaux border border-aurelex-beige-border shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-aurelex-champagne" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">Adresse de l'office</h4>
                  <p className="text-sm text-aurelex-ebene/80 mt-1">{t('address')}</p>
                  <p className="text-xs text-aurelex-ebene/60 mt-0.5">Métro Concorde / Opéra (Lignes 1, 3, 7, 8, 12, 14)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-aurelex-bordeaux border border-aurelex-beige-border shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 text-aurelex-champagne" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">Standard téléphonique</h4>
                  <p className="text-sm text-aurelex-ebene/80 mt-1">{t('phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-aurelex-bordeaux border border-aurelex-beige-border shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 text-aurelex-champagne" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">Courriel officiel</h4>
                  <p className="text-sm text-aurelex-ebene/80 mt-1">{t('email')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-aurelex-bordeaux border border-aurelex-beige-border shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-aurelex-champagne" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">Horaires d'ouverture</h4>
                  <p className="text-sm text-aurelex-ebene/80 mt-1">{t('openingHours')}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-aurelex-ivoire border border-aurelex-beige-border flex items-center gap-3 text-xs text-aurelex-ebene/70">
              <ShieldCheck className="w-5 h-5 text-aurelex-champagne shrink-0" />
              <span>Conformité RGPD : vos données sont traitées exclusivement pour traiter votre correspondance et ne font l'objet d'aucune cession commerciale.</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
