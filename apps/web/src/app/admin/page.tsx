'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck2,
  Mail,
  FileText,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface DashboardStats {
  kpi: {
    appointments: {
      total: number;
      pending: number;
      reviewing: number;
      confirmed: number;
    };
    messages: {
      unread: number;
      total: number;
    };
    articles: {
      published: number;
      draft: number;
    };
  };
  recentActivity: {
    appointments: Array<{
      id: string;
      fullName: string;
      motif: string;
      preferredDate: string;
      status: string;
      createdAt: string;
    }>;
    messages: Array<{
      id: string;
      fullName: string;
      subject: string;
      isRead: boolean;
      createdAt: string;
    }>;
    auditLogs: Array<{
      id: string;
      action: string;
      entity: string;
      createdAt: string;
      user?: { firstName: string; lastName: string };
    }>;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/stats/dashboard');
      if (response.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error?.message || 'Erreur lors de la récupération des données.');
      }
      setStats(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-aurelex-bordeaux" />
          <span>Calcul des indicateurs en temps réel...</span>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 space-y-3">
        <div className="flex items-center gap-2 font-bold">
          <AlertCircle className="w-5 h-5" />
          <span>Erreur de chargement du tableau de bord</span>
        </div>
        <p className="text-sm">{error || 'Données introuvables.'}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">En attente</span>;
      case 'REVIEWING':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">En cours d’examen</span>;
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Confirmé</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Refusé</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-aurelex-bordeaux">
            Tableau de Bord
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Indicateurs d'activité calculés en temps réel depuis la base PostgreSQL.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: RDV */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rendez-vous Reçus
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {stats.kpi.appointments.total}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="font-semibold text-amber-600">{stats.kpi.appointments.pending} en attente</span>
              <span>·</span>
              <span className="font-semibold text-emerald-600">{stats.kpi.appointments.confirmed} confirmés</span>
            </div>
          </div>
          <Link
            href="/admin/rdv"
            className="flex items-center justify-between text-xs font-semibold text-aurelex-bordeaux hover:underline pt-2 border-t border-slate-100"
          >
            <span>Gérer les demandes</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Messages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Messages de Contact
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {stats.kpi.messages.total}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="font-semibold text-blue-600">{stats.kpi.messages.unread} non traités</span>
              <span>·</span>
              <span>{stats.kpi.messages.total - stats.kpi.messages.unread} archivés</span>
            </div>
          </div>
          <Link
            href="/admin/messages"
            className="flex items-center justify-between text-xs font-semibold text-aurelex-bordeaux hover:underline pt-2 border-t border-slate-100"
          >
            <span>Consulter les messages</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 3: Articles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Articles & Guides
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 font-serif">
              {stats.kpi.articles.published}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="font-semibold text-emerald-600">Publiés en ligne</span>
              <span>·</span>
              <span className="font-semibold text-slate-400">{stats.kpi.articles.draft} brouillons</span>
            </div>
          </div>
          <Link
            href="/admin/articles"
            className="flex items-center justify-between text-xs font-semibold text-aurelex-bordeaux hover:underline pt-2 border-t border-slate-100"
          >
            <span>Éditeur CMS bilingue</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Appointments & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">
              Dernières Demandes de Rendez-vous
            </h2>
            <Link href="/admin/rdv" className="text-xs text-aurelex-bordeaux font-semibold hover:underline">
              Tout voir
            </Link>
          </div>

          {stats.recentActivity.appointments.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Aucune demande reçue pour le moment.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentActivity.appointments.map((rdv) => (
                <div key={rdv.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{rdv.fullName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {rdv.motif} · Créneau : {rdv.preferredDate}
                    </div>
                  </div>
                  <div>{getStatusBadge(rdv.status)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-slate-900">
              Derniers Messages de Contact
            </h2>
            <Link href="/admin/messages" className="text-xs text-aurelex-bordeaux font-semibold hover:underline">
              Tout voir
            </Link>
          </div>

          {stats.recentActivity.messages.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">Aucun message de contact reçu.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentActivity.messages.map((msg) => (
                <div key={msg.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{msg.fullName}</div>
                    <div className="text-xs text-slate-500 truncate max-w-xs">{msg.subject}</div>
                  </div>
                  <div>
                    {msg.isRead ? (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600">Lu</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-blue-100 text-blue-700 font-bold">Nouveau</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
