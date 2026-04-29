import type { Course } from '@/types/course';

type CourseCapacityBadgeProps = Pick<Course, 'currentEnrollment' | 'maxCapacity'>;

export default function CourseCapacityBadge({
  currentEnrollment,
  maxCapacity,
}: CourseCapacityBadgeProps) {
  const remainingSeats = maxCapacity - currentEnrollment;

  if (currentEnrollment >= maxCapacity) {
    return <span className="course-capacity-badge badge-full">모집 마감</span>;
  }

  if (remainingSeats <= 3) {
    return <span className="course-capacity-badge badge-imminent">마감 임박</span>;
  }

  return <span className="course-capacity-badge badge-open">모집 중</span>;
}
