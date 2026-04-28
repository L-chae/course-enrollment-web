import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Input({ label, error, required, className = '', ...props }: InputProps) {
  return (
    <div
      className="flex w-full flex-col"
      style={{ gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}
    >
      {label && (
        <label className="text-text-sub flex items-center gap-1 text-sm font-bold">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
      )}

      {/* globals.css에 정의된 유틸리티 클래스 적용 */}
      <input className={`input-standard ${error ? 'input-error' : ''} ${className}`} {...props} />

      {error && <p className="text-error text-xs font-medium">{error}</p>}
    </div>
  );
}
