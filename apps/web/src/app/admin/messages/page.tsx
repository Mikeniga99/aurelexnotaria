'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail,
  RefreshCw,
  Archive,
  CheckCircle2,
  Trash2,
  Eye,
  Clock,
  User,
  Phone,
} from 'lucide-react';

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/contacts?limit=50');
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, isRead: boolean) => {
    await fetch(`/api/v1/contacts/${id}/read`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead }),
    });
    fetchMessages();
  };

  const handleArchive = async (id: string) => {
    await fetch(`/api/v1/contacts/${id}/archive`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isArchived: true }),
    });
    if (activeMessage?.id === id) setActiveMessage(null);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-aurelex-bordeaux">
            Messages de Contact
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Consultation des demandes citoyennes et marquage comme traité/archivé.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualiser</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (left) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Boîte de réception</span>
            <span>{messages.filter((m) => !m.isRead).length} non lus</span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-400 text-xs">Chargement...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">Aucun message de contact.</div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {messages.map((msg) => {
                const isSelected = activeMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setActiveMessage(msg);
                      if (!msg.isRead) handleToggleRead(msg.id, true);
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-aurelex-champagne-soft border-l-4 border-aurelex-bordeaux'
                        : msg.isRead
                        ? 'hover:bg-slate-50 opacity-80'
                        : 'bg-white hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {msg.fullName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 truncate">{msg.subject}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-1">
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Message Preview (right) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {activeMessage ? (
            <>
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-900">
                    {activeMessage.subject}
                  </h2>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span>{activeMessage.fullName}</span>
                    <span>·</span>
                    <span>{activeMessage.email}</span>
                    {activeMessage.phone && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {activeMessage.phone}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleArchive(activeMessage.id)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    title="Archiver le message"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {activeMessage.message}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reçu le {new Date(activeMessage.createdAt).toLocaleString('fr-FR')}</span>
                </span>
                <a
                  href={`mailto:${activeMessage.email}?subject=RE: ${encodeURIComponent(activeMessage.subject)}`}
                  className="px-4 py-2 rounded-xl bg-aurelex-bordeaux text-white font-semibold hover:bg-aurelex-bordeaux-hover shadow-sm transition-colors"
                >
                  Répondre par email
                </a>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs text-center space-y-2">
              <Mail className="w-8 h-8 text-slate-300" />
              <span>Sélectionnez un message à gauche pour lire son contenu.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
