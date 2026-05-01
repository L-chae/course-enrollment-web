import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { FORM_LIMITS } from '@/constants';

type ApplicantFieldsProps = {
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
};

export default function ApplicantFields({ register, errors }: ApplicantFieldsProps) {
  return (
    <section className="card flex flex-col gap-4 p-5">
      <h3 className="text-h3">신청자 정보</h3>

      <div className="grid gap-4 md:grid-cols-2">
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

        <div className="md:col-span-2">
          <Textarea
            label="수강동기"
            maxLength={FORM_LIMITS.motivationMaxLength}
            {...register('applicant.motivation')}
            error={errors.applicant?.motivation?.message as string | undefined}
          />
        </div>
      </div>
    </section>
  );
}
