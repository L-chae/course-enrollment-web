import { httpClient } from '@/lib/httpClient';
import type { Course, CourseFilterCategory, CourseListResponse } from '@/types/course';

type GetCoursesParams = {
  category?: CourseFilterCategory;
  page?: number;
  limit?: number;
};

const COURSES_API_PATH = '/api/courses';
const COURSE_SEARCH_LIMIT = 1000;

export async function getCourses(params?: GetCoursesParams) {
  const searchParams = new URLSearchParams();

  if (params?.category) {
    searchParams.set('category', params.category);
  }
  if (typeof params?.page === 'number') {
    searchParams.set('page', String(params.page));
  }
  if (typeof params?.limit === 'number') {
    searchParams.set('limit', String(params.limit));
  }

  const queryString = searchParams.toString();
  const requestUrl = queryString ? `${COURSES_API_PATH}?${queryString}` : COURSES_API_PATH;

  return httpClient<CourseListResponse>(requestUrl, {
    cache: 'no-store',
  });
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  if (!courseId) {
    return null;
  }

  const { courses } = await getCourses({ page: 1, limit: COURSE_SEARCH_LIMIT });
  return courses.find((course) => course.id === courseId) || null;
}
