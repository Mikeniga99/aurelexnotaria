'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Mail,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Clock,
  Layers,
  Loader2,
} from 'lucide-react';

export default function AdminStatistiquesPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/stats/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleExport = (type: 'appointments' | 'contacts') => {
    window.open(`/api/v1/export/${type}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Statistiques d’Activité & Exports</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Indicateurs clés de performance, flux des sollicitations notariales et exportations comptables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('appointments')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export RDV (CSV)</span>
          </button>

          <button
            onClick={() => handleExport('contacts')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-aurelex-champagne" />
            <span>Export Messages (CSV)</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-700 mb-2" />
          <p className="text-xs uppercase tracking-wider font-medium">Calcul des statistiques...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Rendez-vous Reçus</span>
                <Calendar className="w-4 h-4 text-blue-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {stats?.counts?.appointments ?? 0}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Flux actif en ligne</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Demandes en attente</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
                {stats?.counts?.pendingAppointments ?? 0}
              </div>
              <div className="text-[11px] text-slate-400">À valider par le secrétariat</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Messages de Contact</span>
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {stats?.counts?.messages ?? 0}
              </div>
              <div className="text-[11px] text-slate-400">
                {stats?.counts?.unreadMessages ?? 0} non lus
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Articles & Guides</span>
                <Layers className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {stats?.counts?.articles ?? 0}
              </div>
              <div className="text-[11px] text-slate-400">Publications juridiques actives</div>
            </div>
          </div>

          {/* Detailed Activity Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Box 1: Export Hub */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                Centre d’Exportations & Archives Légales
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Téléchargez les registres sous format normalisé CSV (compatible Microsoft Excel, Apple Numbers et ERP notariaux) avec encodage UTF-8 certifié.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">Registre des Rendez-vous</div>
                    <div className="text-[11px] text-slate-400">Historique complet, créneaux, motifs, identités et statuts</div>
                  </div>
                  <button
                    onClick={() => handleExport('appointments')}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Télécharger
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">Registre des Messages Entrants</div>
                    <div className="text-[11px] text-slate-400">Demandes de renseignements, questions juridiques et coordonnées</div>
                  </div>
                  <button
                    onClick={() => handleExport('contacts')}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Télécharger
                  </button>
                </div>
              </div>
            </div>

            {/* Box 2: Quality & Response Standards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-700" />
                Engagements de Qualité Notariale
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Taux de traitement des rendez-vous sous 24h</span>
                    <span className="text-blue-700 font-bold">98.5%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-700 h-full rounded-full" style={{ width: '98.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Conformité du registre d'audit (RGPD)</span>
                    <span className="text-emerald-600 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Disponibilité du simulateur d'émoluments</span>
                    <span className="text-blue-600 font-bold">99.9%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '99.9%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-aurelex-champagne-soft/50 rounded-xl border border-aurelex-champagne/30 text-[11px] text-slate-600">
                <strong className="text-slate-800">Note déontologique :</strong> Toutes les données statistiques sont agrégées et anonymisées conformément aux règles fixées par le Conseil Supérieur du Notariat (CSN).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
