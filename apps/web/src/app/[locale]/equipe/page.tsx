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
      color: 'from-blue-900 to-aurelex-navy-deep',
    },
    {
      initials: 'EV',
      name: 'Me Éléonore Vaneau-Rocher',
      role: 'Notaire Associée',
      specialty: 'Droit de la Famille, Successions & Stratégie Patrimoniale',
      degree: 'Master 2 Droit Notarial & DSN — Université Paris-Dauphine',
      email: 'e.vaneau@aurelex-notaires.fr',
      bio: "Dédiée aux problématiques civiles, familiales et de transmission de patrimoine. Elle accompagne les familles lors de donations-partages transgénérationnelles et de successions à fort enjeu fiscal.",
      color: 'from-aurelex-bordeaux-dark to-aurelex-navy-deep',
    },
    {
      initials: 'TD',
      name: 'Me Thibault Delacroix',
      role: 'Notaire Salarié',
      specialty: "Droit des Sociétés & Transmission d'Entreprises (Pacte Dutreil)",
      degree: 'Master 2 Droit des Affaires & DSN — Paris 1',
      email: 't.delacroix@aurelex-notaires.fr',
      bio: "Expert de l'accompagnement des dirigeants de PME/ETI. Il intervient sur les pactes d'associés, la cession de fonds de commerce et l'optimisation de la transmission d'actifs professionnels.",
      color: 'from-blue-900 to-aurelex-navy-deep',
    },
    {
      initials: 'SM',
      name: 'Mme Sophie Marchand',
      role: 'Premier Clerc de Notaire',
      specialty: 'Coordination des Actes Immobiliers Résidentiels',
      degree: 'Diplôme IMN — Institut des Métiers du Notariat',
      email: 's.marchand@aurelex-notaires.fr',
      bio: "Pilier de l'office depuis plus de 15 ans. Sophie veille à l'instruction rigoureuse des dossiers de vente, au respect des délais légaux et à la liaison avec les services de la publicité foncière.",
      color: 'from-aurelex-bordeaux-dark to-aurelex-navy-deep',
    },
  ];

  return (
    <div className="bg-aurelex-navy-deep">

      {/* ── HERO avec image fond ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/etude_paris.jpg" alt="L'équipe Aurelex" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-aurelex-navy-deep/80 via-aurelex-navy-deep/65 to-aurelex-navy-deep" />
        </div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.6) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400 animate-fade-in-up">
            <span className="w-8 h-px bg-cyan-400/60" />
            <span>L'Équipe</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── MEMBRES ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="liquid-glass-dark rounded-3xl overflow-hidden group hover:shadow-liquid-blue transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* En-tête dégradée */}
                <div className={`bg-gradient-to-br ${member.color} px-8 py-7 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-5">
                    <Scale className="w-28 h-28 text-white" />
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-400/50 transition-colors">
                      <span className="font-serif text-xl font-bold text-white">{member.initials}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80 font-bold block">{member.role}</span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 leading-tight">{member.name}</h2>
                    </div>
                  </div>
                </div>

                {/* Corps */}
                <div className="p-7 space-y-5">
                  <div className="space-y-2.5 pb-4 border-b border-white/10">
                    <div className="flex items-start gap-2.5 text-xs text-white/70">
                      <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-white/85">{member.specialty}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-white/50">
                      <GraduationCap className="w-4 h-4 text-cyan-400/70 shrink-0 mt-0.5" />
                      <span>{member.degree}</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed">{member.bio}</p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <a href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contacter</span>
                    </a>
                    <Link href="/rendez-vous"
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-cyan-400 transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Prendre rendez-vous</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 liquid-glass-dark rounded-xl p-5 text-center text-xs text-white/35 max-w-2xl mx-auto">
            Conformément au cahier des charges du projet de simulation, les noms, profils et adresses des collaborateurs sont entièrement fictifs.
          </div>
        </div>
      </section>
    </div>
  );
}
