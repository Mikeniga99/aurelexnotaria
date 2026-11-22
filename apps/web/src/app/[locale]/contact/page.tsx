import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="bg-[#F8FAFC]">

      {/* ── HERO avec image ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/etude_paris.jpg" alt="Contact Aurelex" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Nous écrire</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── CORPS CLAIR ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Colonne gauche : Coordonnées */}
            <div className="lg:col-span-4 space-y-6 animate-slide-left">

              {/* Carte principale */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-700 to-indigo-900 px-7 py-6 relative overflow-hidden text-white">
                  <div className="absolute top-0 right-0 opacity-10">
                    <Scale className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white relative">Aurelex Notaires</h3>
                  <p className="text-xs text-blue-100 mt-1 uppercase tracking-widest">Office notarial · Paris Ier</p>
                  <div className="neon-line mt-4" />
                </div>

                {/* Infos */}
                <div className="p-6 space-y-5">
                  {[
                    { icon: MapPin, title: 'Adresse', value: t('address'), sub: 'Métro Concorde / Opéra' },
                    { icon: Phone, title: 'Standard', value: t('phone'), sub: null },
                    { icon: Mail, title: 'Courriel', value: t('email'), sub: null },
                    { icon: Clock, title: 'Horaires', value: t('openingHours'), sub: null },
                  ].map(({ icon: Icon, title, value, sub }) => (
                    <div key={title} className="flex items-start gap-4 pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-slate-900 text-sm">{title}</h4>
                        <p className="text-sm text-slate-600 mt-0.5">{value}</p>
                        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge RGPD */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-500 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Conformité RGPD : vos données sont traitées exclusivement pour traiter votre correspondance.</span>
              </div>
            </div>

            {/* Colonne droite : Formulaire */}
            <div className="lg:col-span-8 animate-slide-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
