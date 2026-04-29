import { MOCK_COURSES } from '@/mocks/courses';
import type { Course } from '@/types/course';

import CourseCard from './CourseCard';

export type CourseFilterCategory = 'all' | 'development' | 'design' | 'business';

type CourseListProps = {
  selectedCategory: CourseFilterCategory;
};

const filterCourses = (selectedCategory: CourseFilterCategory, courses: Course[]) => {
  if (selectedCategory === 'all') {
    return courses;
  }

  return courses.filter((course) => course.category === selectedCategory);
};

export default function CourseList({ selectedCategory }: CourseListProps) {
  const courses = filterCourses(selectedCategory, MOCK_COURSES);

  if (courses.length === 0) {
    return <p className="course-list-empty">조건에 맞는 강좌가 없습니다.</p>;
  }

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
