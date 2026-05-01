import { useEffect, useMemo, useRef } from 'react';
import type { UseFormGetValues, UseFormReset, UseFormWatch } from 'react-hook-form';

import { FORM_PERSIST_STORAGE_PREFIX } from '@/constants';
import type { EnrollmentSchema } from '@/lib/schema';

type UseFormPersistParams = {
  courseId: string;
  watch: UseFormWatch<EnrollmentSchema>;
  reset: UseFormReset<EnrollmentSchema>;
  getValues: UseFormGetValues<EnrollmentSchema>;
};

function getDefaultValues(courseId: string): EnrollmentSchema {
  return {
    courseId,
    type: 'personal',
    applicant: {
      name: '',
      email: '',
      phone: '',
      motivation: '',
    },
    agreedToTerms: false as unknown as true,
  };
}

export function useFormPersist({ courseId, watch, reset, getValues }: UseFormPersistParams) {
  const isInitializedRef = useRef(false);
  const storageKey = useMemo(() => `${FORM_PERSIST_STORAGE_PREFIX}:${courseId}`, [courseId]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      reset(getDefaultValues(courseId));
      isInitializedRef.current = true;
      return;
    }

    try {
      const parsed = JSON.parse(stored) as EnrollmentSchema;
      if (parsed.courseId !== courseId) {
        localStorage.removeItem(storageKey);
        reset(getDefaultValues(courseId));
        return;
      }

      reset({
        ...parsed,
        courseId,
      });
    } catch {
      localStorage.removeItem(storageKey);
      reset(getDefaultValues(courseId));
    } finally {
      isInitializedRef.current = true;
    }
  }, [courseId, reset, storageKey]);

  useEffect(() => {
    const subscription = watch(() => {
      if (!isInitializedRef.current) {
        return;
      }

      const values = getValues();
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...values,
          courseId,
        }),
      );
    });

    return () => subscription.unsubscribe();
  }, [courseId, getValues, storageKey, watch]);
}
