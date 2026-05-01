import type { Category, CourseFilterCategory } from '@/types/course';

export const COURSE_CATEGORIES: Category[] = ['development', 'design', 'marketing', 'business'];

export const CATEGORY_LABELS: Record<Category, string> = {
  development: '개발',
  design: '디자인',
  marketing: '마케팅',
  business: '비즈니스',
};

export const COURSE_FILTER_CATEGORIES: CourseFilterCategory[] = ['all', ...COURSE_CATEGORIES];

export const COURSE_FILTER_LABELS: Record<CourseFilterCategory, string> = {
  all: '전체',
  ...CATEGORY_LABELS,
};

export const COURSES_PER_PAGE = 6;

export const ENROLLMENT_DRAFT_STORAGE_KEY = 'course-enrollment:draft';
export const ENROLLMENT_RESULT_STORAGE_KEY = 'course-enrollment:result';
export const FORM_PERSIST_STORAGE_PREFIX = 'course-enrollment:form';

export const FORM_LIMITS = {
  applicantNameMinLength: 2,
  applicantNameMaxLength: 20,
  motivationMaxLength: 300,
  groupMinHeadCount: 2,
  groupMaxHeadCount: 10,
} as const;

export const PHONE_REGEX = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-?\d{3,4}-?\d{4})$/;
