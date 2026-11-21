import React from 'react';
import { useTranslations } from 'next-intl';
import { Users2, Mail, Phone, Scale, Award, GraduationCap } from 'lucide-react';

export default function TeamPage() {
  const t = useTranslations('team');

  const members = [
    {
      name: 'Me Alexandre de Saint-Germain',
      role: 'Notaire Associé Fondateur',
      specialty: 'Droit Immobilier Complexe & Financement Institutionnel',
      degree: 'Diplôme Supérieur du Notariat (DSN) — Université Paris-Panthéon-Assas',
      email: 'a.saint-germain@aurelex-notaires.fr',
      bio: 'Plus de 20 ans d’expérience au service d’investisseurs privés, de familles et d’institutionnels. Spécialiste reconnu des ventes en état futur d’achèvement (VEFA) et des restructurations immobilières de grande envergure.',
    },
    {
      name: 'Me Éléonore Vaneau-Rocher',
      role: 'Notaire Associée',
      specialty: 'Droit de la Famille, Successions & Stratégie Patrimoniale',
      degree: 'Master 2 Droit Notarial & DSN — Université Paris-Dauphine',
      email: 'e.vaneau@aurelex-notaires.fr',
      bio: 'Dédiée aux problématiques civiles, familiales et de transmission de patrimoine. Elle accompagne les familles lors de donations-partages transgénérationnelles et de successions à fort enjeu fiscal.',
    },
    {
      name: 'Me Thibault Delacroix',
      role: 'Notaire Salarié',
      specialty: 'Droit des Sociétés & Transmission d’Entreprises (Pacte Dutreil)',
      degree: 'Master 2 Droit des Affaires & DSN — Université Paris 1 Panthéon-Sorbonne',
      email: 't.delacroix@aurelex-notaires.fr',
      bio: 'Expert de l’accompagnement des dirigeants de PME/ETI et des startups. Il intervient sur les pactes d’associés, la cession de fonds de commerce et l’optimisation de la transmission d’actifs professionnels.',
    },
    {
      name: 'Mme Sophie Marchand',
      role: 'Premier Clerc de Notaire',
      specialty: 'Coordination des Actes Immobiliers Résidentiels',
      degree: 'Diplôme de l’Institut des Métiers du Notariat (IMN)',
      email: 's.marchand@aurelex-notaires.fr',
      bio: 'Pilier de l’office depuis plus de 15 ans, Sophie veille à l’instruction rigoureuse des dossiers de vente, au respect strict des délais légaux de rétractation et à la liaison avec les services de la publicité foncière.',
    },
  ];

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-b from-aurelex-ivoire via-white to-aurelex-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-aurelex-champagne-soft border border-aurelex-champagne/40 text-aurelex-bordeaux text-xs font-semibold uppercase tracking-wider">
            <Users2 className="w-3.5 h-3.5 text-aurelex-champagne" />
            <span>Notaires & Juristes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-aurelex-bordeaux leading-tight">
            {t('title')}
          </h1>
          <div className="w-20 h-1 bg-aurelex-champagne mx-auto rounded-full" />
          <p className="text-lg text-aurelex-ebene/80 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Member cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-aurelex-beige-border hover:border-aurelex-champagne shadow-sm hover:shadow-xl transition-all space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-aurelex-champagne-hover">
                    {member.role}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-aurelex-bordeaux mt-1">
                    {member.name}
                  </h2>
                </div>
                <div className="p-3 rounded-xl bg-aurelex-champagne-soft text-aurelex-bordeaux">
                  <Scale className="w-6 h-6 text-aurelex-champagne" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-aurelex-ebene/70 border-y border-aurelex-beige-border py-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-aurelex-champagne shrink-0" />
                  <span className="font-medium text-aurelex-ebene/90">{member.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-aurelex-champagne shrink-0" />
                  <span>{member.degree}</span>
                </div>
              </div>

              <p className="text-sm text-aurelex-ebene/80 leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-aurelex-bordeaux font-semibold">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1.5 hover:text-aurelex-champagne transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer about Photos & Personas */}
        <div className="p-6 rounded-2xl bg-aurelex-beige/30 border border-aurelex-beige-border text-center text-xs text-aurelex-ebene/70 max-w-2xl mx-auto">
          Conformément au cahier des charges du projet de simulation, les noms, profils et adresses des collaborateurs sont entièrement fictifs afin de respecter le secret des données et l'absence d'homonymie avec de véritables offices notariaux.
        </div>
      </div>
    </div>
  );
}
