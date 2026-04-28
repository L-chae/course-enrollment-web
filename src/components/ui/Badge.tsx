import React from 'react';

interface BadgeProps {
  variant?: 'brand' | 'error' | 'success' | 'warning';
  children: React.ReactNode;
}

export default function Badge({ variant = 'brand', children }: BadgeProps) {
  // globals.css의 .badge-* 유틸리티를 동적으로 호출
  const badgeClass = `badge-${variant}`;

  return <span className={badgeClass}>{children}</span>;
}
