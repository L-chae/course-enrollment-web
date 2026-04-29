'use client';

import { useEffect } from 'react';

import ApplicantFields from '@/components/enrollment/ApplicantFields';
import EnrollmentTypeSelector from '@/components/enrollment/EnrollmentTypeSelector';
import TermsAgreement from '@/components/enrollment/TermsAgreement';
import Button from '@/components/ui/Button';
import { useEnrollForm } from '@/hooks/useEnrollForm';
import type { EnrollmentSchema } from '@/lib/schema';

export default function ApplyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useEnrollForm();

  const selectedType = watch('type') ?? 'personal';

  useEffect(() => {
    setValue('courseId', 'crs-001');
  }, [setValue]);

  const handleTypeChange = (type: EnrollmentSchema['type']) => {
    setValue('type', type);
  };

  const handleValidSubmit = (values: EnrollmentSchema) => {
    console.log(values);
  };

  return (
    <main className="content-container enrollment-page">
      <header className="enrollment-header">
        <h1 className="text-h2">수강 신청 정보 입력</h1>
        <p className="text-caption">신청 유형과 기본 정보를 입력해 주세요.</p>
      </header>

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
    </main>
  );
}
