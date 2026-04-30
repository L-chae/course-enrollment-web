'use client';

import { useState } from 'react';

import CategoryFilter from '@/components/course/CategoryFilter';
import CourseList, { type CourseFilterCategory } from '@/components/course/CourseList';
import Pagination from '@/components/ui/Pagination';
import { COURSES_PER_PAGE } from '@/constants';
import { useCourses } from '@/hooks/useCourses';

export default function EnrollmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<CourseFilterCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useCourses({
    category: selectedCategory,
    page: currentPage,
    limit: COURSES_PER_PAGE,
  });
  const courses = data?.courses ?? [];
  const totalPages = data?.pagination.totalPages ?? 0;

  const handleCategoryChange = (category: CourseFilterCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="content-container enrollment-page">
      <header className="enrollment-header">
        <h1 className="text-h2">수강신청</h1>
        <p className="text-caption">카테고리를 선택하고 원하는 강좌를 확인해보세요.</p>
      </header>

      <CategoryFilter selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      {isLoading ? <p className="course-list-empty">강좌 목록을 불러오는 중입니다.</p> : null}
      {error ? <p className="course-list-empty">강좌 목록 조회에 실패했습니다.</p> : null}
      {!isLoading && !error ? <CourseList courses={courses} /> : null}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
