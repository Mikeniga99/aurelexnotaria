import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Award, Users, Building2, CheckCircle2, Scale, Calendar, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/public/ScrollReveal';

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
            src="/images/arriere_grand_ecran.jpg"
            alt="L'Étude Aurelex Notaires Paris"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/78 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <ScrollReveal variant="title" delay={120}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              {t('title')}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="focus" delay={220}>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              {t('description')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── NARRATIVE ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Carte institutionnelle de prestige */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="card">
                <div className="bg-gradient-to-br from-[#0B1938] to-[#060D1F] rounded-3xl p-8 sm:p-10 text-white border border-[#D4B483]/30 shadow-xl space-y-7 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4B483]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-[#D4B483]/50 shrink-0 bg-white/95 p-1">
                    <Image
                      src="/images/favicon.png"
                      alt="Aurelex Notaire Sceau Officiel"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#D4B483] uppercase">Office Ministériel</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Aurelex Notaires Paris</h3>
                    <p className="text-slate-300 text-sm leading-relaxed pt-1">
                      Officiers publics investis d'une délégation de puissance publique par le Garde des Sceaux, garants de la foi publique et de la sécurité des actes notariés.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-6 space-y-3.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Fondation de l'office</span>
                      <span className="font-bold text-[#D4B483]">1998 (28 ans d'exercice)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Siège historique</span>
                      <span className="font-semibold text-white">18 Place Vendôme, Paris 1er</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Instance ordinale</span>
                      <span className="font-semibold text-white">Chambre de Paris</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contenu textuel */}
            <div className="lg:col-span-7 space-y-7">
              <ScrollReveal variant="eyebrow" delay={80}>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span>Authenticité & Rigueur</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="title" delay={150}>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight">
                  Une charge inscrite dans le temps long
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="focus" delay={230}>
                <div className="space-y-4 text-base text-slate-700 leading-relaxed font-normal">
                  <p>
                    Fondée sur les principes séculaires du notariat français, l'étude <strong className="text-slate-950 font-bold">Aurelex Notaires</strong> perpétue une tradition d'authenticité absolue, investie d'une délégation de puissance publique par le Garde des Sceaux.
                  </p>
                  <p>
                    Dans un monde juridique en constante accélération, nous offrons un cadre de réflexion, d'analyse et de haute sécurité juridique pour vos patrimoines familiaux, immobiliers et d'entreprise.
                  </p>
                </div>
              </ScrollReveal>

              {/* Capacités techniques */}
              <ScrollReveal variant="glide-right" delay={300}>
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
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
          <div className="text-center space-y-3">
            <ScrollReveal variant="eyebrow" delay={80}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>Grandes Étapes</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="title" delay={150}>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">
                Vingt-cinq ans de confiance partagée
              </h2>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-blue-300 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <ScrollReveal
                    variant={i % 2 === 0 ? 'glide-left' : 'glide-right'}
                    delay={i * 60}
                    className="flex-1 w-full"
                  >
                    <div className={`bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 shadow-xs ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="font-serif text-2xl font-extrabold text-blue-800">{item.year}</div>
                      <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">{item.event}</p>
                    </div>
                  </ScrollReveal>

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
            <ScrollReveal variant="eyebrow" delay={80}>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>Engagements Déontologiques</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="title" delay={150}>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950">{t('valuesTitle')}</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t('value1Title'), desc: t('value1Desc'), num: '01' },
              { icon: Award, title: t('value2Title'), desc: t('value2Desc'), num: '02' },
              { icon: Users, title: t('value3Title'), desc: t('value3Desc'), num: '03' },
            ].map(({ icon: Icon, title, desc, num }, idx) => (
              <ScrollReveal key={num} variant="card" delay={idx * 100}>
                <div className="bg-white rounded-3xl p-8 relative border-2 border-slate-200 shadow-md space-y-4 hover:border-blue-400 transition-colors">
                  <span className="font-serif text-4xl font-extrabold text-blue-700/30">
                    {num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-950">{title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-5 text-center space-y-6">
          <ScrollReveal variant="quote">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 italic">« Votre confiance est notre engagement. »</p>
          </ScrollReveal>

          <ScrollReveal variant="card" delay={140}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rendez-vous" className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-colors active:scale-[0.96]">
                <Calendar className="w-4 h-4 text-white" />
                <span>Prendre attache avec l'office</span>
              </Link>
              <Link href="/equipe" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-slate-300 transition-colors active:scale-[0.96]">
                <span>Rencontrer nos notaires</span>
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
