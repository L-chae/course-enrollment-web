'use client';

import { useState } from 'react';

import { submitEnrollment } from '@/lib/enrollmentApi';
import type { EnrollmentRequest, EnrollmentResponse } from '@/types/enrollment';

export function useEnrollSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (enrollment: EnrollmentRequest): Promise<EnrollmentResponse | null> => {
    if (isSubmitting) {
      return null;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      return await submitEnrollment(enrollment);
    } catch (submitError) {
      const normalizedError =
        submitError instanceof Error ? submitError : new Error('수강 신청 제출에 실패했습니다.');

      setError(normalizedError);
      throw normalizedError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    error,
  };
}
