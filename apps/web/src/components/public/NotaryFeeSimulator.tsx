'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function NotaryFeeSimulator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [propertyType, setPropertyType] = useState<'ancien' | 'neuf'>('ancien');

  const calculation = useMemo(() => {
    const price = Math.max(0, propertyPrice);

    // Droits de mutation / Taxes départementales et communales
    const taxesRate = propertyType === 'ancien' ? 0.058 : 0.00715;
    const taxes = Math.round(price * taxesRate);

    // Émoluments réglementés dégressifs
    let emolumentsHT = 0;
    if (price > 0) {
      const t1 = Math.min(price, 6500) * 0.0387;
      const t2 = Math.max(0, Math.min(price, 17000) - 6500) * 0.01596;
      const t3 = Math.max(0, Math.min(price, 60000) - 17000) * 0.01064;
      const t4 = Math.max(0, price - 60000) * 0.00799;
      emolumentsHT = t1 + t2 + t3 + t4;
    }
    const emolumentsTTC = Math.round(emolumentsHT * 1.2); // TVA 20%

    // Débours & formalités administratives
    const debours = propertyType === 'ancien' ? 1200 : 900;

    // Contribution de sécurité immobilière (CSI)
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
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
      {/* Badge réglementaire */}
      <div className="absolute top-4 right-4">
        <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          Barème Légal
        </span>
      </div>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
          <Calculator className="w-4 h-4 text-blue-600" />
          <span>Outil d'Aide à la Décision</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Simulateur Réglementé des Frais d'Acquisition Immobilière
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          En France, les frais dits « de notaire » sont strictement fixés par le Code de commerce.
          Plus de <strong className="text-slate-900">80 % de cette somme</strong> est reversée au Trésor Public.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Formulaire & curseur */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Type de bien immobilier
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPropertyType('ancien')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  propertyType === 'ancien'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300'
                }`}
              >
                Logement Ancien (~7-8%)
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('neuf')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                  propertyType === 'neuf'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300'
                }`}
              >
                Logement Neuf / VEFA (~2-3%)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Prix d'acquisition du bien (€)
              </label>
              <span className="font-serif text-2xl font-extrabold text-blue-800">
                {propertyPrice.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={2500000}
              step={10000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-xs text-slate-700 mt-1 font-mono font-bold">
              <span>50 000 €</span>
              <span>1 250 000 €</span>
              <span>2 500 000 €</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 flex items-start gap-2.5 font-medium">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              Simulation indicative non contractuelle établie selon le barème officiel de l'article A444-91 du Code de commerce.
            </span>
          </div>
        </div>

        {/* Bloc résultats */}
        <div className="lg:col-span-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-md space-y-5">
            <div className="flex items-baseline justify-between border-b-2 border-blue-200 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-700 block">
                  Estimation totale des frais
                </span>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1938]">
                  {calculation.total.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-slate-600 font-bold block">Part estimée</span>
                <span className="text-2xl font-extrabold text-blue-700">{calculation.percentage} %</span>
              </div>
            </div>

            {/* Détail décomposé */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Droits de mutation & taxes Trésor Public (env. 80%) :</span>
                </span>
                <span className="font-mono font-bold text-slate-950">{calculation.taxes.toLocaleString('fr-FR')} €</span>
              </div>

              <div className="flex justify-between items-center text-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Émoluments réglementés de l’office notarial (TTC) :</span>
                </span>
                <span className="font-mono font-bold text-slate-950">{calculation.emolumentsTTC.toLocaleString('fr-FR')} €</span>
              </div>

              <div className="flex justify-between items-center text-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Formalités & débours administratifs :</span>
                </span>
                <span className="font-mono font-bold text-slate-950">{calculation.debours.toLocaleString('fr-FR')} €</span>
              </div>

              <div className="flex justify-between items-center text-slate-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Contribution de Sécurité Immobilière (CSI) :</span>
                </span>
                <span className="font-mono font-bold text-slate-950">{calculation.csi.toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/rendez-vous"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-colors"
              >
                <span>Obtenir une attestation pour mon dossier</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
