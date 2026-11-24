'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderLock,
  FileCheck,
  FileX,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search,
  Filter,
  User,
  ExternalLink,
} from 'lucide-react';

interface DocumentItem {
  id: string;
  originalName: string;
  category: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  rejectionReason?: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  url: string;
  size: number;
}

export default function AdminDocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/documents');
      const json = await res.json();
      if (json.success) {
        setDocs(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'VERIFIED' | 'REJECTED', reason?: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/documents/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, rejectionReason: reason }),
      });
      const json = await res.json();
      if (json.success) {
        setRejectingId(null);
        setRejectReason('');
        fetchDocs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredDocs = docs.filter((d) => {
    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      d.originalName.toLowerCase().includes(term) ||
      d.clientName.toLowerCase().includes(term) ||
      d.clientEmail.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">GED & Pièces Justificatives</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Contrôlez les pièces déposées par les clients (pièces d'identité, actes d'état civil, titres de propriété).
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par nom de document ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Statut :
          </span>
          {[
            { id: 'ALL', label: 'Tous les statuts' },
            { id: 'PENDING', label: 'En attente' },
            { id: 'VERIFIED', label: 'Conformes' },
            { id: 'REJECTED', label: 'Rejetés' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === item.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Client déposant</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Actions Notariales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-700" />
                    Chargement des documents...
                  </td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    Aucune pièce justificative trouvée.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900">{doc.originalName}</div>
                          <div className="text-[11px] text-slate-400">
                            {new Date(doc.createdAt).toLocaleDateString('fr-FR')} • {(doc.size / 1024).toFixed(0)} Ko
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{doc.clientName}</div>
                      <div className="text-[11px] text-slate-400">{doc.clientEmail}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {doc.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {doc.status === 'VERIFIED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Conforme
                        </span>
                      )}
                      {doc.status === 'REJECTED' && (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                            <AlertCircle className="w-3.5 h-3.5 text-red-600" /> Rejeté
                          </span>
                          {doc.rejectionReason && (
                            <div className="text-[10px] text-red-600 mt-0.5 italic">{doc.rejectionReason}</div>
                          )}
                        </div>
                      )}
                      {doc.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          À examiner
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          title="Télécharger / Voir"
                        >
                          <Download className="w-4 h-4" />
                        </a>

                        {doc.status !== 'VERIFIED' && (
                          <button
                            onClick={() => handleUpdateStatus(doc.id, 'VERIFIED')}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Conforme</span>
                          </button>
                        )}

                        {doc.status !== 'REJECTED' && (
                          <button
                            onClick={() => setRejectingId(doc.id)}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                          >
                            <FileX className="w-3.5 h-3.5" />
                            <span>Rejeter</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Motif de rejet du document</h3>
            <p className="text-xs text-slate-500">
              Indiquez la raison du rejet afin que le client puisse déposer une pièce conforme depuis son espace client.
            </p>
            <textarea
              rows={3}
              placeholder="Ex: Document tronqué, illisible ou date de validité expirée."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(rejectingId, 'REJECTED', rejectReason)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow"
              >
                Confirmer le rejet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
