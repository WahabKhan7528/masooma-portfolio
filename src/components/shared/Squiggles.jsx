import { memo } from 'react';

export const Squiggle1 = memo(({ className }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 95 C 10 70, 40 40, 70 50 C 100 60, 90 90, 70 95 C 50 100, 40 80, 55 65 C 70 50, 85 65, 80 80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));

Squiggle1.displayName = 'Squiggle1';

export const Squiggle2 = memo(({ className }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 C 30 10, 40 10, 50 50 C 60 10, 70 10, 90 50" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));

Squiggle2.displayName = 'Squiggle2';

export const Squiggle3 = memo(({ className }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M95 25 C 110 50, 80 80, 50 70 C 20 60, 30 30, 50 25 C 70 20, 80 40, 65 55 C 50 70, 35 55, 40 40" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));

Squiggle3.displayName = 'Squiggle3';
