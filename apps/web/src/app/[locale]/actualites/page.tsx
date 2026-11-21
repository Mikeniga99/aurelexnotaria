import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function NewsPage() {
  const articles = [
    {
      slug: 'reforme-loi-finances-donation-partage',
      category: 'Fiscalité & Famille',
      title: 'Loi de finances : Les opportunités d’anticipation par la donation-partage',
      excerpt: 'La donation-partage demeure l’outil d’excellence pour figer la valeur des biens transmis et éviter les conflits liquidatifs entre héritiers tout en bénéficiant des abattements fiscaux renouvelables tous les 15 ans.',
      date: '14 Novembre 2026',
      readTime: '6 min de lecture',
    },
    {
      slug: 'securiser-acquisition-immobiliere-vefa',
      category: 'Droit Immobilier',
      title: 'Acheter sur plan (VEFA) : Les garanties légales obligatoires de l’acte notarié',
      excerpt: 'De la garantie financière d’achèvement (GFA) à la garantie décennale, découvrez comment l’acte authentique notarié protège l’acquéreur contre les aléas de construction et assure la libération échelonnée des fonds.',
      date: '02 Novembre 2026',
      readTime: '5 min de lecture',
    },
    {
      slug: 'pacte-dutreil-transmission-entreprise-famille',
      category: 'Droit des Affaires',
      title: 'Pacte Dutreil : Comment transmettre votre entreprise avec un abattement fiscal de 75 %',
      excerpt: 'Analyse pratique des conditions d’engagement collectif et individuel de conservation pour préserver l’intégrité financière d’une entreprise familiale lors de la succession du dirigeant.',
      date: '24 Octobre 2026',
      readTime: '8 min de lecture',
    },
    {
      slug: 'mandat-protection-future-anticipation-vulnerabilite',
      category: 'Droit Civil & Personnes',
      title: 'Le mandat de protection future notarié : Protéger ses proches sans tutelle judiciaire',
      excerpt: 'Cet acte notarié permet à toute personne d’organiser par avance sa protection et la gestion de son patrimoine pour le jour où elle ne pourrait plus pourvoir seule à ses intérêts, en évitant les lourdeurs de la tutelle.',
      date: '10 Octobre 2026',
      readTime: '4 min de lecture',
    },
  ];

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire via-white to-aurelex-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-aurelex-champagne" />
            <span>Doctrine & Décryptages Juridiques</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
            Actualités & Guides Notariaux
          </h1>
          <div className="w-20 h-1 bg-aurelex-champagne mx-auto rounded-full" />
          <p className="text-lg text-aurelex-ebene/80 leading-relaxed">
            Les notaires de l'étude Aurelex analysent les évolutions législatives, fiscales et jurisprudentielles pour vous aider à prendre des décisions éclairées.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="p-8 rounded-3xl bg-white border border-aurelex-beige-border hover:border-aurelex-champagne shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aurelex-champagne-soft text-aurelex-bordeaux font-semibold">
                    <Tag className="w-3 h-3 text-aurelex-champagne" />
                    <span>{item.category}</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-aurelex-ebene/60">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold text-aurelex-bordeaux leading-snug hover:text-aurelex-bordeaux-hover transition-colors">
                  {item.title}
                </h2>

                <p className="text-sm text-aurelex-ebene/75 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-aurelex-beige-border mt-6 flex items-center justify-between">
                <span className="text-xs text-aurelex-ebene/60 font-medium">{item.readTime}</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-aurelex-bordeaux hover:text-aurelex-champagne transition-colors">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
