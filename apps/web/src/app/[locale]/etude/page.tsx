import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ShieldCheck, Scale, Award, BookOpen, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire via-white to-aurelex-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-aurelex-champagne" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
            {t('title')}
          </h1>
          <div className="w-20 h-1 bg-aurelex-champagne mx-auto rounded-full" />
          <p className="text-lg text-aurelex-ebene/80 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Narrative & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-aurelex-bordeaux">
              Une charge notariale inscrite dans le temps long
            </h2>
            <p className="text-sm sm:text-base text-aurelex-ebene/80 leading-relaxed">
              Fondée sur les principes fondateurs du notariat français issus de la loi du 25 ventôse an XI, l’étude <strong>Aurelex Notaires</strong> perpétue une tradition d’authenticité et de rigueur absolue. Investis d'une délégation de puissance publique par le Garde des Sceaux, nos notaires confèrent aux actes qu'ils reçoivent la force probante et exécutoire d'un jugement.
            </p>
            <p className="text-sm sm:text-base text-aurelex-ebene/80 leading-relaxed">
              Dans un monde juridique en constante accélération, nous offrons un sanctuaire de réflexion, d’analyse et de sécurité. Qu'il s'agisse de transmettre un patrimoine familial, de sécuriser une acquisition immobilière complexe ou de structurer le capital d'une entreprise, notre démarche repose sur une écoute bienveillante et une maîtrise technique pointue.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-aurelex-beige-border shadow-xl space-y-6">
              <div className="flex items-center gap-4 border-b border-aurelex-beige-border pb-4">
                <div className="w-12 h-12 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-aurelex-champagne" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-aurelex-bordeaux">Résidence Notariale</h4>
                  <p className="text-xs text-aurelex-ebene/70">Place Vendôme, Paris 1er arrondissement</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-aurelex-ebene/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Actes authentiques électroniques avec signature qualifiée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Téléactes & télétransmission directe aux hypothèques</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Visioconférence notariale certifiée pour les actes à distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Archivage sécurisé au Minutier Central des Notaires</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values pillars */}
        <div className="border-t border-aurelex-beige-border pt-16">
          <h2 className="font-serif text-3xl font-bold text-aurelex-bordeaux text-center mb-12">
            {t('valuesTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-aurelex-beige-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-aurelex-champagne" />
              </div>
              <h3 className="font-serif font-bold text-xl text-aurelex-bordeaux">
                {t('value1Title')}
              </h3>
              <p className="text-sm text-aurelex-ebene/75 leading-relaxed">
                {t('value1Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-aurelex-beige-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center">
                <Award className="w-6 h-6 text-aurelex-champagne" />
              </div>
              <h3 className="font-serif font-bold text-xl text-aurelex-bordeaux">
                {t('value2Title')}
              </h3>
              <p className="text-sm text-aurelex-ebene/75 leading-relaxed">
                {t('value2Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-aurelex-beige-border shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center">
                <Users className="w-6 h-6 text-aurelex-champagne" />
              </div>
              <h3 className="font-serif font-bold text-xl text-aurelex-bordeaux">
                {t('value3Title')}
              </h3>
              <p className="text-sm text-aurelex-ebene/75 leading-relaxed">
                {t('value3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/rendez-vous"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all"
          >
            <span>Prendre attache avec l'office</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
