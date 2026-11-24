'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Calendar,
  MessageSquare,
  Calculator,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Clock,
  FileCheck2,
  Phone,
  Home,
  FolderLock,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
} from 'lucide-react';
import { NotarialActLoader } from '@/components/public/NotarialActLoader';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function EspaceClientPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('PIECE_IDENTITE');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fetchUserDocs = async () => {
    setDocsLoading(true);
    try {
      const res = await fetch('/api/v1/documents');
      const json = await res.json();
      if (json.success) {
        setDocuments(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDocsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/v1/auth/me')
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        const data = await res.json();
        setUser(data.data);
        fetchUserDocs();
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleSimulatedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);

    try {
      const res = await fetch('/api/v1/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalName: file.name,
          category: selectedCategory,
          size: file.size,
          mimeType: file.type || 'application/pdf',
          url: '/documents/demo.pdf',
        }),
      });

      const json = await res.json();
      if (json.success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
        fetchUserDocs();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      router.push('/admin/login');
    }, 1800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col">
      {/* ── ANIMATION BALANCE & MAILLET LORS DE LA DÉCONNEXION CLIENT ── */}
      <NotarialActLoader
        isOpen={isLoggingOut}
        title="Fermeture de l'Espace Client"
        subtitle="Déconnexion sécurisée de votre dossier personnel"
      />
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/fr" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D4B483] bg-white p-0.5 shadow-sm">
              <Image src="/images/Logo_AURELEX.png" alt="Aurelex Logo" fill className="object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#0B1938] tracking-wide block">
                AURELEX NOTAIRES
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4B483] font-bold block -mt-1">
                Espace Client
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-slate-700">
                {user.firstName} {user.lastName}
              </span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Client
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-700 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3.5 py-2 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Welcome Hero */}
        <div className="bg-gradient-to-br from-[#0B1938] via-[#1a2d54] to-[#0B1938] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#F5E6CC] px-3 py-1 rounded-full text-xs font-semibold">
              <User className="w-3.5 h-3.5 text-[#D4B483]" />
              <span>Dossier Personnel Sécurisé</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              Bonjour, {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Bienvenue sur votre espace client officiel Aurelex Notaires. Retrouvez vos démarches, demandez un rendez-vous en ligne ou transmettez vos interrogations juridiques à nos notaires.
            </p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/fr/rendez-vous"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Prendre un rendez-vous
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Réservez un créneau en étude ou en visioconférence pour votre projet immobilier ou familial.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Réserver maintenant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/fr/contact"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Écrire à l'office notarial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Posez une question sur votre dossier ou sollicitez un renseignement administratif confidentiel.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Envoyer un message</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/fr/expertises"
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Simuler mes frais d'acquisition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimez le barème légal et les droits de mutation réglementés selon le Code de commerce.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Lancer le simulateur</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Section: Pièces Justificatives & GED Client */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 overflow-hidden">
          {/* En-tête de section */}
          <div className="flex items-start sm:items-center gap-3.5 border-b border-slate-100 pb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <FolderLock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Dépôt & Suivi de vos Pièces Justificatives (GED)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Transmettez vos documents officiels directement à votre notaire en toute sécurité (chiffrement et conformité RGPD).
              </p>
            </div>
          </div>

          {/* Zone d'action de dépôt de fichier (Responsive & Cadrée) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
            <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Ajouter un nouveau justificatif à votre dossier :</span>
              <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">Formats acceptés : PDF, PNG, JPG (max 20 Mo)</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex-1 min-w-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#D4B483] shadow-sm truncate"
                >
                  <option value="PIECE_IDENTITE">Pièce d'Identité (CNI / Passeport)</option>
                  <option value="ETAT_CIVIL">Livret de Famille / État Civil</option>
                  <option value="DOMICILE">Justificatif de Domicile (-3 mois)</option>
                  <option value="IMMOBILIER">Titre de Propriété / Plan</option>
                  <option value="FINANCES">Relevé Bancaire / Avis d'Impôt</option>
                  <option value="AUTRE">Autre Document Juridique</option>
                </select>
              </div>

              <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer shrink-0">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Upload className="w-4 h-4 text-[#D4B483]" />
                )}
                <span>{uploading ? 'Transmission...' : 'Déposer un fichier'}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleSimulatedUpload}
                  disabled={uploading}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
              </label>
            </div>
          </div>

          {uploadSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Votre document a été transmis avec succès et mis à disposition de l'office notarial.</span>
            </div>
          )}

          {/* List of Documents */}
          <div className="space-y-3">
            {docsLoading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1 text-blue-700" />
                Chargement de vos documents...
              </div>
            ) : documents.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                Aucun document n'a encore été déposé pour votre compte. Utilisez le bouton ci-dessus pour transmettre votre pièce d'identité ou vos justificatifs.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-700 shrink-0" />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">{doc.originalName}</div>
                        <div className="text-[11px] text-slate-400">
                          {doc.category} • Déposé le {new Date(doc.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {doc.status === 'VERIFIED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Conforme
                        </span>
                      )}
                      {doc.status === 'REJECTED' && (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
                            <AlertCircle className="w-3 h-3 text-red-600" /> À remplacer
                          </span>
                          {doc.rejectionReason && (
                            <div className="text-[10px] text-red-600 italic">{doc.rejectionReason}</div>
                          )}
                        </div>
                      )}
                      {doc.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" /> En cours d'examen
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Informative Status Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <FileCheck2 className="w-5 h-5 text-blue-700" />
            <h2 className="font-serif text-lg font-bold text-slate-900">
              Suivi de vos démarches notariales
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lorsque vous soumettez une demande de rendez-vous ou un formulaire avec votre adresse e-mail <strong>({user.email})</strong>, nos notaires et juristes associent automatiquement votre demande à votre dossier. Vous recevrez une notification par e-mail et par téléphone dès la confirmation de votre créneau.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-3">
            <Phone className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Un besoin urgent ? Contactez le standard de l'étude au <strong>+33 (0)1 42 68 55 00</strong> (du lundi au vendredi, 9h-19h).</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Aurelex Notaires — Espace Sécurisé Conforme aux Normes Notariales.</p>
      </footer>
    </div>
  );
}
