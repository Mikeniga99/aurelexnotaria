'use client';

import React, { useState } from 'react';
import {
  ClipboardList,
  Copy,
  Check,
  FileText,
  Printer,
  Home,
  HeartHandshake,
  Briefcase,
  Layers,
} from 'lucide-react';

interface ChecklistModel {
  id: string;
  category: string;
  title: string;
  icon: any;
  description: string;
  items: string[];
}

const NOTARIAL_CHECKLISTS: ChecklistModel[] = [
  {
    id: 'immo',
    category: 'IMMOBILIER',
    title: 'Dossier de Vente / Acquisition Immobilière',
    icon: Home,
    description: 'Pièces impératives à exiger du vendeur et de l’acquéreur avant la signature du compromis ou de l’acte authentique.',
    items: [
      'Titre de propriété antérieur complet (ou attestation immobilière de succession)',
      'Dossier de Diagnostic Technique (DDT) complet en cours de validité (DPE, amiante, plomb, électricité, gaz, termites, ERP)',
      'Dernier avis d’imposition de la Taxe Foncière',
      'Si copropriété : Règlement de copropriété + état descriptif de division + modificatifs',
      'Si copropriété : PV des 3 dernières Assemblées Générales + Carnet d’entretien de l’immeuble',
      'Si copropriété : Pré-état daté délivré par le syndic (charges de copropriété et fonds travaux)',
      'Pièce d’identité en cours de validité de chaque partie (CNI ou passeport)',
      'Livret de famille et contrat de mariage ou convention de PACS éventuelle',
    ],
  },
  {
    id: 'succession',
    category: 'FAMILLE & SUCCESSION',
    title: 'Ouverture et Règlement d’une Succession',
    icon: HeartHandshake,
    description: 'Inventaire des documents nécessaires pour dresser l’acte de notoriété et la déclaration de succession à l’administration fiscale.',
    items: [
      'Copie intégrale de l’acte de décès du défunt',
      'Livret de famille du défunt (comportant toutes les mentions de mariage, divorce, enfants)',
      'Contrat de mariage, donation entre époux ou testament (si existant)',
      'Coordonnées bancaires de l’ensemble des comptes du défunt (relevés de compte à la date du décès)',
      'Contrats d’assurance-vie souscrits par le défunt (avec numéros et coordonnées des compagnies)',
      'Titres de propriété de tous les biens immobiliers dépendant de la succession',
      'Carte grise des véhicules automobiles',
      'Dernier avis d’impôt sur le revenu et taxe foncière',
      'Facture des frais d’obsèques réglée ou à régler',
    ],
  },
  {
    id: 'famille',
    category: 'PATRIMOINE & DONATION',
    title: 'Donation entre Vifs / Donation-Partage',
    icon: Layers,
    description: 'Éléments préalables à l’évaluation et à la rédaction de la donation notariée.',
    items: [
      'Pièces d’identité en cours de validité des donateurs et des donataires (enfants/bénéficiaires)',
      'Copies intégrales des actes de naissance de tous les intervenants',
      'Livret de famille',
      'Titres de propriété des biens donnés et estimations immobilières récentes (2 avis de valeur)',
      'Historique des donations antérieures consenties (dates, montants et déclarations fiscales)',
      'Relevés des comptes ou références des titres donnés (pour les dons d’argent ou valeurs mobilières)',
    ],
  },
  {
    id: 'entreprise',
    category: 'DROIT DES AFFAIRES',
    title: 'Constitution de Société ou Cession de Fonds',
    icon: Briefcase,
    description: 'Pièces requises pour l’immatriculation ou la rédaction des actes de cession commerciale.',
    items: [
      'Projet de statuts et décision de nomination des dirigeants',
      'Attestation de blocage du capital social délivrée par l’établissement bancaire',
      'Pièces d’identité et justificatifs de domicile de moins de 3 mois de chaque associé et dirigeant',
      'Déclaration de non-condamnation et filiation signée par les gérants / présidents',
      'Bail commercial ou titre d’occupation des locaux du siège social',
      'Pour une cession de fonds : 3 derniers bilans et comptes de résultat certifiés par l’expert-comptable',
      'Livre d’inventaire du matériel et état du stock',
    ],
  },
];

export default function AdminModelesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (model: ChecklistModel) => {
    const text = `--- ${model.title.toUpperCase()} ---\r\nOffice Notarial Aurelex\r\n\r\nListe des pièces à fournir pour votre dossier :\r\n\r\n${model.items
      .map((item, idx) => `${idx + 1}. [ ] ${item}`)
      .join('\r\n')}\r\n\r\nMerci de bien vouloir déposer ces documents scannés depuis votre espace client ou nous les adresser par courriel.`;

    navigator.clipboard.writeText(text);
    setCopiedId(model.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Modèles & Check-lists par Domaine</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Fiches d'instructions pratiques et listes de pièces normalisées prêtes à être transmises aux clients.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-blue-700" />
          <span>Imprimer la sélection</span>
        </button>
      </div>

      {/* Grid of Checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {NOTARIAL_CHECKLISTS.map((model) => {
          const Icon = model.icon;
          const isCopied = copiedId === model.id;

          return (
            <div
              key={model.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D4B483] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-blue-700">
                        {model.category}
                      </span>
                      <h2 className="text-base font-serif font-bold text-slate-900 leading-snug">
                        {model.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">{model.description}</p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Pièces justificatives obligatoires :
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {model.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded border border-slate-300 bg-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {model.items.length} pièces requises
                </span>

                <button
                  onClick={() => handleCopy(model)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-700 hover:bg-blue-800 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier pour le client</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
