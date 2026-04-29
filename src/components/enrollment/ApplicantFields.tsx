import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

type ApplicantFieldsProps = {
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
};

export default function ApplicantFields({ register, errors }: ApplicantFieldsProps) {
  return (
    <section className="card" style={{ padding: 'var(--space-md)' }}>
      <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>
        신청자 정보
      </h3>

      <Input
        label="이름"
        required
        {...register('applicant.name')}
        error={errors.applicant?.name?.message as string | undefined}
      />

      <Input
        label="이메일"
        type="email"
        required
        {...register('applicant.email')}
        error={errors.applicant?.email?.message as string | undefined}
      />

      <Input
        label="연락처"
        type="tel"
        required
        {...register('applicant.phone')}
        error={errors.applicant?.phone?.message as string | undefined}
      />

      <Textarea
        label="수강동기"
        maxLength={300}
        {...register('applicant.motivation')}
        error={errors.applicant?.motivation?.message as string | undefined}
      />
    </section>
  );
}
