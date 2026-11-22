import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppointmentForm } from '@/components/public/AppointmentForm';
import { Calendar, Clock, Shield, Video, Phone } from 'lucide-react';

export default function AppointmentPage() {
  const t = useTranslations('appointment');

  return (
    <div className="bg-[#F8FAFC]">

      {/* ── HERO avec image ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/etude_paris.jpg" alt="Prise de rendez-vous" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Consultation</span>
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

            {/* Infos pratiques */}
            <div className="lg:col-span-4 space-y-5 animate-slide-left">
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 mb-2">
                <span className="w-8 h-px bg-blue-600/40" />
                <span>Modalités</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Votre rendez-vous, selon vos disponibilités
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consultation physique au cabinet ou par visioconférence certifiée. Réponse garantie sous 24h ouvrées.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: Calendar, title: 'Au cabinet', desc: '18 Place Vendôme, Paris 1er · Lun – Ven, 9h – 18h30' },
                  { icon: Video, title: 'Visioconférence certifiée', desc: 'Actes à distance. Connexion sécurisée fournie.' },
                  { icon: Phone, title: 'Entretien préalable gratuit', desc: '15–20 min · Pour qualifier votre dossier.' },
                  { icon: Clock, title: 'Délai de réponse', desc: 'Sous 24h ouvrées. Urgences traitées en priorité.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-xs flex items-start gap-4 hover:border-blue-300 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                      <Icon className="w-4 h-4 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm">{title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-500 mt-2 shadow-xs">
                <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Vos données sont traitées conformément au RGPD et ne sont jamais communiquées à des tiers.</span>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-8 animate-slide-right">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
