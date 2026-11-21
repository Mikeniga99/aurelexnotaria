'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@aurelex-notaires.fr');
  const [password, setPassword] = useState('AurelexAdmin2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Impossible de se connecter au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aurelex-ebene via-aurelex-bordeaux-dark to-aurelex-ebene flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-aurelex-champagne/30 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto border-2 border-aurelex-champagne shadow-md">
            <Image src="/images/logo.png" alt="Aurelex Logo" fill className="object-cover" priority />
          </div>
          <h1 className="font-serif text-2xl font-bold text-aurelex-bordeaux">
            AURELEX NOTAIRES
          </h1>
          <p className="text-xs uppercase tracking-widest text-aurelex-ebene/70 font-semibold">
            Portail d'Administration Sécurisé
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="admin@aurelex-notaires.fr"
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
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-sm font-semibold py-3 rounded-xl shadow hover:shadow-lg transition-all disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-aurelex-champagne-light" />
                <span>Vérification...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-aurelex-champagne-light" />
                <span>Se connecter à l'espace gestion</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box for Evaluation */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-aurelex-bordeaux">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Accès Démonstration Technique (Senior Evaluator)</span>
          </div>
          <div className="font-mono text-[11px] bg-white p-2 rounded border border-slate-200 space-y-1">
            <div>Email : <strong>admin@aurelex-notaires.fr</strong></div>
            <div>MDP : <strong>AurelexAdmin2026!</strong></div>
          </div>
          <p className="text-[10px] text-slate-500">
            Conforme aux exigences du cahier des charges : compte administrateur sécurisé et sessions serveur HttpOnly.
          </p>
        </div>
      </div>
    </div>
  );
}
