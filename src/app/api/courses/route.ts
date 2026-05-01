import { NextResponse } from 'next/server';

import { COURSE_CATEGORIES, COURSES_PER_PAGE } from '@/constants';
import { MOCK_COURSES } from '@/mocks/courses';
import type { CourseListResponse } from '@/types/course';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 1. 필터링 파라미터
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || String(COURSES_PER_PAGE)); // 한 페이지당 6개

  // 2. 카테고리 필터링
  const normalizedCategory = category?.toLowerCase();
  const isAllCategory = normalizedCategory === 'all';
  const filtered = isAllCategory
    ? MOCK_COURSES
    : category
      ? MOCK_COURSES.filter((course) => course.category === category)
      : MOCK_COURSES;

  // 3. 페이지네이션 계산
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCourses = filtered.slice(startIndex, startIndex + limit);

  const response: CourseListResponse = {
    courses: paginatedCourses,
    categories: COURSE_CATEGORIES,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  };

  return NextResponse.json(response);
}
