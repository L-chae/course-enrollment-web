import { NextResponse } from 'next/server';
import { EnrollmentRequest } from '@/types/enrollment';

export async function POST(request: Request) {
  const body: EnrollmentRequest = await request.json();

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
