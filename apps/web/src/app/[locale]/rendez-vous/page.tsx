import React from 'react';
import { useTranslations } from 'next-intl';
import { AppointmentForm } from '@/components/public/AppointmentForm';
import { Calendar, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function AppointmentPage() {
  const t = useTranslations('appointment');
  const tContact = useTranslations('contact');

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-aurelex-champagne" />
                <span>Prise de Contact Officielle</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
                {t('title')}
              </h1>
              <p className="text-base text-aurelex-ebene/80 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-aurelex-beige/30 border border-aurelex-beige-border space-y-4">
              <h3 className="font-serif font-bold text-aurelex-bordeaux text-lg">
                Informations Utiles
              </h3>
              <ul className="space-y-3 text-sm text-aurelex-ebene/80">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-aurelex-champagne shrink-0 mt-1" />
                  <span>Délai de réponse moyen sous 24 à 48 heures ouvrées.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-aurelex-champagne shrink-0 mt-1" />
                  <span>Tous nos échanges sont couverts par le secret professionnel absolu du notariat.</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-aurelex-champagne shrink-0 mt-1" />
                  <span>{tContact('address')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-aurelex-champagne shrink-0 mt-1" />
                  <span>{tContact('phone')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
