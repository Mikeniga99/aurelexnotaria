'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  ShieldCheck,
  Download,
  Filter,
  RefreshCw,
  Search,
  User,
  Clock,
  Laptop,
  CheckCircle2,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface AuditLogItem {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export default function AdminTracabilitePage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = entityFilter === 'ALL'
        ? '/api/v1/audit-logs?limit=100'
        : `/api/v1/audit-logs?limit=100&entity=${entityFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data.logs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [entityFilter]);

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registre_audit_notarial_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const actor = log.user ? `${log.user.firstName} ${log.user.lastName} ${log.user.email}`.toLowerCase() : 'système';
    return (
      log.action.toLowerCase().includes(term) ||
      log.entity.toLowerCase().includes(term) ||
      (log.details && log.details.toLowerCase().includes(term)) ||
      actor.includes(term)
    );
  });

  const getBadgeColor = (entity: string) => {
    switch (entity) {
      case 'APPOINTMENT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DOCUMENT':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SETTING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ARTICLE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'AUTH':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'EXPORT':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Traçabilité & Journal d'Audit</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Registre Immuable
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Conformité déontologique notariale, horodatage certifié et traçabilité de chaque action sur la plateforme.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportJSON}
            disabled={logs.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-aurelex-champagne" />
            <span>Exporter le registre (JSON)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher une action, un notaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filtrer :
          </span>
          {[
            { id: 'ALL', label: 'Toutes les entités' },
            { id: 'APPOINTMENT', label: 'Rendez-vous' },
            { id: 'DOCUMENT', label: 'GED / Documents' },
            { id: 'SETTING', label: 'Paramètres' },
            { id: 'ARTICLE', label: 'Articles' },
            { id: 'EXPORT', label: 'Exports' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setEntityFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                entityFilter === item.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Date & Heure</th>
                <th className="py-3 px-4">Auteur</th>
                <th className="py-3 px-4">Action & Entité</th>
                <th className="py-3 px-4">Détails consignés</th>
                <th className="py-3 px-4">Adresse IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    {loading ? 'Chargement du registre...' : 'Aucun événement enregistré pour ce filtre.'}
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  let parsedDetails = null;
                  if (log.details) {
                    try {
                      parsedDetails = JSON.parse(log.details);
                    } catch {
                      parsedDetails = log.details;
                    }
                  }

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                        <div className="font-medium text-slate-900">
                          {new Date(log.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(log.createdAt).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {log.user ? (
                          <div>
                            <div className="font-semibold text-slate-800">
                              {log.user.firstName} {log.user.lastName}
                            </div>
                            <div className="text-[10px] text-slate-500">{log.user.role}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Système / Public</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${getBadgeColor(
                            log.entity
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        {parsedDetails ? (
                          typeof parsedDetails === 'object' ? (
                            <div className="space-y-0.5 text-[11px] text-slate-600 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">
                              {Object.entries(parsedDetails).map(([k, v]) => (
                                <div key={k} className="truncate">
                                  <span className="font-semibold text-slate-700">{k}:</span>{' '}
                                  <span>{String(v)}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-600">{parsedDetails}</span>
                          )
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                        {log.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
