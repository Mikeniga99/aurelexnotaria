import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Mail, Award, GraduationCap, Scale, Calendar } from 'lucide-react';

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
      color: 'from-blue-700 to-indigo-900',
    },
    {
      initials: 'EV',
      name: 'Me Éléonore Vaneau-Rocher',
      role: 'Notaire Associée',
      specialty: 'Droit de la Famille, Successions & Stratégie Patrimoniale',
      degree: 'Master 2 Droit Notarial & DSN — Université Paris-Dauphine',
      email: 'e.vaneau@aurelex-notaires.fr',
      bio: "Dédiée aux problématiques civiles, familiales et de transmission de patrimoine. Elle accompagne les familles lors de donations-partages transgénérationnelles et de successions à fort enjeu fiscal.",
      color: 'from-[#6B0F1A] to-[#881337]',
    },
    {
      initials: 'TD',
      name: 'Me Thibault Delacroix',
      role: 'Notaire Salarié',
      specialty: "Droit des Sociétés & Transmission d'Entreprises (Pacte Dutreil)",
      degree: 'Master 2 Droit des Affaires & DSN — Paris 1',
      email: 't.delacroix@aurelex-notaires.fr',
      bio: "Expert de l'accompagnement des dirigeants de PME/ETI. Il intervient sur les pactes d'associés, la cession de fonds de commerce et l'optimisation de la transmission d'actifs professionnels.",
      color: 'from-blue-800 to-slate-900',
    },
    {
      initials: 'SM',
      name: 'Mme Sophie Marchand',
      role: 'Premier Clerc de Notaire',
      specialty: 'Coordination des Actes Immobiliers Résidentiels',
      degree: 'Diplôme IMN — Institut des Métiers du Notariat',
      email: 's.marchand@aurelex-notaires.fr',
      bio: "Pilier de l'office depuis plus de 15 ans. Sophie veille à l'instruction rigoureuse des dossiers de vente, au respect des délais légaux et à la liaison avec les services de la publicité foncière.",
      color: 'from-indigo-800 to-[#6B0F1A]',
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">

      {/* ── HERO avec image fond ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/etude_paris.jpg" alt="L'équipe Aurelex" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/94 via-white/80 to-[#F8FAFC]" />
        </div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-blue-700 animate-fade-in-up">
            <span className="w-8 h-px bg-blue-600/40" />
            <span>L'Équipe</span>
            <span className="w-8 h-px bg-blue-600/40" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── MEMBRES CLAIR ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* En-tête dégradée de prestige */}
                <div className={`bg-gradient-to-br ${member.color} px-8 py-7 relative overflow-hidden text-white`}>
                  <div className="absolute top-0 right-0 opacity-10">
                    <Scale className="w-28 h-28 text-white" />
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
                      <span className="font-serif text-xl font-bold text-white">{member.initials}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-blue-100 font-bold block">{member.role}</span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 leading-tight">{member.name}</h2>
                    </div>
                  </div>
                </div>

                {/* Corps */}
                <div className="p-7 space-y-5">
                  <div className="space-y-2.5 pb-4 border-b border-slate-100">
                    <div className="flex items-start gap-2.5 text-xs text-slate-800">
                      <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-semibold">{member.specialty}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-500">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{member.degree}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contacter</span>
                    </a>
                    <Link href="/rendez-vous"
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Prendre rendez-vous</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-5 text-center text-xs text-slate-500 max-w-2xl mx-auto shadow-xs">
            Conformément au cahier des charges du projet de simulation, les noms, profils et adresses des collaborateurs sont entièrement fictifs.
          </div>
        </div>
      </section>
    </div>
  );
}
