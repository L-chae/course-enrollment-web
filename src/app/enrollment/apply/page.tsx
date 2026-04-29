import Link from 'next/link';

import ApplyForm from '@/components/enrollment/ApplyForm';
import { MOCK_COURSES } from '@/mocks/courses';

type ApplyPageProps = {
  searchParams: Promise<{
    courseId?: string;
  }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const { courseId } = await searchParams;
  const selectedCourse = MOCK_COURSES.find((course) => course.id === courseId);

  if (!selectedCourse) {
    return (
      <main className="content-container enrollment-page">
        <section className="course-list-empty">
          <p className="text-h3">선택된 강좌가 없습니다.</p>
          <p className="text-caption" style={{ marginTop: 'var(--space-sm)' }}>
            강좌 목록에서 신청할 강좌를 먼저 선택해 주세요.
          </p>
          <Link href="/enrollment" className="text-brand-primary mt-4 inline-block text-sm font-bold">
            강좌 목록으로 돌아가기
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="content-container enrollment-page">
      <header className="enrollment-header">
        <h1 className="text-h2">수강 신청 정보 입력</h1>
        <p className="text-caption">신청 유형과 기본 정보를 입력해 주세요.</p>
      </header>

      <section className="card mb-6 p-6">
        <p className="text-caption">선택 강좌</p>
        <h2 className="text-h3">{selectedCourse.title}</h2>
        <p className="text-caption">강사 {selectedCourse.instructor}</p>
      </section>

      <ApplyForm courseId={selectedCourse.id} />
    </main>
  );
}
