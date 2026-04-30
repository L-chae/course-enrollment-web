import { notFound } from 'next/navigation';

import CourseDetail from '@/components/course/CourseDetail';
import { getCourseById } from '@/lib/courseApi';

type CourseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <main className="content-container enrollment-page">
      <CourseDetail course={course} />
    </main>
  );
}
