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
      <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-aurelex-champagne/40 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-serif text-3xl font-bold text-aurelex-bordeaux">
          {t('successTitle')}
        </h3>

        <p className="text-base text-aurelex-ebene/80 max-w-lg mx-auto leading-relaxed">
          {t('successMessage')}
        </p>

        <div className="p-4 rounded-xl bg-aurelex-ivoire border border-aurelex-beige-border text-xs text-aurelex-ebene/70 space-y-1">
          <div>
            <strong>Numéro de dossier :</strong> <span className="font-mono text-aurelex-bordeaux">{successData.id}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-amber-700 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Statut : En attente de confirmation par l'étude</span>
          </div>
        </div>

        <button
          onClick={() => setSuccessData(null)}
          className="inline-flex items-center gap-2 bg-aurelex-bordeaux text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-aurelex-bordeaux-hover transition-colors"
        >
          Nouvelle demande
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

      {/* Row 1: Nom & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('fullName')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Maître ou M. Jean Dupont"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
              errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('email')} *
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
      </div>

      {/* Row 2: Téléphone & Motif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('phone')} *
          </label>
          <input
            type="tel"
            placeholder="01 42 68 00 00"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
              errors.phone ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('motif')} *
          </label>
          <select
            {...register('motif')}
            className="w-full px-4 py-3 rounded-xl border border-aurelex-beige-border bg-aurelex-ivoire/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne text-aurelex-ebene"
          >
            <option value={AppointmentMotif.IMMOBILIER}>{t('motifImmo')}</option>
            <option value={AppointmentMotif.FAMILLE}>{t('motifFamily')}</option>
            <option value={AppointmentMotif.ENTREPRISE}>{t('motifBusiness')}</option>
            <option value={AppointmentMotif.PATRIMOINE}>{t('motifWealth')}</option>
            <option value={AppointmentMotif.AUTRE}>{t('motifOther')}</option>
          </select>
          {errors.motif && (
            <p className="text-xs text-red-500 mt-1">{errors.motif.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Date & TimeSlot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('preferredDate')} *
          </label>
          <input
            type="text"
            placeholder="Ex : Dès que possible ou Semaine du 15 décembre"
            {...register('preferredDate')}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne ${
              errors.preferredDate ? 'border-red-500 bg-red-50/30' : 'border-aurelex-beige-border bg-aurelex-ivoire/30'
            }`}
          />
          {errors.preferredDate && (
            <p className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
            {t('preferredTimeSlot')}
          </label>
          <select
            {...register('preferredTimeSlot')}
            className="w-full px-4 py-3 rounded-xl border border-aurelex-beige-border bg-aurelex-ivoire/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne text-aurelex-ebene"
          >
            <option value="Matin (09h00 - 12h00)">{t('morning')}</option>
            <option value="Après-midi (14h00 - 18h00)">{t('afternoon')}</option>
            <option value="Indifférent">Indifférent / Selon vos disponibilités</option>
          </select>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-aurelex-ebene/70 mb-2">
          {t('message')}
        </label>
        <textarea
          rows={4}
          placeholder="Décrivez brièvement les enjeux ou éléments de votre dossier (ex: vente appartement, donation parent-enfant)..."
          {...register('message')}
          className="w-full px-4 py-3 rounded-xl border border-aurelex-beige-border bg-aurelex-ivoire/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-aurelex-champagne"
        />
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-aurelex-beige/40 border border-aurelex-beige-border text-xs text-aurelex-ebene/70 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-aurelex-champagne shrink-0 mt-0.5" />
        <span>{t('disclaimer')}</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aurelex-bordeaux to-aurelex-bordeaux-hover text-white text-base font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-aurelex-bordeaux-hover hover:to-aurelex-bordeaux-dark transition-all transform active:scale-[0.99] disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-aurelex-champagne-light" />
            <span>{t('submitting')}</span>
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5 text-aurelex-champagne-light" />
            <span>{t('submit')}</span>
          </>
        )}
      </button>
    </form>
  );
}
