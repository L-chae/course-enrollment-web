import type { Category, Course } from '@/types/course';

import CourseCard from './CourseCard';

export type CourseFilterCategory = 'all' | Category;

type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ courses }: CourseListProps) {
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
