'use client';

import { useEffect, useState } from 'react';

import { getCourseById } from '@/lib/courseApi';
import type { Course } from '@/types/course';

type UseCourseResult = {
  course: Course | null;
  isLoading: boolean;
  error: Error | null;
};

export function useCourse(courseId?: string): UseCourseResult {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = courseId ? await getCourseById(courseId) : null;
        if (!isCancelled) {
          setCourse(response);
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

    void fetchCourse();

    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  return { course, isLoading, error };
}
