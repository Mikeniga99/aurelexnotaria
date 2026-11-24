'use client';

import React, { useEffect, useState } from 'react';
import {
  CalendarCheck2,
  Filter,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Save,
} from 'lucide-react';
import { AppointmentStatus } from '@notaria/contracts';

interface AppointmentItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  motif: string;
  preferredDate: string;
  preferredTimeSlot?: string;
  message?: string;
  status: AppointmentStatus;
  internalNotes?: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<AppointmentItem | null>(null);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>(AppointmentStatus.PENDING);
  const [internalNotes, setInternalNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      let url = '/api/v1/appointments?limit=50';
      if (selectedStatus !== 'ALL') {
        url += `&status=${selectedStatus}`;
      }
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const res = await fetch(url);
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedStatus]);

  const handleOpenModal = (item: AppointmentItem) => {
    setActiveModalItem(item);
    setNewStatus(item.status);
    setInternalNotes(item.internalNotes || '');
  };

  const handleUpdateStatus = async () => {
    if (!activeModalItem) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/v1/appointments/${activeModalItem.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          internalNotes,
        }),
      });

      if (res.ok) {
        setActiveModalItem(null);
        fetchAppointments();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const STATUS_LABELS: Record<string, string> = {
    ALL: 'Tous les statuts',
    PENDING: 'En attente',
    REVIEWING: 'En examen',
    CONFIRMED: 'Confirmés',
    REJECTED: 'Refusés',
    CANCELLED: 'Annulés',
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">En attente</span>;
      case AppointmentStatus.REVIEWING:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">En examen</span>;
      case AppointmentStatus.CONFIRMED:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Confirmé</span>;
      case AppointmentStatus.REJECTED:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Refusé</span>;
      case AppointmentStatus.CANCELLED:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">Annulé</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            Gestion des Rendez-vous
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Traitement des dossiers, changement de statut et notes internes confidentielles.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2">
          {['ALL', AppointmentStatus.PENDING, AppointmentStatus.REVIEWING, AppointmentStatus.CONFIRMED, AppointmentStatus.REJECTED].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {STATUS_LABELS[st] || st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAppointments();
          }}
          className="w-full md:w-72 relative"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher nom, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
          />
        </form>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Chargement des demandes...
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Aucun rendez-vous ne correspond à vos filtres.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Demandeur</th>
                  <th className="py-3.5 px-4">Motif Juridique</th>
                  <th className="py-3.5 px-4">Créneau souhaité</th>
                  <th className="py-3.5 px-4">Statut</th>
                  <th className="py-3.5 px-4">Reçu le</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.fullName}</div>
                      <div className="text-slate-500 text-[11px]">{item.email} · {item.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {item.motif}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{item.preferredDate}</div>
                      {item.preferredTimeSlot && (
                        <div className="text-[10px] text-slate-400">{item.preferredTimeSlot}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-blue-700 text-white font-semibold text-xs hover:bg-blue-800 shadow-sm transition-colors cursor-pointer"
                      >
                        Traiter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Process Appointment */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Dossier : {activeModalItem.fullName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Motif : {activeModalItem.motif} · Téléphone : {activeModalItem.phone}
                </p>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {activeModalItem.message && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Message du client :</span>
                {activeModalItem.message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Statut de la demande
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as AppointmentStatus)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                >
                  <option value={AppointmentStatus.PENDING}>En attente d'instruction</option>
                  <option value={AppointmentStatus.REVIEWING}>En cours d'examen</option>
                  <option value={AppointmentStatus.CONFIRMED}>Confirmé par l'office</option>
                  <option value={AppointmentStatus.REJECTED}>Refusé / Non disponible</option>
                  <option value={AppointmentStatus.CANCELLED}>Annulé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Notes Internes Confidentielles (non visibles du public)
                </label>
                <textarea
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Ex : Dossier validé. Pièces d'identité reçues par le secrétariat..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleUpdateStatus}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors shadow cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#D4B483]" />
                <span>Enregistrer la modification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
