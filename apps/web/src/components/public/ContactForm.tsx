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
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-aurelex-champagne/40 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-aurelex-bordeaux">
          {t('successTitle')}
        </h3>
        <p className="text-base text-aurelex-ebene/80 max-w-lg mx-auto">
          {t('successMessage')}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="inline-flex items-center gap-2 bg-aurelex-bordeaux text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-aurelex-bordeaux-hover transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-8 sm:p-12 border border-aurelex-beige-border shadow-xl space-y-6"
    >
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
          {t('fullName')} *
        </label>
        <input
          type="text"
          placeholder="Jean Dupont"
          {...register('fullName')}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
            errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
          }`}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            Email *
          </label>
          <input
            type="email"
            placeholder="jean.dupont@exemple.fr"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
              errors.email ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            Téléphone (facultatif)
          </label>
          <input
            type="tel"
            placeholder="01 42 68 00 00"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-xl border border-aurelex-beige-border bg-aurelex-ivoire/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
          {t('subject')} *
        </label>
        <input
          type="text"
          placeholder="Ex : Demande de renseignements - Succession"
          {...register('subject')}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
            errors.subject ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
          }`}
        />
        {errors.subject && (
          <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
          {t('message')} *
        </label>
        <textarea
          rows={5}
          placeholder="Votre message à l'attention de nos notaires..."
          {...register('message')}
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
            errors.message ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-base font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-aurelex-champagne-light" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Mail className="w-5 h-5 text-aurelex-champagne-light" />
            <span>{t('send')}</span>
          </>
        )}
      </button>
    </form>
  );
}
