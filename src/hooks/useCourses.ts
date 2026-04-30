'use client';

import { useEffect, useState } from 'react';

import { getCourses } from '@/lib/courseApi';
import type { CourseFilterCategory, CourseListResponse } from '@/types/course';

type UseCoursesParams = {
  category: CourseFilterCategory;
  page: number;
  limit: number;
};

type UseCoursesResult = {
  data: CourseListResponse | null;
  isLoading: boolean;
  error: Error | null;
};

export function useCourses({ category, page, limit }: UseCoursesParams): UseCoursesResult {
  const [data, setData] = useState<CourseListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getCourses({ category, page, limit });
        if (!isCancelled) {
          setData(response);
        }
      } catch (unknownError) {
        if (!isCancelled) {
          setError(unknownError instanceof Error ? unknownError : new Error('강좌 조회에 실패했습니다.'));
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchCourses();

    return () => {
      isCancelled = true;
    };
  }, [category, page, limit]);

  return { data, isLoading, error };
}
