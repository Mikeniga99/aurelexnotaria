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
    <div className="bg-[#F8FAFC]">
      {/* ── HERO avec image fond ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/etude_paris.jpg"
            alt="Cabinet notarial parisien"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>L'Étude</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('description')}
          </p>
        </div>
      </section>

      {/* ── NARRATIVE ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 shadow-xl animate-slide-left">
              <Image
                src="/images/etude_paris.jpg"
                alt="Cabinet notarial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              {/* Badge flottant */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-lg border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-serif text-sm font-bold text-slate-900">Fondé en 1998</div>
                  <div className="text-xs text-slate-500">Place Vendôme, Paris 1er</div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="space-y-8 animate-slide-right">
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
                <span className="w-8 h-px bg-blue-600/40" />
                <span>Authenticité & Rigueur</span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Une charge inscrite{' '}
                <span className="font-light italic blue-gradient-text">dans le temps long</span>
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Fondée sur les principes fondateurs du notariat français, l'étude <strong className="text-slate-900">Aurelex Notaires</strong> perpétue une tradition d'authenticité absolue investis d'une délégation de puissance publique par le Garde des Sceaux.
                </p>
                <p>
                  Dans un monde juridique en constante accélération, nous offrons un sanctuaire de réflexion, d'analyse et de sécurité pour vos patrimoines familiaux, immobiliers et d'entreprise.
                </p>
              </div>

              {/* Capacités techniques */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-lg mb-4">Infrastructure notariale</h4>
                {[
                  'Actes authentiques électroniques avec signature qualifiée',
                  'Téléactes & télétransmission aux hypothèques',
                  'Visioconférence notariale certifiée',
                  'Archivage sécurisé au Minutier Central',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200 animate-blur-focus">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
              <span className="w-8 h-px bg-blue-600/40" />
              <span>Chronologie de l'office</span>
              <span className="w-8 h-px bg-blue-600/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Vingt-cinq ans de confiance
            </h2>
          </div>

          <div className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.4) 10%, rgba(37,99,235,0.6) 50%, rgba(37,99,235,0.4) 90%, transparent)' }} />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className={`flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="font-serif text-2xl font-bold text-blue-700">{item.year}</div>
                    <p className="text-sm text-slate-600 mt-1 max-w-xs leading-relaxed">{item.event}</p>
                  </div>

                  {/* Point central */}
                  <div className="relative shrink-0 w-4 h-4 mt-1">
                    <div className="absolute inset-0 rounded-full bg-blue-600" />
                    <div className="absolute inset-[3px] rounded-full bg-white" />
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div className="text-center space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700">
              <span className="w-8 h-px bg-blue-600/40" />
              <span>Nos fondements</span>
              <span className="w-8 h-px bg-blue-600/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">{t('valuesTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: t('value1Title'), desc: t('value1Desc'), num: '01' },
              { icon: Award, title: t('value2Title'), desc: t('value2Desc'), num: '02' },
              { icon: Users, title: t('value3Title'), desc: t('value3Desc'), num: '03' },
            ].map(({ icon: Icon, title, desc, num }, idx) => (
              <div key={num}
                className="bg-white rounded-3xl p-8 relative group border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 120}ms` }}>
                <span className="absolute top-4 right-5 font-serif text-5xl font-light text-slate-100 select-none group-hover:text-blue-50 transition-colors">
                  {num}
                </span>
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5 transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">{title}</h3>
                  <div className="neon-line w-10 group-hover:w-20 transition-all duration-500" />
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-slate-200 animate-fade-in-up">
        <div className="max-w-2xl mx-auto px-5 text-center space-y-6">
          <p className="font-serif text-2xl text-slate-800 italic">« Votre confiance est notre engagement. »</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rendez-vous" className="btn-liquid-primary">
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre attache avec l'office</span>
            </Link>
            <Link href="/equipe" className="btn-liquid-secondary">
              <span>Rencontrer nos notaires</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
