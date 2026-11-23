'use client';

import React, { useEffect, useRef, useState, ElementType } from 'react';

export type RevealVariant =
  | 'title'        // Grands titres H1/H2 : Révélation éditoriale masquée (Apple display rise)
  | 'focus'        // Paragraphes & sous-titres : Défloutage d'encre optique
  | 'glide-right'  // Glissement fluide droite -> centre (sans à-coups)
  | 'glide-left'   // Glissement fluide gauche -> centre
  | 'card'         // Conteneurs, cartes de services & réassurance : Élévation d'ensemble
  | 'eyebrow'      // Surtitres dorés & rubans : Expansion typographique
  | 'quote'        // Citations & témoignages : Déploiement éditorial
  | 'counter'      // Chiffres clés & années : Montée en puissance
  // Alias de rétrocompatibilité
  | 'right'
  | 'left'
  | 'bottom'
  | 'pop'
  | 'blur';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in seconds
  className?: string;
  as?: ElementType;
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean; // false par défaut pour s'activer en scroll montant et descendant
}

export function ScrollReveal({
  children,
  variant = 'title',
  delay = 0,
  duration,
  className = '',
  as: Component = 'div',
  threshold = [0, 0.08],
  rootMargin = '-15px 0px -15px 0px',
  once = false, // Répète l'animation à chaque passage (haut & bas)
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Déclenche l'animation dès que l'élément pénètre dans le viewport (vers le bas comme vers le haut)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.06) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.01) {
          // Se réinitialise silencieusement dès qu'il sort du champ de vision
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Variant class mapping vers les animations éditoriales de luxe
  const variantClassMap: Record<RevealVariant, string> = {
    title: 'anim-title-rise',
    focus: 'anim-lens-focus',
    'glide-right': 'anim-silk-right',
    'glide-left': 'anim-silk-left',
    card: 'anim-card-float',
    eyebrow: 'anim-eyebrow',
    quote: 'anim-quote',
    counter: 'anim-counter',
    // Mappings rétrocompatibles
    right: 'anim-silk-right',
    left: 'anim-silk-left',
    bottom: 'anim-card-float',
    pop: 'anim-counter',
    blur: 'anim-lens-focus',
  };

  const animationClass = isVisible
    ? `reveal-visible ${variantClassMap[variant]}`
    : 'reveal-init';

  const style: React.CSSProperties = {
    animationDelay: delay > 0 ? `${delay}ms` : undefined,
    animationDuration: duration ? `${duration}s` : undefined,
  };

  return (
    <Component
      ref={elementRef}
      className={`${animationClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
}
