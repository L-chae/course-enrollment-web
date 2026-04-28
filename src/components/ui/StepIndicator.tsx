import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div
      className="flex w-full items-center"
      style={{ gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}
    >
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isDone = index + 1 < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center" style={{ gap: 'var(--space-xs)' }}>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  isActive
                    ? 'bg-brand-primary text-white'
                    : isDone
                      ? 'bg-success text-white'
                      : 'bg-bg-sunken text-text-mute'
                }`}
              >
                {isDone ? '✓' : index + 1}
              </span>
              <span
                className={`text-sm font-bold ${isActive ? 'text-text-main' : 'text-text-mute'}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && <div className="bg-border-subtle mx-2 h-px flex-1" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
