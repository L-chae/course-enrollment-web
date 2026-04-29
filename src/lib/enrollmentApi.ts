import type { EnrollmentRequest, EnrollmentResponse } from '@/types/enrollment';

export async function submitEnrollment(enrollment: EnrollmentRequest): Promise<EnrollmentResponse> {
  const response = await fetch('/api/enrollments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollment),
  });

  if (!response.ok) {
    throw new Error('수강 신청 제출에 실패했습니다.');
  }

  return (await response.json()) as EnrollmentResponse;
}
