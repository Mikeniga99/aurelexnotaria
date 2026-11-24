'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  ShieldCheck,
  KeyRound,
  User,
  UserPlus,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { NotarialActLoader } from '@/components/public/NotarialActLoader';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  useEffect(() => {
    const qMode = searchParams.get('mode');
    if (qMode === 'register') setMode('register');
    else if (qMode === 'login') setMode('login');
  }, [searchParams]);

  // Login form state
  const [email, setEmail] = useState('admin@aurelex-notaires.fr');
  const [password, setPassword] = useState('AurelexAdmin2026!');

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Notarial Act Loading State (Concept A: Parchemin & Signature)
  const [showActLoader, setShowActLoader] = useState(false);
  const [actTitle, setActTitle] = useState("Authentification de l'Accréditation");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || 'Identifiants de connexion invalides.');
      }

      // Trigger majestic notarial loading state
      const userRole = data.data?.role;
      setActTitle(
        userRole === 'VISITOR'
          ? "Ouverture de votre Espace Citoyen Sécurisé"
          : "Authentification Notariale • Accès Greffe & Minutes"
      );
      setShowActLoader(true);

      // Smooth transition after seal stamping completes (~2s)
      setTimeout(() => {
        if (userRole === 'VISITOR' || !userRole) {
          router.push('/espace-client');
        } else {
          router.push('/admin');
        }
      }, 2100);
    } catch (err: any) {
      setError(err.message || 'Impossible de se connecter au serveur.');
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || 'Erreur lors de la création du compte.');
      }

      // Trigger notarial act creation state
      setActTitle("Création du Dossier Notarial & Sceau Officiel");
      setShowActLoader(true);

      setTimeout(() => {
        if (data.data?.role === 'VISITOR' || !data.data?.role) {
          router.push('/espace-client');
        } else {
          router.push('/admin');
        }
      }, 2100);
    } catch (err: any) {
      setError(err.message || 'Impossible de créer le compte.');
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/fr');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1938] via-[#102146] to-[#060D1F] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* ── NOTARIAL ACT LOADING OVERLAY (CONCEPT A) ── */}
      <NotarialActLoader isOpen={showActLoader} title={actTitle} />

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-aurelex-champagne/30 space-y-6 relative">
        {/* Top Back Navigation inside the card */}
        <div>
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3.5 py-1.5 rounded-full transition-all active:scale-95 group cursor-pointer"
            title="Retourner à la page précédente"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-700 transition-transform group-hover:-translate-x-0.5" />
            <span>Retour</span>
          </button>
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-2.5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-[#D4B483]/50 mx-auto bg-white p-1">
            <Image
              src="/images/Logo_AURELEX.png"
              alt="Aurelex Notaires Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1938] tracking-wider">
            AURELEX NOTAIRES
          </h1>
          <p className="text-[11px] uppercase tracking-widest text-[#0B1938]/70 font-semibold">
            Office Notarial de Paris
          </p>
        </div>

        {/* Tab Switcher: Connexion / Inscription */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2.5 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2.5 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Créer un compte
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode Connexion */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                  placeholder="votre-email@exemple.fr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-white" />
                  <span>Se connecter</span>
                </>
              )}
            </button>

          </form>
        )}

        {/* Mode Inscription (Ouvert à tous) */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                    placeholder="Fleury"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                  placeholder="ACHILLE"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                  placeholder="fleury.achille@exemple.fr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Mot de passe (8 caractères min.)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aurelex-champagne transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>


            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Création du compte...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-white" />
                  <span>Créer mon compte</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default function UnifiedAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-aurelex-champagne" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
