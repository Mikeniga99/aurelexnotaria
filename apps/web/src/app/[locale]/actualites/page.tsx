import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, ArrowRight, Tag, Clock } from 'lucide-react';

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
    <div className="bg-[#F8FAFC]">

      {/* ── HERO avec image ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/etude_paris.jpg" alt="Actualités Aurelex" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Doctrine & Décryptages Juridiques</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Actualités & Guides Notariaux
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Les notaires de l'étude Aurelex analysent les évolutions législatives, fiscales et jurisprudentielles.
          </p>
        </div>
      </section>

      {/* ── ARTICLE VEDETTE ── */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 mb-10 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>À la une</span>
          </div>
          <article className="relative group overflow-hidden rounded-3xl grid grid-cols-1 lg:grid-cols-2 border border-slate-200/90 shadow-lg bg-white animate-blur-focus">
            {/* Image */}
            <div className="relative min-h-[300px]">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Contenu */}
            <div className="p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-blue-600">
                  <Tag className="w-3.5 h-3.5" />
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {featured.readTime} min
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {featured.date}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                {featured.title}
              </h2>
              <div className="neon-line w-12 group-hover:w-28 transition-all duration-500" />
              <p className="text-sm text-slate-600 leading-relaxed">{featured.excerpt}</p>
              <Link href={`/actualites/${featured.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors pt-2">
                <span>Lire l'article complet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── GRILLE ARTICLES CLAIR ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>Dernières publications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rest.map((item, idx) => (
              <article
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image en haut */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 border border-slate-100 shadow-xs">
                      <Tag className="w-3 h-3 text-blue-600" />
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {item.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {item.readTime} min</span>
                  </div>
                  <h2 className="font-serif text-lg font-bold text-slate-900 leading-tight flex-1 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
                  <Link href={`/actualites/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors pt-2 border-t border-slate-100">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
