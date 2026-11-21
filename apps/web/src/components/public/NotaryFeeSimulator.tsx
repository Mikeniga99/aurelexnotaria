'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function NotaryFeeSimulator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [propertyType, setPropertyType] = useState<'ancien' | 'neuf'>('ancien');

  // Calculation based on French notarial regulations
  // En France, les "frais de notaire" sont principalement composés de taxes d'enregistrement (DMTO) reversées à l'État (env. 5.80% dans l'ancien, 0.715% dans le neuf),
  // des émoluments réglementés du notaire (env. 1.0% à 1.3%) et des débours / formalités (env. 800 € - 1200 €).
  const calculation = useMemo(() => {
    const price = Math.max(0, propertyPrice);

    // Droits de mutation / Taxes départementales et communales
    const taxesRate = propertyType === 'ancien' ? 0.058 : 0.00715;
    const taxes = Math.round(price * taxesRate);

    // Émoluments réglementés dégressifs (Tranches du barème officiel)
    // 0 à 6500 € : 3.870%
    // 6500 à 17000 € : 1.596%
    // 17000 à 60000 € : 1.064%
    // Plus de 60000 € : 0.799%
    let emolumentsHT = 0;
    if (price > 0) {
      const t1 = Math.min(price, 6500) * 0.0387;
      const t2 = Math.max(0, Math.min(price, 17000) - 6500) * 0.01596;
      const t3 = Math.max(0, Math.min(price, 60000) - 17000) * 0.01064;
      const t4 = Math.max(0, price - 60000) * 0.00799;
      emolumentsHT = t1 + t2 + t3 + t4;
    }
    const emolumentsTTC = Math.round(emolumentsHT * 1.2); // TVA 20%

    // Débours & formalités administratives (cadastre, état hypothécaire, purges)
    const debours = propertyType === 'ancien' ? 1200 : 900;

    // Contribution de sécurité immobilière (CSI) : 0.10% min 15 €
    const csi = Math.max(15, Math.round(price * 0.001));

    const total = taxes + emolumentsTTC + debours + csi;
    const percentage = price > 0 ? ((total / price) * 100).toFixed(1) : '0';

    return {
      taxes,
      emolumentsTTC,
      debours,
      csi,
      total,
      percentage,
    };
  }, [propertyPrice, propertyType]);

  return (
    <div className="bg-white rounded-3xl border-2 border-aurelex-champagne/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
      {/* Subtle gold ribbon top right */}
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
        <div className="bg-gradient-to-r from-aurelex-champagne to-aurelex-bordeaux text-white text-[9px] font-bold uppercase tracking-widest py-1 text-center transform rotate-45 translate-x-8 translate-y-4 shadow-md">
          Barème Légal
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-aurelex-champagne-hover">
          <Calculator className="w-4 h-4 text-aurelex-champagne" />
          <span>Outil d'Aide à la Décision</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-aurelex-bordeaux mt-2">
          Simulateur Réglementé des Frais d'Acquisition Immobilière
        </h3>
        <p className="text-xs sm:text-sm text-aurelex-ebene/75 mt-1 leading-relaxed">
          En France, les frais dits « de notaire » sont strictement fixés par le Code de commerce. 
          Plus de <strong>80 % de cette somme</strong> est reversée au Trésor Public au titre des droits de mutation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Type of property */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
              Type de bien immobilier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPropertyType('ancien')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                  propertyType === 'ancien'
                    ? 'bg-aurelex-bordeaux text-white border-aurelex-bordeaux shadow-md'
                    : 'bg-aurelex-ivoire text-aurelex-ebene/70 border-aurelex-beige-border hover:bg-aurelex-beige/40'
                }`}
              >
                Logement Ancien (~7-8%)
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('neuf')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                  propertyType === 'neuf'
                    ? 'bg-aurelex-bordeaux text-white border-aurelex-bordeaux shadow-md'
                    : 'bg-aurelex-ivoire text-aurelex-ebene/70 border-aurelex-beige-border hover:bg-aurelex-beige/40'
                }`}
              >
                Neuf / VEFA (~2-3%)
              </button>
            </div>
          </div>

          {/* Amount slider and input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-aurelex-ebene/70">
                Prix d'acquisition net vendeur
              </label>
              <span className="font-serif text-lg font-bold text-aurelex-bordeaux">
                {propertyPrice.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="2500000"
              step="10000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-aurelex-beige-border rounded-lg appearance-none cursor-pointer accent-aurelex-bordeaux"
            />
            <div className="flex justify-between text-[10px] text-aurelex-ebene/50 mt-1 font-mono">
              <span>50 000 €</span>
              <span>1 000 000 €</span>
              <span>2 500 000 €</span>
            </div>
          </div>

          {/* Guarantee info */}
          <div className="p-3.5 rounded-xl bg-aurelex-champagne-soft/50 border border-aurelex-champagne/30 text-xs text-aurelex-ebene/80 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-aurelex-champagne shrink-0 mt-0.5" />
            <span>
              Tarification nationale uniforme : chaque étude notariale applique rigoureusement le même barème d'émoluments fixé par l'État.
            </span>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-aurelex-ebene to-aurelex-bordeaux-dark text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-aurelex-champagne/30 space-y-5">
          <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-aurelex-champagne font-semibold block">
                Estimation Globale
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                {calculation.total.toLocaleString('fr-FR')} €
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/60 block">Ratio indicatif</span>
              <span className="text-base font-bold text-aurelex-champagne-light">
                ~ {calculation.percentage} %
              </span>
            </div>
          </div>

          {/* Detailed breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-white/80">
              <span>Taxes et droits versés au Trésor Public (État & Département) :</span>
              <strong className="font-mono text-white">{calculation.taxes.toLocaleString('fr-FR')} €</strong>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span>Émoluments réglementés du notaire (TTC) :</span>
              <strong className="font-mono text-aurelex-champagne-light">{calculation.emolumentsTTC.toLocaleString('fr-FR')} €</strong>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span>Débours & formalités administratives certifiées :</span>
              <strong className="font-mono text-white">{calculation.debours.toLocaleString('fr-FR')} €</strong>
            </div>
            <div className="flex justify-between items-center text-white/80">
              <span>Contribution de Sécurité Immobilière (CSI) :</span>
              <strong className="font-mono text-white">{calculation.csi.toLocaleString('fr-FR')} €</strong>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/rendez-vous"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-champagne to-aurelex-champagne-light text-aurelex-ebene text-xs font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
            >
              <span>Authentifier votre acquisition avec un notaire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
