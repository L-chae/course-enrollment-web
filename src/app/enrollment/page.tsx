'use client';

import { useState } from 'react';

import CategoryFilter from '@/components/course/CategoryFilter';
import CourseList, { type CourseFilterCategory } from '@/components/course/CourseList';
import Pagination from '@/components/ui/Pagination';
import { MOCK_COURSES } from '@/mocks/courses';

const ITEMS_PER_PAGE = 6;

export default function EnrollmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<CourseFilterCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses =
    selectedCategory === 'all'
      ? MOCK_COURSES
      : MOCK_COURSES.filter((course) => course.category === selectedCategory);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      <CourseList courses={paginatedCourses} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
