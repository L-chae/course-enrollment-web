'use client';

import { COURSE_FILTER_CATEGORIES, COURSE_FILTER_LABELS } from '@/constants';

import type { CourseFilterCategory } from './CourseList';

type CategoryFilterProps = {
  selectedCategory: CourseFilterCategory;
  onChange: (category: CourseFilterCategory) => void;
};

const CATEGORY_OPTIONS: Array<{ value: CourseFilterCategory; label: string }> =
  COURSE_FILTER_CATEGORIES.map((value) => ({
    value,
    label: COURSE_FILTER_LABELS[value],
  }));

export default function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter-toolbar" role="tablist" aria-label="카테고리 필터">
      {CATEGORY_OPTIONS.map((option) => {
        const isActive = selectedCategory === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`category-filter-button ${isActive ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
