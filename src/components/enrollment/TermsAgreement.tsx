import type { UseFormRegister } from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Checkbox from '@/components/ui/Checkbox';

type TermsAgreementProps = {
  register: UseFormRegister<EnrollmentSchema>;
  error?: string;
  compact?: boolean;
};

export default function TermsAgreement({ register, error, compact = false }: TermsAgreementProps) {
  if (compact) {
    return (
      <div className="grid gap-2">
        <p className="text-caption">수강 신청을 위해 개인정보 수집 및 이용에 동의가 필요합니다.</p>
        <Checkbox label="이용약관 및 개인정보 처리방침에 동의합니다." {...register('agreedToTerms')} />
        {error ? <p className="text-error">{error}</p> : null}
      </div>
    );
  }

  return (
    <section className="card" style={{ padding: 'var(--space-md)' }}>
      <p className="text-caption" style={{ marginBottom: 'var(--space-sm)' }}>
        수강 신청을 위해 개인정보 수집 및 이용에 동의가 필요합니다.
      </p>

      <Checkbox label="이용약관 및 개인정보 처리방침에 동의합니다." {...register('agreedToTerms')} />

      {error ? <p className="text-error">{error}</p> : null}
    </section>
  );
}
