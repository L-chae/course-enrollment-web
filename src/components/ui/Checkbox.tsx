import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label
      className={`group flex cursor-pointer items-center select-none`}
      style={{ gap: 'var(--space-sm)' }}
    >
      <input type="checkbox" className="peer hidden" {...props} />
      <div className="border-border-strong bg-bg-sunken peer-checked:bg-brand-primary peer-checked:border-brand-primary flex h-5 w-5 items-center justify-center rounded-sm border transition-all">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-white opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-text-sub group-hover:text-text-main text-sm transition-colors">
        {label}
      </span>
    </label>
  );
}
