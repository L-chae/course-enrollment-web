import { NextResponse } from 'next/server';
import { EnrollmentRequest } from '@/types/enrollment';

export async function POST(request: Request) {
  let body: EnrollmentRequest;

  try {
    body = (await request.json()) as EnrollmentRequest;
  } catch {
    return NextResponse.json(
      {
        code: 'INVALID_INPUT',
        message: '입력값을 다시 확인해 주세요.',
      },
      { status: 400 },
    );
  }

  // Mock error case: 특정 강좌는 모집 마감 상태
  if (body.courseId === 'crs-004') {
    return NextResponse.json(
      {
        code: 'COURSE_FULL',
        message: '모집이 마감된 강좌입니다.',
      },
      { status: 409 },
    );
  }

  // Mock error case: 특정 이메일은 중복 신청으로 처리
  if (body.applicant.email === 'duplicate@example.com') {
    return NextResponse.json(
      {
        code: 'DUPLICATE_ENROLLMENT',
        message: '이미 신청한 강좌입니다.',
      },
      { status: 409 },
    );
  }

  // 실제 DB 저장 로직 대신 Mock 응답 생성
  console.log('🚀 Enrollment Received:', body);

  return NextResponse.json(
    {
      success: true,
      enrollmentId: `ENR-${Date.now()}`,
      message: '수강 신청이 정상적으로 접수되었습니다.',
    },
    { status: 201 },
  );
}
