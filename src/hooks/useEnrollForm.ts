import { useState } from 'react';
import { useForm, FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enrollmentSchema, type EnrollmentSchema } from '@/lib/schema';

export function useEnrollForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<EnrollmentSchema>({
    resolver: zodResolver(enrollmentSchema),
    mode: 'onBlur',
    defaultValues: {
      courseId: '',
      type: 'personal',
      applicant: {
        name: '',
        email: '',
        phone: '',
        motivation: '',
      },
      // 체크박스의 기본값은 false여야 검증이 작동합니다
      agreedToTerms: false as unknown as true,
    },
  });

  // 'any' 대신 FieldPath 타입을 사용하여 구체적인 필드 검증을 수행합니다
  const nextStep = async (fields: FieldPath<EnrollmentSchema>[]) => {
    const isValid = await methods.trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return {
    ...methods,
    step,
    nextStep,
    prevStep,
  };
}
