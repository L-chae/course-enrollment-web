import { NextResponse } from 'next/server';
import { MOCK_COURSES } from '@/mocks/courses';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 1. 필터링 파라미터
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6'); // 한 페이지당 6개

  // 2. 카테고리 필터링
  const filtered =
    category && category !== 'All'
      ? MOCK_COURSES.filter((c) => c.category === category)
      : MOCK_COURSES;

  // 3. 페이지네이션 계산
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCourses = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    courses: paginatedCourses,
    categories: ['development', 'design', 'marketing', 'business'],
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  });
}
