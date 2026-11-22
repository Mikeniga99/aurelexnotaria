import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AppointmentForm } from '@/components/public/AppointmentForm';
import { Calendar, Clock, Shield, Video, Phone } from 'lucide-react';

export default function AppointmentPage() {
  const t = useTranslations('appointment');

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/domaine_patrimoine.jpg"
            alt="Prise de rendez-vous notaire Aurelex"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#D4B483]/15 border border-[#D4B483]/40 text-[#D4B483] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span>Prise de Rendez-vous en Ligne</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
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
