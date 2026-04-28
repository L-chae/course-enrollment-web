import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  isLoading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // 변체별 스타일 정의 (globals.css의 토큰 직접 사용)
  const variants = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-dark shadow-brand hover:shadow-none active:scale-[0.98]',
    secondary:
      'bg-bg-card text-text-main border border-border-strong hover:bg-bg-sunken active:scale-[0.98]',
    ghost:
      'bg-transparent text-brand-primary border border-brand-primary/30 hover:bg-brand-light active:scale-[0.98]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-sm font-bold transition-all ${variants[variant]} ${className}`}
      style={{
        padding: 'var(--space-sm) var(--space-lg)',
        transitionDuration: 'var(--duration-fast)',
        fontSize: '1rem',
      }}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>처리 중...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
