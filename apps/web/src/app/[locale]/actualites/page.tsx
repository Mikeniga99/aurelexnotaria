import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, ArrowRight, Tag, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export default function NewsPage() {
  const articles = [
    {
      slug: 'reforme-loi-finances-donation-partage',
      category: 'Fiscalité & Famille',
      title: "Loi de finances : Les opportunités d'anticipation par la donation-partage",
      excerpt: "La donation-partage demeure l'outil d'excellence pour figer la valeur des biens transmis et éviter les conflits liquidatifs entre héritiers tout en bénéficiant des abattements fiscaux renouvelables tous les 15 ans.",
      date: '14 Novembre 2026',
      readTime: '6',
      img: '/images/domaine_famille.jpg',
    },
    {
      slug: 'securiser-acquisition-immobiliere-vefa',
      category: 'Droit Immobilier',
      title: "Acheter sur plan (VEFA) : Les garanties légales de l'acte notarié",
      excerpt: "De la garantie financière d'achèvement à la garantie décennale, comment l'acte authentique protège l'acquéreur contre les aléas de construction.",
      date: '02 Novembre 2026',
      readTime: '5',
      img: '/images/domaine_immobilier.jpg',
    },
    {
      slug: 'pacte-dutreil-transmission-entreprise',
      category: 'Droit des Affaires',
      title: "Pacte Dutreil : Transmettre votre entreprise avec 75 % d'abattement fiscal",
      excerpt: "Analyse pratique des conditions d'engagement collectif et individuel de conservation pour préserver l'intégrité financière d'une entreprise familiale.",
      date: '24 Octobre 2026',
      readTime: '8',
      img: '/images/domaine_entreprise.jpg',
    },
    {
      slug: 'mandat-protection-future',
      category: 'Droit Civil & Personnes',
      title: 'Le mandat de protection future notarié : Protéger sans tutelle judiciaire',
      excerpt: "Cet acte notarié permet à toute personne d'organiser par avance sa protection et la gestion de son patrimoine, évitant les lourdeurs de la tutelle.",
      date: '10 Octobre 2026',
      readTime: '4',
      img: '/images/domaine_international.jpg',
    },
  ];

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/domaine_entreprise.jpg"
            alt="Actualités juridiques Aurelex Notaires"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <ScrollReveal variant="title" delay={120}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              Actualités & Guides Notariaux
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="focus" delay={220}>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              Les notaires de l'étude Aurelex analysent les évolutions législatives, fiscales et jurisprudentielles pour éclairer vos décisions patrimoniales.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ARTICLE VEDETTE ── */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <ScrollReveal variant="eyebrow" delay={80}>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
              <span>Article à la Une</span>
            </div>
          </ScrollReveal>

          <article className="bg-white rounded-3xl grid grid-cols-1 lg:grid-cols-12 border-2 border-slate-200 shadow-lg overflow-hidden">
            {/* Image */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
              <ScrollReveal variant="glide-left" className="w-full h-full min-h-[280px] lg:min-h-full relative">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>
            {/* Contenu textuel */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <ScrollReveal variant="eyebrow" delay={120}>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                  <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-700" />
                    {featured.readTime} min de lecture
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    {featured.date}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="title" delay={180}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-snug">
                  {featured.title}
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="focus" delay={260}>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">{featured.excerpt}</p>
              </ScrollReveal>

              <ScrollReveal variant="card" delay={320}>
                <div className="pt-2">
                  <Link href={`/actualites/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-full shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.96]">
                    <span>Lire l'analyse complète</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </article>
        </div>
      </section>

      {/* ── GRILLE ARTICLES ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <ScrollReveal variant="eyebrow" delay={80}>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Dernières publications de l'étude</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rest.map((item, idx) => (
              <ScrollReveal
                key={idx}
                variant="card"
                delay={idx * 80}
                className="h-full"
              >
                <article
                  className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-blue-900 uppercase tracking-wider border border-slate-200 shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-700" /> {item.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-700" /> {item.readTime} min</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-950 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">{item.excerpt}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <Link href={`/actualites/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider transition-colors active:scale-[0.96]">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
