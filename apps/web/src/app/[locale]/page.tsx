import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Calendar,
  ChevronRight,
  ShieldCheck,
  Building,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  Award,
  FileCheck2,
  Users2,
  Lock,
} from 'lucide-react';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tExp = useTranslations('expertises');
  const tAbout = useTranslations('about');

  const expertises = [
    {
      icon: Building,
      title: tExp('realEstate'),
      desc: tExp('realEstateDesc'),
      slug: 'immobilier',
    },
    {
      icon: HeartHandshake,
      title: tExp('family'),
      desc: tExp('familyDesc'),
      slug: 'famille-succession',
    },
    {
      icon: Briefcase,
      title: tExp('business'),
      desc: tExp('businessDesc'),
      slug: 'entreprises',
    },
    {
      icon: TrendingUp,
      title: tExp('wealth'),
      desc: tExp('wealthDesc'),
      slug: 'patrimoine',
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-aurelex-ivoire via-aurelex-beige/30 to-aurelex-ivoire py-20 lg:py-28 border-b border-aurelex-beige-border">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-aurelex-champagne/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-aurelex-bordeaux/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-aurelex-champagne" />
                <span>{tHero('badge')}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-aurelex-bordeaux leading-tight tracking-tight">
                {tHero('title')}
              </h1>

              <p className="text-lg sm:text-xl text-aurelex-ebene/80 leading-relaxed font-normal">
                {tHero('subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-base font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-aurelex-champagne-light" />
                  <span>{tHero('ctaAppointment')}</span>
                </Link>

                <Link
                  href="/expertises"
                  className="inline-flex items-center justify-center gap-2 bg-white text-aurelex-bordeaux border border-aurelex-beige-border hover:border-aurelex-champagne text-base font-semibold px-7 py-3.5 rounded-lg shadow-sm hover:bg-aurelex-beige/30 transition-all"
                >
                  <span>{tHero('ctaExpertises')}</span>
                  <ChevronRight className="w-4 h-4 text-aurelex-champagne" />
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-aurelex-beige-border">
                <div>
                  <div className="font-serif text-3xl font-bold text-aurelex-bordeaux">
                    25+
                  </div>
                  <div className="text-xs text-aurelex-ebene/70 font-medium mt-0.5">
                    {tHero('metricYears')}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-bold text-aurelex-bordeaux">
                    1 800+
                  </div>
                  <div className="text-xs text-aurelex-ebene/70 font-medium mt-0.5">
                    {tHero('metricActs')}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-bold text-aurelex-bordeaux">
                    99.4%
                  </div>
                  <div className="text-xs text-aurelex-ebene/70 font-medium mt-0.5">
                    {tHero('metricSatisfaction')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Crest Emblem Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 bg-gradient-to-tr from-aurelex-beige to-white shadow-2xl border-2 border-aurelex-champagne/40 flex flex-col items-center justify-center text-center">
                <div className="relative w-48 h-48 mb-6 drop-shadow-xl hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="Aurelex Emblem"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-aurelex-bordeaux">
                  Aurelex Notaires
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-aurelex-champagne-hover font-semibold mt-1">
                  Officiers Publics & Ministériels
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-aurelex-ebene/70 bg-white/80 px-3 py-1.5 rounded-full border border-aurelex-beige-border">
                  <Lock className="w-3.5 h-3.5 text-aurelex-champagne" />
                  <span>Authenticité & Secret Professionnel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRACTICE AREAS / EXPERTISES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-aurelex-bordeaux">
              {tExp('title')}
            </h2>
            <div className="w-16 h-1 bg-aurelex-champagne mx-auto my-4 rounded-full" />
            <p className="text-base sm:text-lg text-aurelex-ebene/80">
              {tExp('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertises.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-aurelex-ivoire rounded-2xl p-6 border border-aurelex-beige-border hover:border-aurelex-champagne hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center mb-6 group-hover:bg-aurelex-bordeaux group-hover:text-aurelex-champagne transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-aurelex-bordeaux mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-aurelex-ebene/75 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <Link
                    href={`/expertises`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-aurelex-bordeaux hover:text-aurelex-champagne-hover transition-colors"
                  >
                    <span>{tExp('viewDetail')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ABOUT / VALUES SECTION */}
      <section className="py-20 bg-aurelex-beige/30 border-y border-aurelex-beige-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aurelex-champagne-hover">
                {tAbout('badge')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-aurelex-bordeaux">
                {tAbout('title')}
              </h2>
              <p className="text-base text-aurelex-ebene/80 leading-relaxed">
                {tAbout('description')}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-aurelex-beige-border shadow-sm">
                  <div className="p-2 rounded-lg bg-aurelex-champagne-soft text-aurelex-bordeaux shrink-0 mt-0.5">
                    <FileCheck2 className="w-5 h-5 text-aurelex-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">
                      {tAbout('value1Title')}
                    </h4>
                    <p className="text-xs text-aurelex-ebene/70 mt-1">
                      {tAbout('value1Desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-aurelex-beige-border shadow-sm">
                  <div className="p-2 rounded-lg bg-aurelex-champagne-soft text-aurelex-bordeaux shrink-0 mt-0.5">
                    <Lock className="w-5 h-5 text-aurelex-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">
                      {tAbout('value2Title')}
                    </h4>
                    <p className="text-xs text-aurelex-ebene/70 mt-1">
                      {tAbout('value2Desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-aurelex-beige-border shadow-sm">
                  <div className="p-2 rounded-lg bg-aurelex-champagne-soft text-aurelex-bordeaux shrink-0 mt-0.5">
                    <Users2 className="w-5 h-5 text-aurelex-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-aurelex-bordeaux text-base">
                      {tAbout('value3Title')}
                    </h4>
                    <p className="text-xs text-aurelex-ebene/70 mt-1">
                      {tAbout('value3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right quote / statement */}
            <div className="lg:col-span-6">
              <div className="bg-aurelex-ebene text-white p-10 rounded-3xl shadow-xl relative border border-aurelex-champagne/30">
                <Award className="w-12 h-12 text-aurelex-champagne mb-6" />
                <blockquote className="font-serif text-2xl sm:text-3xl font-normal leading-relaxed text-aurelex-champagne-soft">
                  « Le notaire n'est pas seulement le rédacteur de l'acte, il est le garant de la paix civile et de la volonté libre et éclairée des parties. »
                </blockquote>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-lg text-white">Me Alexandre de Saint-Germain</div>
                    <div className="text-xs text-aurelex-champagne tracking-wider uppercase font-semibold">Notaire Associé Fondateur</div>
                  </div>
                  <div className="text-xs text-white/50">Paris · Place Vendôme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BANNER APPOINTMENT CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-aurelex-bordeaux via-aurelex-bordeaux-hover to-aurelex-bordeaux text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Un projet immobilier, successoral ou d'entreprise ?
          </h2>
          <p className="text-base sm:text-lg text-aurelex-champagne-soft max-w-2xl mx-auto font-normal">
            Nos notaires et juristes vous conseillent avec rigueur et bienveillance. Prenez contact avec notre secrétariat en toute confidentialité.
          </p>
          <div className="pt-2">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-2 bg-aurelex-champagne text-aurelex-ebene font-bold px-8 py-3.5 rounded-lg shadow-xl hover:bg-aurelex-champagne-light transition-all transform hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span>Demander une consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
