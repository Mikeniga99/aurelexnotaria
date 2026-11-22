'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ContactMessageCreateSchema, type ContactMessageCreateInput } from '@notaria/contracts';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageCreateInput>({
    resolver: zodResolver(ContactMessageCreateSchema),
  });

  const onSubmit = async (data: ContactMessageCreateInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/v1/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || 'Erreur lors de l’envoi de votre message.');
      }

      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Impossible d’envoyer votre message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="liquid-glass-dark rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-white">{t('successTitle')}</h3>
        <p className="text-base text-white/60 max-w-lg mx-auto">{t('successMessage')}</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-liquid-primary inline-flex"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="liquid-glass-dark rounded-3xl p-8 sm:p-12 space-y-6"
    >
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
          {t('fullName')} *
        </label>
        <input
          type="text"
          placeholder="Jean Dupont"
          {...register('fullName')}
          className={`w-full px-4 py-3.5 rounded-xl border bg-white/5 text-white placeholder-white/25 text-sm transition-all outline-none focus:ring-2 focus:ring-aurelex-blue/60 ${
            errors.fullName ? 'border-red-400/50' : 'border-white/15 focus:border-cyan-400/50'
          }`}
        />
        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Email *</label>
          <input
            type="email"
            placeholder="jean.dupont@exemple.fr"
            {...register('email')}
            className={`w-full px-4 py-3.5 rounded-xl border bg-white/5 text-white placeholder-white/25 text-sm transition-all outline-none focus:ring-2 focus:ring-aurelex-blue/60 ${
              errors.email ? 'border-red-400/50' : 'border-white/15 focus:border-cyan-400/50'
            }`}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Téléphone (facultatif)</label>
          <input
            type="tel"
            placeholder="01 42 68 00 00"
            {...register('phone')}
            className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/25 text-sm transition-all outline-none focus:ring-2 focus:ring-aurelex-blue/60 focus:border-cyan-400/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">{t('subject')} *</label>
        <input
          type="text"
          placeholder="Ex : Demande de renseignements - Succession"
          {...register('subject')}
          className={`w-full px-4 py-3.5 rounded-xl border bg-white/5 text-white placeholder-white/25 text-sm transition-all outline-none focus:ring-2 focus:ring-aurelex-blue/60 ${
            errors.subject ? 'border-red-400/50' : 'border-white/15 focus:border-cyan-400/50'
          }`}
        />
        {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">{t('message')} *</label>
        <textarea
          rows={5}
          placeholder="Votre message à l'attention de nos notaires..."
          {...register('message')}
          className={`w-full px-4 py-3.5 rounded-xl border bg-white/5 text-white placeholder-white/25 text-sm transition-all outline-none focus:ring-2 focus:ring-aurelex-blue/60 resize-none ${
            errors.message ? 'border-red-400/50' : 'border-white/15 focus:border-cyan-400/50'
          }`}
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-liquid-primary w-full justify-center disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-cyan-300" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Mail className="w-5 h-5 text-cyan-300" />
            <span>{t('send')}</span>
          </>
        )}
      </button>
    </form>
  );
}
