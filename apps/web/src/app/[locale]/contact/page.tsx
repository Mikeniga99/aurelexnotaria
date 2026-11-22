import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arriere_grand_ecran.jpg"
            alt="Cabinet Aurelex Notaires Contact"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#D4B483]/15 border border-[#D4B483]/40 text-[#D4B483] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span>Correspondance & Demandes</span>
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
