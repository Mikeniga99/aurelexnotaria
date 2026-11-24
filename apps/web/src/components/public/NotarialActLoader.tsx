'use client';

import React, { useEffect } from 'react';

interface NotarialActLoaderProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  onFinished?: () => void;
  minDurationMs?: number;
}

export function NotarialActLoader({
  isOpen,
  onFinished,
  minDurationMs = 1800,
}: NotarialActLoaderProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [isOpen, minDurationMs, onFinished]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-200/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative flex flex-col items-center">
        {/* Halo d'ambiance doré clair */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#D4B483]/30 via-blue-200/40 to-[#D4B483]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Carte Centrale Thème Clair */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-10px_rgba(11,25,56,0.18)] border border-[#D4B483]/50 overflow-hidden flex items-center justify-center">
          {/* Liseré fin d'encadrement doré */}
          <div className="absolute inset-2 border border-[#D4B483]/30 rounded-2xl pointer-events-none" />

          {/* ═══════════════════════════════════════════════════════
              SCÈNE VECTORIELLE UNIQUE : BALANCE DE JUSTICE & MAILLET
          ════════════════════════════════════════════════════════ */}
          <div className="relative w-72 sm:w-80 h-44 flex items-center justify-center">
            <svg
              viewBox="0 0 300 170"
              className="w-full h-full max-w-[300px] drop-shadow-[0_4px_12px_rgba(11,25,56,0.12)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dégradé Or Métallique Noble */}
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="35%" stopColor="#B08D55" />
                  <stop offset="70%" stopColor="#8C6E3A" />
                  <stop offset="100%" stopColor="#C9A84C" />
                </linearGradient>

                {/* Dégradé Bois Précieux */}
                <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5C3317" />
                  <stop offset="50%" stopColor="#3E2110" />
                  <stop offset="100%" stopColor="#2C160A" />
                </linearGradient>

                {/* Onde de choc dorée */}
                <radialGradient id="shockwaveGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ligne d'assise au sol */}
              <path
                d="M 20 148 L 280 148"
                stroke="url(#goldGradient)"
                strokeWidth="1.2"
                strokeOpacity="0.5"
                strokeDasharray="4 4"
              />

              {/* ──────────────────────────────────────────────────────────
                  1. LA BALANCE DE JUSTICE (Position X: ~110, Y: ~140)
              ─────────────────────────────────────────────────────────── */}
              <g id="balance-group">
                {/* Socle de la Balance */}
                <ellipse cx="110" cy="144" rx="34" ry="7" fill="url(#goldGradient)" />
                <path d="M 85 144 L 98 132 L 122 132 L 135 144 Z" fill="url(#goldGradient)" opacity="0.9" />

                {/* Pilier Central Vertical */}
                <rect x="107.5" y="42" width="5" height="92" rx="2.5" fill="url(#goldGradient)" />

                {/* Pommeau supérieur de la balance */}
                <circle cx="110" cy="36" r="6" fill="url(#goldGradient)" />
                <path d="M 110 24 L 114 34 L 106 34 Z" fill="url(#goldGradient)" />

                {/* Fléau Horizontal Oscillant */}
                <g className="anim-balance-beam">
                  {/* Axe pivot central */}
                  <circle cx="110" cy="42" r="3.5" fill="#f0ece4" stroke="url(#goldGradient)" strokeWidth="1.5" />

                  {/* Barre transversale */}
                  <path
                    d="M 58 41 C 82 39, 138 39, 162 41 C 163 43, 138 45, 110 44 C 82 45, 57 43, 58 41 Z"
                    fill="url(#goldGradient)"
                  />
                  {/* Bagues d'extrémité */}
                  <circle cx="58" cy="42" r="3" fill="url(#goldGradient)" />
                  <circle cx="162" cy="42" r="3" fill="url(#goldGradient)" />

                  {/* Chaînettes & Plateau Gauche */}
                  <g className="anim-plate-left">
                    <line x1="58" y1="44" x2="42" y2="92" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.85" />
                    <line x1="58" y1="44" x2="74" y2="92" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.85" />
                    <line x1="58" y1="44" x2="58" y2="92" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
                    {/* Plateau coupelle gauche */}
                    <path
                      d="M 38 92 C 40 106, 76 106, 78 92 Z"
                      fill="url(#goldGradient)"
                    />
                    <ellipse cx="58" cy="92" rx="20" ry="3.5" fill="url(#goldGradient)" opacity="0.8" />
                  </g>

                  {/* Chaînettes & Plateau Droit */}
                  <g className="anim-plate-right">
                    <line x1="162" y1="44" x2="146" y2="92" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.85" />
                    <line x1="162" y1="44" x2="178" y2="92" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.85" />
                    <line x1="162" y1="44" x2="162" y2="92" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
                    {/* Plateau coupelle droite */}
                    <path
                      d="M 142 92 C 144 106, 180 106, 182 92 Z"
                      fill="url(#goldGradient)"
                    />
                    <ellipse cx="162" cy="92" rx="20" ry="3.5" fill="url(#goldGradient)" opacity="0.8" />
                  </g>
                </g>
              </g>

              {/* ──────────────────────────────────────────────────────────
                  2. LE MAILLET NOTARIAL & LE BILLOT (Position X: ~220)
              ─────────────────────────────────────────────────────────── */}
              <g id="gavel-group">
                {/* Billot de frappe (Sounding Block) */}
                <ellipse cx="215" cy="144" rx="28" ry="7" fill="url(#woodGradient)" stroke="url(#goldGradient)" strokeWidth="1.2" />
                <path d="M 191 144 L 195 136 L 235 136 L 239 144 Z" fill="url(#woodGradient)" />
                <ellipse cx="215" cy="136" rx="20" ry="4.5" fill="#1A0D06" stroke="url(#goldGradient)" strokeWidth="1.2" />

                {/* Onde de choc dorée émanant de la frappe */}
                <ellipse cx="215" cy="136" rx="24" ry="7" fill="url(#shockwaveGlow)" className="anim-shockwave pointer-events-none" />

                {/* Le Maillet Animé (Gavel) */}
                <g className="anim-gavel">
                  {/* Manche du Maillet */}
                  <path
                    d="M 215 124 L 268 139 L 267 143 L 214 128 Z"
                    fill="url(#woodGradient)"
                    stroke="url(#goldGradient)"
                    strokeWidth="0.8"
                  />
                  {/* Pommeau manche en or */}
                  <circle cx="268" cy="141" r="3.5" fill="url(#goldGradient)" />

                  {/* Bague dorée d'insertion */}
                  <rect x="219" y="123" width="4" height="7" rx="1" fill="url(#goldGradient)" transform="rotate(15 219 123)" />

                  {/* Tête de Maillet (Cylindre biseauté) */}
                  <g transform="translate(196, 96) rotate(15)">
                    {/* Corps principal en bois précieux */}
                    <rect x="0" y="0" width="36" height="20" rx="3" fill="url(#woodGradient)" stroke="url(#goldGradient)" strokeWidth="1.2" />
                    {/* Anneau doré central */}
                    <rect x="15" y="0" width="6" height="20" fill="url(#goldGradient)" />
                    {/* Embouts de frappe dorés */}
                    <path d="M 0 0 L -3 3 L -3 17 L 0 20 Z" fill="url(#goldGradient)" />
                    <path d="M 36 0 L 39 3 L 39 17 L 36 20 Z" fill="url(#goldGradient)" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
