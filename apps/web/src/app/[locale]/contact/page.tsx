import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO HAUTE LISIBILITÉ ── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-blue-50/70 to-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
            <span>Correspondance & Demandes</span>
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

            {/* Colonne gauche : Coordonnées */}
            <div className="lg:col-span-4 space-y-6">

              {/* Carte principale */}
              <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md">
                {/* Header uni et contrasté */}
                <div className="bg-[#0B1938] px-7 py-6 text-white relative">
                  <h2 className="font-serif text-xl font-bold text-white">Aurelex Notaires</h2>
                  <p className="text-xs text-blue-300 mt-1 uppercase tracking-wider font-semibold">Office notarial · Paris Ier</p>
                </div>

                {/* Infos détaillées */}
                <div className="p-6 space-y-5">
                  {[
                    { icon: MapPin, title: 'Adresse', value: t('address'), sub: 'Métro Concorde / Madeleine / Opéra' },
                    { icon: Phone, title: 'Standard téléphonique', value: t('phone'), sub: 'Du lundi au vendredi de 9h à 18h30' },
                    { icon: Mail, title: 'Courriel officiel', value: t('email'), sub: 'Réponse sous 24h ouvrées' },
                    { icon: Clock, title: 'Horaires d’accueil', value: t('openingHours'), sub: 'Sur rendez-vous' },
                  ].map(({ icon: Icon, title, value, sub }) => (
                    <div key={title} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-slate-950 text-base">{title}</h3>
                        <p className="text-sm text-slate-800 font-semibold mt-0.5">{value}</p>
                        {sub && <p className="text-xs text-slate-500 mt-0.5 font-medium">{sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentions RGPD */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-slate-600 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Conformité RGPD : Les informations transmises via ce formulaire sont strictement protégées par le secret professionnel notarial.
                </span>
              </div>
            </div>

            {/* Colonne droite : Formulaire */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
