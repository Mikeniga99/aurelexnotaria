import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Award, Users, Building2, CheckCircle2, Scale, Calendar, ArrowRight } from 'lucide-react';

const timeline = [
  { year: '1998', event: "Fondation de l'étude par Me Alexandre de Saint-Germain, Place Vendôme, Paris Ier." },
  { year: '2005', event: "Extension branche droit des affaires. Association de Me Éléonore Vaneau-Rocher." },
  { year: '2012', event: "Certification actes authentiques électroniques (AAE) et adoption du Réal." },
  { year: '2019', event: "Labellisation « Notaire de l'Entreprise » par la Chambre des Notaires de Paris." },
  { year: '2024', event: "Ouverture du service visioconférence notariale certifiée pour non-résidents." },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/etude_paris.jpg"
            alt="L'Étude Aurelex Notaires Paris"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/78 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#D4B483]/15 border border-[#D4B483]/40 text-[#D4B483] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span>Histoire & Identité de l'Étude</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
            {t('description')}
          </p>
        </div>
      </section>

      {/* ── NARRATIVE ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Image nette avec cadre de prestige */}
            <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-slate-200 shadow-xl bg-white">
              <Image
                src="/images/etude_paris.jpg"
                alt="Cabinet notarial Aurelex Paris"
                fill
                className="object-cover"
              />
              {/* Badge flottant blanc opaque 100% lisible */}
              <div className="absolute bottom-5 inset-x-5 bg-white/98 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-base font-bold text-slate-950">Fondé en 1998</div>
                  <div className="text-xs text-slate-600 font-medium">18 Place Vendôme, Paris Ier</div>
                </div>
              </div>
            </div>

            {/* Contenu textuel */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>Authenticité & Rigueur</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight">
                Une charge inscrite dans le temps long
              </h2>
              <div className="space-y-4 text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  Fondée sur les principes séculaires du notariat français, l'étude <strong className="text-slate-950 font-bold">Aurelex Notaires</strong> perpétue une tradition d'authenticité absolue, investie d'une délégation de puissance publique par le Garde des Sceaux.
                </p>
                <p>
                  Dans un monde juridique en constante accélération, nous offrons un cadre de réflexion, d'analyse et de haute sécurité juridique pour vos patrimoines familiaux, immobiliers et d'entreprise.
                </p>
              </div>

              {/* Capacités techniques */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-slate-950 text-lg">Infrastructure & Outils Notariaux</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    'Actes authentiques électroniques avec signature qualifiée',
                    'Téléactes & télétransmission aux hypothèques',
                    'Visioconférence notariale certifiée à distance',
                    'Archivage sécurisé au Minutier Central',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Grandes Étapes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
              Vingt-cinq ans de confiance partagée
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-blue-300 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 w-full bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 shadow-xs ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="font-serif text-2xl font-extrabold text-blue-800">{item.year}</div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">{item.event}</p>
                  </div>

                  <div className="relative shrink-0 w-5 h-5 rounded-full bg-blue-700 border-4 border-white shadow-sm hidden md:block" />

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 lg:py-28 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-14">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Engagements Déontologiques</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">{t('valuesTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t('value1Title'), desc: t('value1Desc'), num: '01' },
              { icon: Award, title: t('value2Title'), desc: t('value2Desc'), num: '02' },
              { icon: Users, title: t('value3Title'), desc: t('value3Desc'), num: '03' },
            ].map(({ icon: Icon, title, desc, num }) => (
              <div key={num}
                className="bg-white rounded-3xl p-8 relative border-2 border-slate-200 shadow-md space-y-4">
                <span className="font-serif text-4xl font-extrabold text-blue-700/30">
                  {num}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-950">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-5 text-center space-y-6">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 italic">« Votre confiance est notre engagement. »</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous" className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-colors">
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre attache avec l'office</span>
            </Link>
            <Link href="/equipe" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-slate-300 transition-colors">
              <span>Rencontrer nos notaires</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
