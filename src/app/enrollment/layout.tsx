// src/app/enrollment/layout.tsx
import React from 'react';

export default function EnrollmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="enrollment-container">
      {/* 나중에 여기에 StepIndicator 같은 공통 UI가 들어갑니다 */}
      {children}
    </section>
  );
}
