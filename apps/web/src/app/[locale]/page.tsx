import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Calendar,
  ChevronRight,
  ShieldCheck,
  Scale,
  Award,
  FileCheck2,
  Users2,
  Lock,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { NotaryFeeSimulator } from '@/components/public/NotaryFeeSimulator';
import { ExpertisesShowcase } from '@/components/public/ExpertisesShowcase';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION MAJESTUEUSE */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-aurelex-beige-border">
        {/* Subtle luminous halo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-aurelex-champagne/15 via-aurelex-bordeaux/10 to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Notarial Seal Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-aurelex-champagne/50 shadow-sm text-aurelex-bordeaux text-xs font-bold uppercase tracking-[0.2em]">
                <Scale className="w-4 h-4 text-aurelex-champagne" />
                <span>Office Notarial · Paris Place Vendôme</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-aurelex-bordeaux leading-[1.08] tracking-tight">
                  <span className="italic font-normal block font-serif text-aurelex-ebene">
                    L'Excellence de l'Acte,
                  </span>
                  L'Éternité du Droit.
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-aurelex-champagne via-aurelex-champagne-light to-transparent rounded-full" />
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-aurelex-ebene/80 max-w-2xl leading-relaxed font-normal">
                Officiers publics investis d'une mission de confiance par l'État, les notaires associés d'<strong>Aurelex</strong> garantissent la sécurité absolue, l'authenticité et la pérennité de vos engagements civils, familiaux et d'entreprise.
              </p>

              {/* Fast-Track Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-aurelex-bordeaux via-aurelex-bordeaux-hover to-aurelex-bordeaux-dark text-white text-sm uppercase tracking-wider font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-aurelex-champagne/40"
                >
                  <Calendar className="w-4 h-4 text-aurelex-champagne-light" />
                  <span>Solliciter une consultation</span>
                </Link>

                <Link
                  href="/expertises"
                  className="inline-flex items-center justify-center gap-2 bg-white text-aurelex-bordeaux border border-aurelex-beige-border hover:border-aurelex-champagne text-sm uppercase tracking-wider font-bold px-7 py-4 rounded-xl shadow-sm hover:bg-aurelex-ivoire transition-all"
                >
                  <span>Nos domaines d'action</span>
                  <ChevronRight className="w-4 h-4 text-aurelex-champagne" />
                </Link>
              </div>

              {/* Quick Notarial Fast-Track Pills */}
              <div className="pt-4 border-t border-aurelex-beige-border">
                <span className="text-[11px] font-bold uppercase tracking-widest text-aurelex-ebene/60 block mb-3">
                  Démarches prioritaires :
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/rendez-vous"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-aurelex-beige-border hover:border-aurelex-champagne text-xs font-semibold text-aurelex-ebene hover:text-aurelex-bordeaux transition-all shadow-sm"
                  >
                    Achat & Vente Immobilière
                  </Link>
                  <Link
                    href="/rendez-vous"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-aurelex-beige-border hover:border-aurelex-champagne text-xs font-semibold text-aurelex-ebene hover:text-aurelex-bordeaux transition-all shadow-sm"
                  >
                    Donation-Partage & Succession
                  </Link>
                  <Link
                    href="/rendez-vous"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-aurelex-beige-border hover:border-aurelex-champagne text-xs font-semibold text-aurelex-ebene hover:text-aurelex-bordeaux transition-all shadow-sm"
                  >
                    Pacte Dutreil & Statuts SAS
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Heraldic Seal & Crest Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white to-aurelex-beige/40 shadow-2xl border-2 border-aurelex-champagne/40 flex flex-col items-center text-center space-y-6">
                {/* Gold Crest Medallion */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-2xl hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="Aurelex Heraldic Emblem"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-3xl font-bold text-aurelex-bordeaux tracking-tight">
                    Aurelex Notaires
                  </h3>
                  <p className="text-xs tracking-[0.25em] uppercase text-aurelex-champagne-hover font-bold">
                    Iustitia · Fides · Firmitas
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-aurelex-beige-border grid grid-cols-2 gap-4 text-left text-xs">
                  <div className="p-3 rounded-xl bg-white/80 border border-aurelex-beige-border">
                    <span className="text-[10px] uppercase font-bold text-aurelex-ebene/60 block">Résidence</span>
                    <strong className="text-aurelex-bordeaux font-serif text-sm">Paris Vendôme</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-aurelex-beige-border">
                    <span className="text-[10px] uppercase font-bold text-aurelex-ebene/60 block">Délégation</span>
                    <strong className="text-aurelex-bordeaux font-serif text-sm">Puissance Publique</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/80 px-4 py-2 rounded-xl border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Actes authentiques à force probante et exécutoire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LES 4 PILIERS DE L'OFFICE NOTARIAL (INTERACTIVE SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-aurelex-champagne" />
            <span>Champs d'Intervention Juridique</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-aurelex-bordeaux">
            Les Quatre Piliers de l'Office
          </h2>
          <div className="w-20 h-1 bg-aurelex-champagne mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-aurelex-ebene/80">
            Une expertise notariale de premier plan, alliant haute technicité juridique et confidentialité absolue.
          </p>
        </div>

        <ExpertisesShowcase />
      </section>

      {/* 3. SIMULATEUR RÉGLEMENTÉ DE FRAIS IMMOBILIERS (LEAD GENERATION TOOL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NotaryFeeSimulator />
      </section>

      {/* 4. LE MANIFESTE DU NOTARIAT (DEONTOLOGY & HERITAGE) */}
      <section className="bg-gradient-to-r from-aurelex-ebene via-aurelex-bordeaux-dark to-aurelex-ebene text-white py-20 border-y-2 border-aurelex-champagne/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-aurelex-champagne font-bold block">
                Tradition Législative & Serment
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                « Les notaires sont les officiers publics établis pour recevoir tous les actes et contrats... »
              </h2>

              <p className="text-base text-aurelex-champagne-soft/90 leading-relaxed font-normal">
                Extrait fondateur de la loi du 25 ventôse an XI régissant le statut des notaires de France. 
                À l’office <strong>Aurelex Notaires</strong>, ce texte n'est pas un vestige, c'est notre boussole quotidienne : assurer la certitude absolue de la date, l’indiscutabilité du contenu et la sauvegarde des droits des personnes et des patrimoines.
              </p>

              <div className="pt-4 flex flex-wrap gap-6 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-aurelex-champagne" />
                  <span>Délégation par arrêté du Garde des Sceaux</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-aurelex-champagne" />
                  <span>Contrôle régulier par la Chambre des Notaires de Paris</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-aurelex-champagne/30 p-8 rounded-3xl backdrop-blur-md space-y-4 text-center">
              <div className="relative w-16 h-16 rounded-full mx-auto border-2 border-aurelex-champagne overflow-hidden">
                <Image src="/images/logo.png" alt="Aurelex Seal" fill className="object-cover" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Me Alexandre de Saint-Germain</h4>
              <p className="text-xs uppercase tracking-widest text-aurelex-champagne font-semibold">
                Notaire Associé Fondateur
              </p>
              <div className="ornament-line my-4" />
              <p className="text-xs text-white/80 italic font-serif leading-relaxed">
                « Nous sommes les gardiens de vos volontés et les bâtisseurs de votre tranquillité d'esprit. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-br from-aurelex-bordeaux to-aurelex-bordeaux-dark text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl border-2 border-aurelex-champagne/40 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Initier Votre Dossier Notarial
            </h2>
            <p className="text-sm sm:text-base text-aurelex-champagne-soft leading-relaxed">
              Nos notaires et premiers clercs vous reçoivent au cabinet de la Place Vendôme ou organisent des séances d'actes par visioconférence sécurisée certifiée.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-aurelex-champagne to-aurelex-champagne-light text-aurelex-ebene font-bold text-sm uppercase tracking-wider px-9 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Transmettre votre demande de rendez-vous</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
