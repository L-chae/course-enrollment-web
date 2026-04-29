'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray } from 'react-hook-form';

import ApplicantFields from '@/components/enrollment/ApplicantFields';
import EnrollmentTypeSelector from '@/components/enrollment/EnrollmentTypeSelector';
import GroupFields from '@/components/enrollment/GroupFields';
import ParticipantFields from '@/components/enrollment/ParticipantFields';
import TermsAgreement from '@/components/enrollment/TermsAgreement';
import Button from '@/components/ui/Button';
import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import { useEnrollForm } from '@/hooks/useEnrollForm';
import { useFormPersist } from '@/hooks/useFormPersist';
import type { EnrollmentSchema } from '@/lib/schema';

const ENROLLMENT_DRAFT_STORAGE_KEY = 'course-enrollment:draft';

type ApplyFormProps = {
  courseId: string;
};

export default function ApplyForm({ courseId }: ApplyFormProps) {
  const router = useRouter();
  const [isLeavingSafely, setIsLeavingSafely] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
    getValues,
  } = useEnrollForm();

  useFormPersist({
    courseId,
    watch,
    reset,
    getValues,
  });

  useBeforeUnload({
    enabled: isDirty && !isLeavingSafely,
  });

  const {
    fields: participantFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'group.participants',
  });

  const selectedType = watch('type') ?? 'personal';

  useEffect(() => {
    setValue('courseId', courseId);
  }, [courseId, setValue]);

  useEffect(() => {
    if (selectedType !== 'group') {
      return;
    }

    if (participantFields.length === 0) {
      append({ name: '', email: '' });
    }
  }, [append, participantFields.length, selectedType]);

  const handleTypeChange = (type: EnrollmentSchema['type']) => {
    setValue('type', type);

    if (type === 'group' && participantFields.length === 0) {
      append({ name: '', email: '' });
    }
  };

  const handleValidSubmit = (values: EnrollmentSchema) => {
    setIsLeavingSafely(true);
    sessionStorage.setItem(ENROLLMENT_DRAFT_STORAGE_KEY, JSON.stringify(values));
    router.push('/confirm');
  };

  return (
    <form className="card flex flex-col gap-6 p-6" onSubmit={handleSubmit(handleValidSubmit)}>
      <EnrollmentTypeSelector value={selectedType} onChange={handleTypeChange} />
      <ApplicantFields register={register} errors={errors} />

      {selectedType === 'group' && (
        <>
          <GroupFields register={register} errors={errors} />
          <ParticipantFields
            fields={participantFields}
            register={register}
            errors={errors}
            append={append}
            remove={remove}
          />
        </>
      )}

      <TermsAgreement register={register} error={errors.agreedToTerms?.message as string | undefined} />

      <div className="flex justify-end">
        <Button type="submit">다음 단계로</Button>
      </div>
    </form>
  );
}
