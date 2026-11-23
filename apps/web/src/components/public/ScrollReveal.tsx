'use client';

import React, { useEffect, useRef, useState, ElementType } from 'react';

export type RevealVariant = 'right' | 'left' | 'bottom' | 'pop' | 'blur';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in seconds
  className?: string;
  as?: ElementType;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variant = 'right',
  delay = 0,
  duration,
  className = '',
  as: Component = 'div',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
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

  // Variant class mapping
  const variantClassMap: Record<RevealVariant, string> = {
    right: 'reveal-from-right',
    left: 'reveal-from-left',
    bottom: 'reveal-from-bottom',
    pop: 'reveal-pop',
    blur: 'reveal-blur',
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
