'use client';

import { useEffect } from 'react';

import ApplicantFields from '@/components/enrollment/ApplicantFields';
import EnrollmentTypeSelector from '@/components/enrollment/EnrollmentTypeSelector';
import TermsAgreement from '@/components/enrollment/TermsAgreement';
import Button from '@/components/ui/Button';
import { useEnrollForm } from '@/hooks/useEnrollForm';
import type { EnrollmentSchema } from '@/lib/schema';

type ApplyFormProps = {
  courseId: string;
};

export default function ApplyForm({ courseId }: ApplyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useEnrollForm();

  const selectedType = watch('type') ?? 'personal';

  useEffect(() => {
    setValue('courseId', courseId);
  }, [courseId, setValue]);

  const handleTypeChange = (type: EnrollmentSchema['type']) => {
    setValue('type', type);
  };

  const handleValidSubmit = (values: EnrollmentSchema) => {
    console.log(values);
  };

  return (
    <form className="card flex flex-col gap-6 p-6" onSubmit={handleSubmit(handleValidSubmit)}>
      <EnrollmentTypeSelector value={selectedType} onChange={handleTypeChange} />
      <ApplicantFields register={register} errors={errors} />

      {selectedType === 'group' && (
        <div className="course-list-empty text-left">
          단체 정보와 참가자 명단 입력은 다음 단계에서 연결됩니다.
        </div>
      )}

      <TermsAgreement register={register} error={errors.agreedToTerms?.message as string | undefined} />

      <div className="flex justify-end">
        <Button type="submit">다음 단계로</Button>
      </div>
    </form>
  );
}
