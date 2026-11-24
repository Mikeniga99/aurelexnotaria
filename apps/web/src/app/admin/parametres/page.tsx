'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Clock,
  Calculator,
  Mail,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Phone,
  MapPin,
} from 'lucide-react';

export default function AdminParametresPage() {
  const [activeTab, setActiveTab] = useState<'OFFICE' | 'RDV' | 'SIMULATOR' | 'TEMPLATES'>('OFFICE');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Impossible de charger les paramètres.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/v1/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || 'Erreur lors de la sauvegarde');
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erreur de connexion');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700 mb-2" />
        <p className="text-xs uppercase tracking-wider font-medium">Chargement des paramètres...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'OFFICE', label: 'Office & Coordonnées', icon: Building2 },
    { id: 'RDV', label: 'Prise de Rendez-vous', icon: Clock },
    { id: 'SIMULATOR', label: 'Barème & Émoluments', icon: Calculator },
    { id: 'TEMPLATES', label: 'Modèles de Notifications', icon: Mail },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Paramètres de l’Office Notarial</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configurez les coordonnées de l’étude, les règles de réception, le barème des frais et les alertes.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Save className="w-4 h-4 text-[#D4B483]" />
          )}
          <span>{saving ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Tous les paramètres ont été mis à jour et consignés dans le journal d'audit.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-b-2 border-blue-700 text-blue-700 font-bold bg-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {activeTab === 'OFFICE' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-aurelex-champagne" />
              Identité de l’étude
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Raison sociale / Titre de l'office</label>
                <input
                  type="text"
                  value={settings.office_name || ''}
                  onChange={(e) => handleChange('office_name', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro SIRET / Identification Notariale</label>
                <input
                  type="text"
                  value={settings.office_siret || ''}
                  onChange={(e) => handleChange('office_siret', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone d'accueil</label>
                <input
                  type="text"
                  value={settings.office_phone || ''}
                  onChange={(e) => handleChange('office_phone', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email officiel de correspondance</label>
                <input
                  type="email"
                  value={settings.office_email || ''}
                  onChange={(e) => handleChange('office_email', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse postale complète</label>
                <input
                  type="text"
                  value={settings.office_address || ''}
                  onChange={(e) => handleChange('office_address', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Horaires d'ouverture au public</label>
                <input
                  type="text"
                  value={settings.office_hours || ''}
                  onChange={(e) => handleChange('office_hours', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'RDV' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-aurelex-champagne" />
              Organisation des Créneaux de Rendez-vous
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prise de RDV en ligne active</label>
                <select
                  value={settings.rdv_enabled || 'true'}
                  onChange={(e) => handleChange('rdv_enabled', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                >
                  <option value="true">Oui — Module en ligne ouvert au public</option>
                  <option value="false">Non — Suspendu temporairement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Durée standard d'un créneau (minutes)</label>
                <select
                  value={settings.rdv_slot_duration || '45'}
                  onChange={(e) => handleChange('rdv_slot_duration', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes (standard notarial)</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Délai minimum de réservation (heures)</label>
                <input
                  type="number"
                  value={settings.rdv_min_notice_hours || '24'}
                  onChange={(e) => handleChange('rdv_min_notice_hours', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
                <p className="text-[11px] text-slate-400 mt-1">Empêche les réservations de dernière minute imprévues.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Validation automatique des créneaux</label>
                <select
                  value={settings.rdv_auto_confirm || 'false'}
                  onChange={(e) => handleChange('rdv_auto_confirm', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                >
                  <option value="false">Non — Validation manuelle obligatoire par le secrétariat (Recommandé)</option>
                  <option value="true">Oui — Confirmation immédiate</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SIMULATOR' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-aurelex-champagne" />
              Tranches légales d’émoluments (Arrêté ministériel en vigueur)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tranche 1 (0 € à 6 500 €) — % HT</label>
                <input
                  type="text"
                  value={settings.rate_tranche_1 || '3.870'}
                  onChange={(e) => handleChange('rate_tranche_1', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tranche 2 (6 500 € à 17 000 €) — % HT</label>
                <input
                  type="text"
                  value={settings.rate_tranche_2 || '1.596'}
                  onChange={(e) => handleChange('rate_tranche_2', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tranche 3 (17 000 € à 60 000 €) — % HT</label>
                <input
                  type="text"
                  value={settings.rate_tranche_3 || '1.064'}
                  onChange={(e) => handleChange('rate_tranche_3', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tranche 4 (Au-delà de 60 000 €) — % HT</label>
                <input
                  type="text"
                  value={settings.rate_tranche_4 || '0.799'}
                  onChange={(e) => handleChange('rate_tranche_4', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Forfait moyen des débours & formalités (€ TTC)</label>
                <input
                  type="text"
                  value={settings.formalites_moyennes || '1200'}
                  onChange={(e) => handleChange('formalites_moyennes', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
                <p className="text-[11px] text-slate-400 mt-1">Montant forfaitaire moyen affiché dans le simulateur de frais d'acquisition.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'TEMPLATES' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-aurelex-champagne" />
              Textes des notifications clients automatiques
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message d'accusé de réception (Demande en attente)</label>
                <textarea
                  rows={3}
                  value={settings.template_rdv_received || ''}
                  onChange={(e) => handleChange('template_rdv_received', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message de confirmation définitive du rendez-vous</label>
                <textarea
                  rows={3}
                  value={settings.template_rdv_confirmed || ''}
                  onChange={(e) => handleChange('template_rdv_confirmed', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
