import Link from 'next/link';

import ApplyForm from '@/components/enrollment/ApplyForm';
import { getCourseById } from '@/lib/courseApi';

type ApplyPageProps = {
  searchParams: Promise<{
    courseId?: string;
  }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const { courseId } = await searchParams;
  const selectedCourse = courseId ? await getCourseById(courseId) : null;

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

  const isFull = selectedCourse.currentEnrollment >= selectedCourse.maxCapacity;

  if (isFull) {
    return (
      <main className="content-container enrollment-page">
        <section className="course-list-empty">
          <p className="text-h3">모집이 마감된 강좌입니다.</p>
          <p className="text-caption" style={{ marginTop: 'var(--space-sm)' }}>
            현재 선택한 강좌는 정원이 모두 찼습니다. 다른 강좌를 선택해 주세요.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={`/enrollment/${selectedCourse.id}`}
              className="text-brand-primary inline-block text-sm font-bold"
            >
              강좌 상세로 돌아가기
            </Link>
            <Link href="/enrollment" className="text-brand-primary inline-block text-sm font-bold">
              강좌 목록으로 돌아가기
            </Link>
          </div>
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
