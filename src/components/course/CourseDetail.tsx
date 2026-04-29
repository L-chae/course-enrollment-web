import Link from 'next/link';

import type { Course } from '@/types/course';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CourseCapacityBadge from './CourseCapacityBadge';

const CATEGORY_LABELS: Record<Course['category'], string> = {
  development: '개발',
  design: '디자인',
  marketing: '마케팅',
  business: '비즈니스',
};

const formatCourseDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

type CourseDetailProps = {
  course: Course;
};

export default function CourseDetail({ course }: CourseDetailProps) {
  const isFull = course.currentEnrollment >= course.maxCapacity;

  return (
    <Card className="relative flex flex-col gap-4">
      <div className="absolute top-6 right-6">
        <CourseCapacityBadge
          currentEnrollment={course.currentEnrollment}
          maxCapacity={course.maxCapacity}
        />
      </div>

      <span className="course-category-chip">{CATEGORY_LABELS[course.category]}</span>
      <h1 className="text-h2">{course.title}</h1>
      <p className="text-body text-text-sub">{course.description}</p>

      <div className="grid gap-2">
        <p className="course-instructor">강사 {course.instructor}</p>
        <p className="course-capacity-text">
          기간 {formatCourseDate(course.startDate)} ~ {formatCourseDate(course.endDate)}
        </p>
        <p className="course-capacity-text">
          정원 {course.currentEnrollment}/{course.maxCapacity}명
        </p>
        <p className="course-price">{course.price.toLocaleString()}원</p>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {isFull ? (
          <Button type="button" disabled className="cursor-not-allowed opacity-60">
            모집 마감
          </Button>
        ) : (
          <Link href={`/enrollment/apply?courseId=${course.id}`}>
            <Button type="button">수강 신청하기</Button>
          </Link>
        )}
        <Link href="/enrollment" className="text-caption hover:text-text-main transition-colors">
          목록으로 돌아가기
        </Link>
      </div>
    </Card>
  );
}
