import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
}

export default function Textarea({
  label,
  error,
  maxLength,
  className = '',
  ...props
}: TextareaProps) {
  const currentLength = String(props.value || '').length;

  return (
    <div className="flex w-full flex-col" style={{ gap: 'var(--space-xs)' }}>
      {label && <label className="text-text-sub text-sm font-bold">{label}</label>}
      <div className="relative">
        <textarea
          className={`input-standard min-h-[120px] resize-none ${error ? 'input-error' : ''} ${className}`}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span className="text-text-mute absolute right-3 bottom-2 font-mono text-[10px]">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
}
