import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ScrollReveal component for smooth scroll-triggered animations.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be revealed
 * @param {'fade-up'|'fade-down'|'fade-left'|'fade-right'|'zoom-in'|'clay-pop'|'fade'} [props.animation='fade-up'] - Animation style
 * @param {number} [props.delay=0] - Delay in milliseconds
 * @param {number} [props.duration=650] - Animation duration in milliseconds
 * @param {number} [props.threshold=0.12] - IntersectionObserver threshold (0 to 1)
 * @param {string} [props.rootMargin='0px 0px -40px 0px'] - IntersectionObserver root margin
 * @param {boolean} [props.once=true] - Whether animation should only play once
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.as='div'] - Element tag to render
 * @param {React.CSSProperties} [props.style={}] - Additional inline styles
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  className = '',
  as: Component = 'div',
  style = {},
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({
    threshold,
    rootMargin,
    once,
  });

  const animationClass = {
    'fade-up': 'reveal-fade-up',
    'fade-down': 'reveal-fade-down',
    'fade-left': 'reveal-fade-left',
    'fade-right': 'reveal-fade-right',
    'zoom-in': 'reveal-zoom-in',
    'clay-pop': 'reveal-clay-pop',
    'fade': 'reveal-fade',
  }[animation] || 'reveal-fade-up';

  const combinedStyles = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <Component
      ref={ref}
      className={`reveal-init ${animationClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={combinedStyles}
      {...rest}
    >
      {children}
    </Component>
  );
}
