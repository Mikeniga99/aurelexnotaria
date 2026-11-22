import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  Building2,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  Globe2,
  Calendar,
  ArrowRight,
  Shield,
  Scale,
  Award,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { NotaryFeeSimulator } from '@/components/public/NotaryFeeSimulator';

export default function HomePage() {
  const domaines = [
    {
      icon: Building2,
      img: '/images/domaine_immobilier.jpg',
      num: '01',
      tag: 'IMMOBILIER',
      title: 'Immobilier Résidentiel & Institutionnel',
      sub: "Sécurisation intégrale de vos opérations d'achat, de vente, VEFA et financements hypothécaires.",
      points: [
        'Rédaction de promesses unilatérales et compromis de vente',
        'Purge des droits de préemption et contrôle hypothécaire sur 30 ans',
        'Téléactes et télétransmission immédiate au fichier immobilier',
      ],
    },
    {
      icon: HeartHandshake,
      img: '/images/domaine_famille.jpg',
      num: '02',
      tag: 'FAMILLE',
      title: 'Droit de la Famille & Successions',
      sub: 'Anticiper pour protéger, pacifier et optimiser la dévolution de vos actifs civils.',
      points: [
        'Donation-partage transgénérationnelle avec réserve d’usufruit',
        'Règlement successoral complet, inventaire et déclaration fiscale',
        'Régimes matrimoniaux sur mesure, séparation de biens et PACS',
      ],
    },
    {
      icon: Briefcase,
      img: '/images/domaine_entreprise.jpg',
      num: '03',
      tag: 'ENTREPRISES',
      title: 'Ingénierie Sociétaire & Dirigeants',
      sub: "Conseil juridique stratégique pour les chefs d'entreprise, holdings et repreneurs.",
      points: [
        'Transmission sous Pacte Dutreil : 75 % d’abattement fiscal légal',
        'Constitution de sociétés civiles (SCI) et commerciales (SAS, SARL)',
        'Cession de fonds de commerce, séquestre du prix et baux',
      ],
    },
    {
      icon: TrendingUp,
      img: '/images/domaine_patrimoine.jpg',
      num: '04',
      tag: 'PATRIMOINE',
      title: 'Fiscalité & Stratégie Patrimoniale',
      sub: 'Une ingénierie juridique au service de la résilience et de la transmission de vos avoirs.',
      points: [
        'Audit patrimonial civil, fiscal et financier exhaustif',
        'Clauses bénéficiaires démembrées d’assurance-vie',
        'Optimisation de l’Impôt sur la Fortune Immobilière (IFI)',
      ],
    },
    {
      icon: Globe2,
      img: '/images/domaine_international.jpg',
      num: '05',
      tag: 'INTERNATIONAL',
      title: 'Droit Notarial International',
      sub: 'Gestion sécurisée des dossiers transfrontaliers pour expatriés, binationaux et non-résidents.',
      points: [
        'Application du Règlement européen sur les successions (professio juris)',
        'Acquisitions et cessions en France par des investisseurs étrangers',
        'Procurations internationales certifiées, apostille et légalisation',
      ],
    },
  ];

  const stats = [
    { value: '25+', label: "Années d'expérience" },
    { value: '1 800+', label: 'Actes reçus / an' },
    { value: '99,4 %', label: 'Dossiers satisfaits' },
    { value: '6', label: 'Notaires & juristes' },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900">

      {/* ═══════════════════════════════════
          1. HERO — EXPERT UI/UX : 100% LISIBLE & IMMERSIF
      ════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">

        {/* Fond décoratif doux */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-[#F8FAFC] to-[#F8FAFC] -z-10" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Colonne Gauche : Contenu textuel haute lisibilité */}
            <div className="lg:col-span-7 space-y-7">

              {/* Badge d'office */}
              <div className="inline-flex items-center gap-2.5 bg-blue-100/90 text-blue-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-xs">
                <Scale className="w-4 h-4 text-blue-700" />
                <span>Office Notarial · 18 Place Vendôme · Paris Ier</span>
              </div>

              {/* Titre Principal */}
              <div className="space-y-2">
                <h1 className="font-serif leading-[1.08] text-slate-950">
                  <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal italic text-slate-800">
                    L'Excellence de l'Acte,
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0B1938]">
                    L'Éternité du Droit.
                  </span>
                </h1>
              </div>

              {/* Paragraphe d'introduction */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
                Officiers publics investis d'une délégation de puissance publique par le Garde des Sceaux. Nous conférons force probante et exécutoire à vos actes immobiliers, patrimoniaux et familiaux.
              </p>

              {/* Actions CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <Link
                  href="/rendez-vous"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-700/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Prendre rendez-vous</span>
                </Link>
                <Link
                  href="/expertises"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-slate-300 shadow-xs transition-all"
                >
                  <span>Consulter nos domaines</span>
                  <ArrowRight className="w-4 h-4 text-blue-700" />
                </Link>
              </div>

              {/* Garanties institutionnelles */}
              <div className="pt-2 flex flex-wrap gap-5 text-xs text-slate-700 font-semibold border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Actes authentiques électroniques</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Visioconférence sécurisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Membre CSN & Chambre de Paris</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Image Hero mise en valeur */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl bg-white aspect-[4/5] max-h-[560px]">
                {/* Image mobile */}
                <div className="block md:hidden absolute inset-0">
                  <Image
                    src="/images/arriere_mobile.jpg"
                    alt="Office Aurelex Notaires Paris"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                {/* Image grand écran */}
                <div className="hidden md:block absolute inset-0">
                  <Image
                    src="/images/arriere_grand_ecran.jpg"
                    alt="Cabinet Notarial Aurelex Paris"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Badge institutionnel flottant */}
                <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-slate-950 text-sm">Aurelex Notaires</div>
                      <div className="text-xs text-slate-600">Cabinet de prestige · 18 Place Vendôme</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. BANDE STATISTIQUES — PARFAITEMENT LISIBLE
      ════════════════════════════════════ */}
      <section className="bg-white border-y border-slate-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-4 px-4 text-center ${i < stats.length - 1 ? 'lg:border-r border-slate-200' : ''}`}
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1938] mb-1">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-600 font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. DOMAINES — CARTES ÉDITORIALES LUXE
      ════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-14">

          {/* En-tête de section */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Compétences de l'Office</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Une assistance juridique et notariale rigoureuse pour sécuriser chacun des temps forts de votre vie privée et professionnelle.
            </p>
          </div>

          {/* Cartes domaines avec séparation nette photo & contenu */}
          <div className="space-y-8">
            {domaines.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                    {/* Image nette et éclatante */}
                    <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] lg:min-h-full ${isEven ? '' : 'lg:order-2'}`}>
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-blue-900 flex items-center gap-2 shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-blue-700" />
                        <span>{item.tag}</span>
                      </div>
                    </div>

                    {/* Contenu textuel sur fond blanc 100% lisible */}
                    <div className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-3xl font-extrabold text-blue-700">
                            {item.num}.
                          </span>
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                          {item.sub}
                        </p>

                        {/* Points clés d'intervention */}
                        <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                          {item.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA vers rendez-vous ou détails */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                          href="/rendez-vous"
                          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-white" />
                          <span>Prendre rendez-vous</span>
                        </Link>
                        <Link
                          href="/expertises"
                          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-700 uppercase tracking-wider transition-colors"
                        >
                          <span>En savoir plus</span>
                          <ArrowRight className="w-4 h-4 text-blue-700" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════
          4. SIMULATEUR FRAIS NOTARIAUX
      ════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Barème Légal Officiel</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950">
              Estimez vos frais notariaux
            </h2>
            <p className="text-base text-slate-700">
              Calcul conforme au barème réglementé du Code de commerce (article A444-91).
            </p>
          </div>
          <NotaryFeeSimulator />
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. MANIFESTE & TRADITION LÉGISLATIVE
      ════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-blue-700" />
            <span>Tradition Républicaine · Loi du 25 ventôse an XI</span>
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-950 leading-snug">
            « Les notaires sont les officiers publics établis pour recevoir tous les actes et contrats auxquels les parties doivent ou veulent faire donner le caractère d'authenticité… »
          </blockquote>

          <p className="text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            À l'office <strong className="text-slate-950 font-bold">Aurelex Notaires</strong>, nous honorons chaque jour ce serment : date certaine, force probante indiscutable et conservation séculaire au Minutier Central des notaires de France.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
              <Shield className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Délégation par arrêté du Garde des Sceaux</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
              <Shield className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Contrôle Chambre des Notaires de Paris</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs">
              <Shield className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Membre Conseil Supérieur du Notariat</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. BANDE CTA FINALE
      ════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-5 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950">
            Initiez votre dossier en toute confiance
          </h2>
          <p className="text-base text-slate-700 max-w-lg mx-auto">
            Consultation en présentiel au cabinet Place Vendôme ou par visioconférence certifiée. Réponse sous 24h ouvrées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/rendez-vous"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-700/20 transition-all"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Prendre rendez-vous</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-slate-300 shadow-xs transition-all"
            >
              <span>Poser une question</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
