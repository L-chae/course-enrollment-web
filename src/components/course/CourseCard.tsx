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
        <p className="course-instructor">강사 {course.instructor}</p>

        <div className="course-card-footer">
          <span className="course-price">{course.price.toLocaleString()}원</span>
          <span className="course-capacity-text">
            {course.currentEnrollment}/{course.maxCapacity}명
          </span>
        </div>
      </div>
    </Link>
  );
}
