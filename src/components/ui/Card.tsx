import React from 'react';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export default function Card({ children, interactive, className = '' }: CardProps) {
  // globals.css의 .card 또는 .card-interactive 적용
  const baseClass = interactive ? 'card-interactive' : 'card';

  return (
    <div className={`${baseClass} ${className}`} style={{ padding: 'var(--space-lg)' }}>
      {children}
    </div>
  );
}
