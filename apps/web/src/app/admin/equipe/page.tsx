'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  CalendarCheck2,
  Loader2,
  Plus,
  X,
  Search,
  ArrowRight,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

interface StaffUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  _count?: {
    assignedAppointments: number;
  };
}

interface PublicMember {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  translations?: Array<{
    locale: string;
    roleTitle: string;
    bio: string;
  }>;
}

export default function AdminEquipePage() {
  const [data, setData] = useState<{ staffUsers: StaffUser[]; publicMembers: PublicMember[] }>({
    staffUsers: [],
    publicMembers: [],
  });
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'PROMO' | 'NEW'>('PROMO');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Tab 1: Promote Registered User
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [promoRole, setPromoRole] = useState('COLLABORATOR');
  const [promoTitle, setPromoTitle] = useState('Premier Clerc');
  const [promoPhone, setPromoPhone] = useState('');
  const [promoBio, setPromoBio] = useState('');

  // Tab 2: Pre-register new staff
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleTitle: 'Notaire Associé',
    bio: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/team');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch('/api/v1/users');
      const json = await res.json();
      if (json.success) {
        setAllUsers(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFeedbackMsg(null);
    setSelectedUser(null);
    setUserSearch('');
    fetchAllUsers();
  };

  // Tab 1 Action: Promote selected user
  const handlePromoteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setSubmitting(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/v1/users/${selectedUser.id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: promoRole,
          roleTitle: promoTitle,
          phone: promoPhone,
          bio: promoBio,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Erreur lors de la promotion.');
      }

      setFeedbackMsg({
        type: 'success',
        text: `${selectedUser.firstName} ${selectedUser.lastName} a été promu(e) au rôle ${promoRole} avec le titre "${promoTitle}". Ses accès administrateur sont immédiatement activés !`,
      });

      setSelectedUser(null);
      fetchData();
      fetchAllUsers();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Impossible de promouvoir l’utilisateur.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Tab 2 Action: Pre-register non-registered staff
  const handlePreRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch('/api/v1/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Erreur lors du pré-enregistrement.');
      }

      setFeedbackMsg({
        type: 'success',
        text: `La fiche de ${form.fullName} a été pré-enregistrée. Dès qu'il créera son compte avec ${form.email}, il sera automatiquement reconnu comme collaborateur et basculera sur l'administration !`,
      });

      setForm({ fullName: '', email: '', phone: '', roleTitle: 'Notaire Associé', bio: '' });
      fetchData();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Impossible de pré-enregistrer.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Live real-time search filtering
  const filteredUsers = allUsers.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const email = (u.email || '').toLowerCase();
    return fullName.includes(q) || email.includes(q);
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">SUPER ADMIN</span>;
      case 'ADMIN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">NOTAIRE / ADMIN</span>;
      case 'COLLABORATOR':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">CLERC / COLLAB</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">CLIENT CITOYEN</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Équipe & Collaborateurs de l’Office</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Gestion des accréditations notariales, attribution des dossiers et promotion des collaborateurs.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#D4B483]" />
          <span>Ajouter un collaborateur</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-700 mb-2" />
          <p className="text-xs uppercase tracking-wider font-medium">Chargement des équipes...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Section: Comptes Actifs & Accréditations */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Comptes Accrédités & Attribution des Rendez-vous
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.staffUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    {getRoleBadge(user.role)}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck2 className="w-4 h-4 text-blue-600" />
                      Rendez-vous assignés
                    </span>
                    <span className="font-bold text-slate-800">
                      {user._count?.assignedAppointments ?? 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Membres Publics de l'Étude */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-700" />
              Membres Présentés au Public (Site Vitrine)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.publicMembers.map((member) => {
                const tr = (member.translations?.[0] as any) || {};
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
                  >
                    <div>
                      <div className="font-serif font-bold text-slate-900 text-base">{member.fullName}</div>
                      <div className="text-xs text-blue-700 font-semibold">{tr.roleTitle || 'Notaire'}</div>
                    </div>

                    {tr.bio && (
                      <p className="text-xs text-slate-600 line-clamp-3 italic">
                        "{tr.bio}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                      {member.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.email}</span>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ajouter / Promouvoir un Collaborateur (2 Onglets) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-scaleIn max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-xl">
                  Gestion des Accréditations & Collaborateurs
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Promouvez un utilisateur inscrit ou pré-enregistrez un juriste avant sa création de compte.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalTab('PROMO');
                  setFeedbackMsg(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  modalTab === 'PROMO'
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>1. Promouvoir un utilisateur inscrit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab('NEW');
                  setFeedbackMsg(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  modalTab === 'NEW'
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>2. Pré-enregistrer un futur collaborateur</span>
              </button>
            </div>

            {/* Feedback Alert */}
            {feedbackMsg && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn ${
                  feedbackMsg.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {feedbackMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* TAB 1: Promouvoir un utilisateur inscrit */}
            {modalTab === 'PROMO' && (
              <div className="space-y-4">
                {/* Instant Search Bar */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Rechercher un utilisateur (filtrage automatique en direct) :
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Tapez les premières lettres du nom, prénom ou email..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                    />
                  </div>
                </div>

                {/* User List with Auto-reduction */}
                {!selectedUser && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                      <span>Utilisateurs correspondants ({filteredUsers.length})</span>
                      <span className="text-[11px] font-normal text-slate-400">Cliquez pour promouvoir</span>
                    </div>

                    <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white">
                      {usersLoading ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          <Loader2 className="w-4 h-4 animate-spin mx-auto mb-1 text-blue-700" />
                          Chargement des comptes...
                        </div>
                      ) : filteredUsers.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          Aucun utilisateur ne correspond à votre recherche.
                        </div>
                      ) : (
                        filteredUsers.map((u) => (
                          <div
                            key={u.id}
                            onClick={() => {
                              setSelectedUser(u);
                              setPromoRole(u.role === 'VISITOR' ? 'COLLABORATOR' : u.role);
                            }}
                            className="p-3 flex items-center justify-between hover:bg-blue-50/60 transition-colors cursor-pointer group"
                          >
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700">
                                {u.firstName} {u.lastName}
                              </div>
                              <div className="text-[11px] text-slate-500">{u.email}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getRoleBadge(u.role)}
                              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Promotion Form for Selected User */}
                {selectedUser && (
                  <form onSubmit={handlePromoteUser} className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                      <div>
                        <span className="text-[11px] text-blue-700 font-bold uppercase tracking-wider">
                          Utilisateur sélectionné :
                        </span>
                        <div className="font-bold text-sm text-slate-900">
                          {selectedUser.firstName} {selectedUser.lastName} ({selectedUser.email})
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(null)}
                        className="text-xs text-blue-700 hover:underline font-semibold cursor-pointer"
                      >
                        Changer d'utilisateur
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nouveau Rôle Système (Accès Back-office) *
                        </label>
                        <select
                          value={promoRole}
                          onChange={(e) => setPromoRole(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483] bg-white font-semibold"
                        >
                          <option value="COLLABORATOR">COLLABORATOR (Clerc / Juriste)</option>
                          <option value="ADMIN">ADMIN (Notaire Associé / Gérant)</option>
                          <option value="SUPER_ADMIN">SUPER_ADMIN (Notaire Associé Principal)</option>
                          <option value="VISITOR">VISITOR (Rétrograder en simple client)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Titre / Fonction Notariale *
                        </label>
                        <select
                          value={promoTitle}
                          onChange={(e) => setPromoTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483] bg-white font-semibold"
                        >
                          <option value="Notaire Associé">Notaire Associé</option>
                          <option value="Notaire Salarié">Notaire Salarié</option>
                          <option value="Premier Clerc">Premier Clerc</option>
                          <option value="Clerc aux Actes Courants">Clerc aux Actes Courants</option>
                          <option value="Comptable Taxateur">Comptable Taxateur</option>
                          <option value="Secrétaire Notarial">Secrétaire Notarial</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Ligne téléphonique directe
                        </label>
                        <input
                          type="tel"
                          placeholder="+33 1 42 68 55 XX"
                          value={promoPhone}
                          onChange={(e) => setPromoPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483] bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Bio & Spécialités Notariales
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Ex: Référent successions internationales et ingénierie patrimoniale..."
                          value={promoBio}
                          onChange={(e) => setPromoBio(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483] bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? 'Validation...' : 'Confirmer la promotion et les fonctions'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: Pré-enregistrer un futur collaborateur */}
            {modalTab === 'NEW' && (
              <form onSubmit={handlePreRegister} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                  <strong>Mécanisme d'Auto-Promotion :</strong> Renseignez l'adresse e-mail professionnelle du collaborateur. Dès qu'il créera son compte sur le site avec cet e-mail, le système le reconnaîtra automatiquement et lui ouvrira les accès administrateur sans intervention supplémentaire.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Me Alexandre de Saint-Phalle"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Titre / Fonction Notariale *</label>
                  <select
                    value={form.roleTitle}
                    onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                  >
                    <option value="Notaire Associé">Notaire Associé</option>
                    <option value="Notaire Salarié">Notaire Salarié</option>
                    <option value="Premier Clerc">Premier Clerc</option>
                    <option value="Clerc aux Actes Courants">Clerc aux Actes Courants</option>
                    <option value="Comptable Taxateur">Comptable Taxateur</option>
                    <option value="Secrétaire Notarial">Secrétaire Notarial</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email professionnel (clé de liaison) *</label>
                    <input
                      type="email"
                      required
                      placeholder="a.saintphalle@aurelex-notaires.fr"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ligne directe</label>
                    <input
                      type="tel"
                      placeholder="+33 1 42 68 55 12"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Spécialités</label>
                  <textarea
                    rows={3}
                    placeholder="Spécialiste en ingénierie patrimoniale, droit des affaires et transmission d'entreprises familiales."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Pré-enregistrement...' : 'Pré-enregistrer le collaborateur'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
