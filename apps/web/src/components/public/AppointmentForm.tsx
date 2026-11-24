'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { AppointmentCreateSchema, type AppointmentCreateInput, AppointmentMotif } from '@notaria/contracts';
import { Calendar, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck } from 'lucide-react';
import { NotarialActLoader } from './NotarialActLoader';

export function AppointmentForm() {
  const t = useTranslations('appointment');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActLoading, setIsActLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentCreateInput>({
    resolver: zodResolver(AppointmentCreateSchema),
    defaultValues: {
      motif: AppointmentMotif.IMMOBILIER,
      preferredTimeSlot: 'Matin (09h00 - 12h00)',
    },
  });

  const onSubmit = async (data: AppointmentCreateInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || 'Une erreur est survenue lors de la transmission.');
      }

      // Déclenche l'animation notariée du Parchemin & Sceau
      setIsActLoading(true);

      setTimeout(() => {
        setIsActLoading(false);
        setSuccessData(result.data);
        reset();
      }, 2100);
    } catch (err: any) {
      setErrorMessage(err.message || 'Impossible de transmettre votre demande. Veuillez vérifier votre connexion.');
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-4 ring-emerald-100">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-serif text-3xl font-bold text-slate-900">
          {t('successTitle')}
        </h3>

        <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          {t('successMessage')}
        </p>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <div>
            <strong className="text-slate-800">Numéro de dossier :</strong>{' '}
            <span className="font-mono text-blue-600 font-bold">{successData.id}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-amber-700 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Statut : En attente de confirmation par l'étude</span>
          </div>
        </div>

        <button
          onClick={() => setSuccessData(null)}
          className="btn-liquid-secondary text-sm font-semibold px-6 py-2.5 rounded-xl"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ── NOTARIAL ACT LOADING OVERLAY (CONCEPT A) ── */}
      <NotarialActLoader
        isOpen={isActLoading}
        title="Officialisation de votre Demande"
        subtitle="Enregistrement de la minute au greffe de l'office"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-xl space-y-6"
      >
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Nom & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('fullName')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Me ou M. Fleury ACHILLE"
            {...register('fullName')}
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-slate-950 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-blue-700'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 font-semibold mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('email')} *
          </label>
          <input
            type="email"
            placeholder="fleury.achille@exemple.fr"
            {...register('email')}
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-slate-950 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              errors.email ? 'border-red-500' : 'border-slate-300 focus:border-blue-700'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 font-semibold mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Téléphone & Motif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('phone')} *
          </label>
          <input
            type="tel"
            placeholder="01 42 68 00 00"
            {...register('phone')}
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-slate-950 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-blue-700'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-600 font-semibold mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('motif')} *
          </label>
          <select
            {...register('motif')}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-300 bg-white text-slate-950 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700"
          >
            <option value={AppointmentMotif.IMMOBILIER}>{t('motifImmo')}</option>
            <option value={AppointmentMotif.FAMILLE}>{t('motifFamily')}</option>
            <option value={AppointmentMotif.ENTREPRISE}>{t('motifBusiness')}</option>
            <option value={AppointmentMotif.PATRIMOINE}>{t('motifWealth')}</option>
            <option value={AppointmentMotif.AUTRE}>{t('motifOther')}</option>
          </select>
          {errors.motif && (
            <p className="text-xs text-red-600 font-semibold mt-1">{errors.motif.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Date & TimeSlot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('preferredDate')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Dès que possible ou Semaine du 15 décembre"
            {...register('preferredDate')}
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-slate-950 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${
              errors.preferredDate ? 'border-red-500' : 'border-slate-300 focus:border-blue-700'
            }`}
          />
          {errors.preferredDate && (
            <p className="text-xs text-red-600 font-semibold mt-1">{errors.preferredDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
            {t('preferredTimeSlot')}
          </label>
          <select
            {...register('preferredTimeSlot')}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-300 bg-white text-slate-950 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700"
          >
            <option value="Matin (09h00 - 12h00)">{t('morning')}</option>
            <option value="Après-midi (14h00 - 18h00)">{t('afternoon')}</option>
            <option value="Indifférent">Indifférent / Selon vos disponibilités</option>
          </select>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
          {t('message')}
        </label>
        <textarea
          rows={4}
          placeholder="Décrivez brièvement les enjeux ou éléments de votre dossier (ex: vente appartement, donation parent-enfant)..."
          {...register('message')}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-300 bg-white text-slate-950 placeholder-slate-400 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 resize-none"
        />
      </div>

      {/* Submit Button Centré & Harmonieux */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer min-w-[180px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white shrink-0" />
              <span>{t('submitting')}</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-white shrink-0" />
              <span>{t('submit')}</span>
            </>
          )}
        </button>
      </div>
    </form>
    </>
  );
}
