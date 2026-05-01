import { getEnrollmentErrorMessage } from '@/lib/errorMessage';
import type {
  EnrollmentDuplicateCheckResponse,
  EnrollmentRequest,
  EnrollmentResponse,
} from '@/types/enrollment';

type EnrollmentErrorResponse = {
  code?: string;
  message?: string;
};

export async function submitEnrollment(enrollment: EnrollmentRequest): Promise<EnrollmentResponse> {
  const response = await fetch('/api/enrollments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollment),
  });

  if (!response.ok) {
    let errorBody: EnrollmentErrorResponse | null = null;

    try {
      errorBody = (await response.json()) as EnrollmentErrorResponse;
    } catch {
      errorBody = null;
    }

    throw new Error(errorBody?.message ?? getEnrollmentErrorMessage(errorBody?.code));
  }

  return (await response.json()) as EnrollmentResponse;
}

type DuplicateCheckParams = {
  courseId: string;
  email: string;
};

export async function checkEnrollmentDuplicate({
  courseId,
  email,
}: DuplicateCheckParams): Promise<EnrollmentDuplicateCheckResponse> {
  const searchParams = new URLSearchParams({
    courseId,
    email,
  });
  const response = await fetch(`/api/enrollments/check?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('중복 신청 여부를 확인하지 못했습니다.');
  }

  return (await response.json()) as EnrollmentDuplicateCheckResponse;
}
