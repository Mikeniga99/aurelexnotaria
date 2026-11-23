import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Mail, Award, GraduationCap, Scale, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/public/ScrollReveal';

export default function TeamPage() {
  const t = useTranslations('team');

  const members = [
    {
      initials: 'AS',
      name: 'Me Alexandre de Saint-Germain',
      role: 'Notaire Associé Fondateur',
      specialty: 'Droit Immobilier Complexe & Financement Institutionnel',
      degree: 'DSN — Université Paris-Panthéon-Assas',
      email: 'a.saint-germain@aurelex-notaires.fr',
      bio: "Plus de 20 ans d'expérience au service d'investisseurs privés, de familles et d'institutionnels. Spécialiste reconnu des VEFA et des restructurations immobilières de grande envergure.",
      headerBg: 'bg-[#0B1938]',
    },
    {
      initials: 'EV',
      name: 'Me Éléonore Vaneau-Rocher',
      role: 'Notaire Associée',
      specialty: 'Droit de la Famille, Successions & Stratégie Patrimoniale',
      degree: 'Master 2 Droit Notarial & DSN — Université Paris-Dauphine',
      email: 'e.vaneau@aurelex-notaires.fr',
      bio: "Dédiée aux problématiques civiles, familiales et de transmission de patrimoine. Elle accompagne les familles lors de donations-partages transgénérationnelles et de successions à fort enjeu fiscal.",
      headerBg: 'bg-[#6B0F1A]',
    },
    {
      initials: 'TD',
      name: 'Me Thibault Delacroix',
      role: 'Notaire Salarié',
      specialty: "Droit des Sociétés & Transmission d'Entreprises (Pacte Dutreil)",
      degree: 'Master 2 Droit des Affaires & DSN — Paris 1',
      email: 't.delacroix@aurelex-notaires.fr',
      bio: "Expert de l'accompagnement des dirigeants de PME/ETI. Il intervient sur les pactes d'associés, la cession de fonds de commerce et l'optimisation de la transmission d'actifs professionnels.",
      headerBg: 'bg-blue-900',
    },
    {
      initials: 'SM',
      name: 'Mme Sophie Marchand',
      role: 'Premier Clerc de Notaire',
      specialty: 'Coordination des Actes Immobiliers Résidentiels',
      degree: 'Diplôme IMN — Institut des Métiers du Notariat',
      email: 's.marchand@aurelex-notaires.fr',
      bio: "Pilier de l'office depuis plus de 15 ans. Sophie veille à l'instruction rigoureuse des dossiers de vente, au respect des délais légaux et à la liaison avec les services de la publicité foncière.",
      headerBg: 'bg-slate-800',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ── HERO IMMERSIF AVEC IMAGE ── */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden flex flex-col justify-center bg-[#060D1F]">
        {/* Image de fond avec overlay haute lisibilité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/domaine_international.jpg"
            alt="L'Équipe Aurelex Notaires"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-5">
          <ScrollReveal variant="right" delay={150}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              {t('title')}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="right" delay={260}>
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CARTES COLLABORATEURS ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, idx) => (
              <ScrollReveal
                key={idx}
                variant={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 100}
                className="h-full"
              >
                <div
                  className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between"
                >
                  {/* En-tête avec fond sombre uni et contrasté */}
                  <div className={`${member.headerBg} px-8 py-7 text-white relative`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-2 border-white bg-white/10 flex items-center justify-center shrink-0">
                        <span className="font-serif text-2xl font-extrabold text-white">{member.initials}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-blue-200 font-extrabold block">{member.role}</span>
                        <h2 className="font-serif text-2xl font-bold text-white mt-0.5 leading-tight">{member.name}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Corps de la carte */}
                  <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-2 pb-4 border-b border-slate-200">
                        <div className="flex items-start gap-2.5 text-xs text-slate-900 font-bold">
                          <Award className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                          <span>{member.specialty}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                          <GraduationCap className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          <span>{member.degree}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed font-normal">{member.bio}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <a href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </a>
                      <Link href="/rendez-vous"
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 transition-all active:scale-[0.96] bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Rendez-vous</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="blur" delay={200}>
            <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-5 text-center text-xs text-slate-600 max-w-2xl mx-auto shadow-xs font-medium">
              Conformément au sujet du test technique, les noms, profils et adresses des collaborateurs sont entièrement fictifs.
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
