import Image from 'next/image';
import Link from 'next/link';

import type { Course } from '@/types/course';

import CourseCapacityBadge from './CourseCapacityBadge';

const CATEGORY_LABELS: Record<Course['category'], string> = {
  development: '개발',
  design: '디자인',
  marketing: '마케팅',
  business: '비즈니스',
};

type CourseCardProps = {
  course: Course;
};

const formatCourseDate = (isoDate: string) => new Date(isoDate).toLocaleDateString('ko-KR');

export default function CourseCard({ course }: CourseCardProps) {
  const imageUrl = `https://picsum.photos/seed/${course.id}/640/360`;

  return (
    <Link href={`/enrollment/${course.id}`} className="course-card card-interactive">
      <div className="course-card-image-wrap">
        <Image
          className="course-card-image"
          src={imageUrl}
          alt={course.title}
          fill
          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <CourseCapacityBadge
          currentEnrollment={course.currentEnrollment}
          maxCapacity={course.maxCapacity}
        />
      </div>

      <div className="course-card-content">
        <span className="course-category-chip">{CATEGORY_LABELS[course.category]}</span>
        <h3 className="course-title">{course.title}</h3>
        <div className="flex flex-col gap-1">
          <p className="course-instructor">강사 {course.instructor}</p>
          <p className="course-capacity-text">
            기간 {formatCourseDate(course.startDate)} ~ {formatCourseDate(course.endDate)}
          </p>
        </div>

        <div className="course-card-footer">
          <span className="course-price">{course.price.toLocaleString()}원</span>
          <span className="course-capacity-text inline-flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M22 21v-2a4 4 0 0 0-3-3.87"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {course.currentEnrollment}/{course.maxCapacity}명
          </span>
        </div>
      </div>
    </Link>
  );
}
