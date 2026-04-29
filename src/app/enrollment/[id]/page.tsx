import { notFound } from 'next/navigation';

import CourseDetail from '@/components/course/CourseDetail';
import { MOCK_COURSES } from '@/mocks/courses';

type CourseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = MOCK_COURSES.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <main className="content-container enrollment-page">
      <CourseDetail course={course} />
    </main>
  );
}
