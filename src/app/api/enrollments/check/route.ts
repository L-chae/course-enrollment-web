import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId')?.trim();
  const email = searchParams.get('email')?.trim();

  if (!courseId || !email) {
    return NextResponse.json(
      {
        duplicated: false,
        message: 'courseId와 email이 필요합니다.',
      },
      { status: 400 },
    );
  }

  if (email === 'duplicate@example.com') {
    return NextResponse.json({
      duplicated: true,
      message: '이미 신청한 강좌입니다.',
    });
  }

  return NextResponse.json({
    duplicated: false,
  });
}
