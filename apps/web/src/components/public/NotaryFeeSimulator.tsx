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
    <div className="liquid-glass-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden">
      {/* Badge réglementaire */}
      <div className="absolute top-4 right-4">
        <span className="liquid-glass-pill rounded-full px-3 py-1 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
          Barème Légal
        </span>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          <Calculator className="w-4 h-4" />
          <span>Outil d'Aide à la Décision</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
          Simulateur Réglementé des Frais d'Acquisition Immobilière
        </h3>
        <p className="text-xs sm:text-sm text-white/55 mt-1 leading-relaxed">
          En France, les frais dits « de notaire » sont strictement fixés par le Code de commerce.
          Plus de <strong className="text-white/80">80 % de cette somme</strong> est reversée au Trésor Public.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Type de bien immobilier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPropertyType('ancien')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  propertyType === 'ancien'
                    ? 'btn-liquid-primary'
                    : 'liquid-glass-pill text-white/70 hover:text-white'
                }`}
              >
                Logement Ancien (~7-8%)
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('neuf')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  propertyType === 'neuf'
                    ? 'btn-liquid-primary'
                    : 'liquid-glass-pill text-white/70 hover:text-white'
                }`}
              >
                Neuf / VEFA (~2-3%)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                Prix d'acquisition net vendeur
              </label>
              <span className="font-serif text-xl font-bold blue-gradient-text">
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
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              style={{ background: `linear-gradient(to right, #2563EB ${((propertyPrice - 50000) / (2500000 - 50000)) * 100}%, rgba(255,255,255,0.1) 0%)` }}
            />
            <div className="flex justify-between text-[10px] text-white/35 mt-1.5 font-mono">
              <span>50 000 €</span>
              <span>1 000 000 €</span>
              <span>2 500 000 €</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-aurelex-blue/10 border border-aurelex-blue/30 text-xs text-white/60 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Tarification nationale uniforme : chaque étude notariale applique le même barème d'émoluments fixé par l'État.</span>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 liquid-glass-blue rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold block">Estimation Globale</span>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                {calculation.total.toLocaleString('fr-FR')} €
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/50 block">Ratio indicatif</span>
              <span className="text-base font-bold blue-gradient-text">~ {calculation.percentage} %</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { label: 'Taxes et droits versés au Trésor Public :', value: calculation.taxes, highlight: false },
              { label: 'Émoluments réglementés du notaire (TTC) :', value: calculation.emolumentsTTC, highlight: true },
              { label: 'Débours & formalités administratives :', value: calculation.debours, highlight: false },
              { label: 'Contribution de Sécurité Immobilière (CSI) :', value: calculation.csi, highlight: false },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex justify-between items-center text-white/70">
                <span>{label}</span>
                <strong className={`font-mono ${highlight ? 'text-cyan-300' : 'text-white'}`}>
                  {value.toLocaleString('fr-FR')} €
                </strong>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/rendez-vous"
              className="btn-liquid-primary w-full justify-center"
            >
              <span>Authentifier votre acquisition</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
