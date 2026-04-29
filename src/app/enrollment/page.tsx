'use client';

import { useState } from 'react';

import CategoryFilter from '@/components/course/CategoryFilter';
import CourseList, { type CourseFilterCategory } from '@/components/course/CourseList';

export default function EnrollmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<CourseFilterCategory>('all');

  return (
    <main className="content-container enrollment-page">
      <header className="enrollment-header">
        <h1 className="text-h2">수강신청</h1>
        <p className="text-caption">카테고리를 선택하고 원하는 강좌를 확인해보세요.</p>
      </header>

      <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      <CourseList selectedCategory={selectedCategory} />
    </main>
  );
}
