'use client';

import type { CourseFilterCategory } from './CourseList';

type CategoryFilterProps = {
  selectedCategory: CourseFilterCategory;
  onChange: (category: CourseFilterCategory) => void;
};

const CATEGORY_OPTIONS: Array<{ value: CourseFilterCategory; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'development', label: '개발' },
  { value: 'design', label: '디자인' },
  { value: 'marketing', label: '마케팅' },
  { value: 'business', label: '비즈니스' },
];

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
