import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppointmentForm } from '@/components/public/AppointmentForm';
import { Calendar, Clock, Shield, Video, Phone } from 'lucide-react';

export default function AppointmentPage() {
  const t = useTranslations('appointment');

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO HAUTE LISIBILITÉ ── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-blue-50/70 to-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
            <span>Prise de Rendez-vous en Ligne</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── CORPS DE PAGE ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Infos pratiques */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span>Modalités de consultation</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                  Votre rendez-vous selon vos disponibilités
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  Rendez-vous physique au cabinet Place Vendôme ou par visioconférence sécurisée avec un notaire de l'étude.
                </p>
              </div>

              <div className="space-y-3.5">
                {[
                  { icon: Calendar, title: 'Au cabinet Place Vendôme', desc: '18 Place Vendôme, Paris 1er · Lun – Ven, 9h – 18h30' },
                  { icon: Video, title: 'Visioconférence certifiée', desc: 'Consultation et signature d’actes à distance.' },
                  { icon: Phone, title: 'Entretien préalable gratuit', desc: '15–20 min pour qualifier vos enjeux juridiques.' },
                  { icon: Clock, title: 'Délai de réponse garanti', desc: 'Prise de contact sous 24h ouvrées.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-white rounded-2xl p-4.5 border-2 border-slate-200 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-slate-950 text-base">{title}</h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4.5 flex items-start gap-3.5 text-xs text-slate-600 shadow-xs">
                <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Vos informations sont protégées par le secret professionnel et le Règlement Général sur la Protection des Données (RGPD).
                </span>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-8">
              <AppointmentForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
