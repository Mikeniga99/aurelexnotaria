'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { AppointmentCreateSchema, type AppointmentCreateInput, AppointmentMotif } from '@notaria/contracts';
import { Calendar, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck } from 'lucide-react';

export function AppointmentForm() {
  const t = useTranslations('appointment');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      setSuccessData(result.data);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Impossible de transmettre votre demande. Veuillez vérifier votre connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="liquid-glass-dark rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-2 ring-emerald-400/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-serif text-3xl font-bold text-white">
          {t('successTitle')}
        </h3>

        <p className="text-base text-white/70 max-w-lg mx-auto leading-relaxed">
          {t('successMessage')}
        </p>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1">
          <div>
            <strong className="text-white/80">Numéro de dossier :</strong>{' '}
            <span className="font-mono text-cyan-400">{successData.id}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-medium">
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="liquid-glass-dark rounded-3xl p-8 sm:p-12 space-y-6"
    >
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Nom & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('fullName')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Maître ou M. Jean Dupont"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              errors.fullName ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('email')} *
          </label>
          <input
            type="email"
            placeholder="jean.dupont@exemple.fr"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              errors.email ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Téléphone & Motif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('phone')} *
          </label>
          <input
            type="tel"
            placeholder="01 42 68 00 00"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              errors.phone ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('motif')} *
          </label>
          <select
            {...register('motif')}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0B1938] text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <option value={AppointmentMotif.IMMOBILIER}>{t('motifImmo')}</option>
            <option value={AppointmentMotif.FAMILLE}>{t('motifFamily')}</option>
            <option value={AppointmentMotif.ENTREPRISE}>{t('motifBusiness')}</option>
            <option value={AppointmentMotif.PATRIMOINE}>{t('motifWealth')}</option>
            <option value={AppointmentMotif.AUTRE}>{t('motifOther')}</option>
          </select>
          {errors.motif && (
            <p className="text-xs text-red-400 mt-1">{errors.motif.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Date & TimeSlot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('preferredDate')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Dès que possible ou Semaine du 15 décembre"
            {...register('preferredDate')}
            className={`w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              errors.preferredDate ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'
            }`}
          />
          {errors.preferredDate && (
            <p className="text-xs text-red-400 mt-1">{errors.preferredDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
            {t('preferredTimeSlot')}
          </label>
          <select
            {...register('preferredTimeSlot')}
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0B1938] text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <option value="Matin (09h00 - 12h00)">{t('morning')}</option>
            <option value="Après-midi (14h00 - 18h00)">{t('afternoon')}</option>
            <option value="Indifférent">Indifférent / Selon vos disponibilités</option>
          </select>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">
          {t('message')}
        </label>
        <textarea
          rows={4}
          placeholder="Décrivez brièvement les enjeux ou éléments de votre dossier (ex: vente appartement, donation parent-enfant)..."
          {...register('message')}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 hover:border-white/20"
        />
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/15 text-xs text-white/50 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-cyan-400/70 shrink-0 mt-0.5" />
        <span>{t('disclaimer')}</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-liquid-primary w-full py-4 text-base font-semibold disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('submitting')}</span>
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            <span>{t('submit')}</span>
          </>
        )}
      </button>
    </form>
  );
}
