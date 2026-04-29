'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ConfirmSummary from '@/components/enrollment/ConfirmSummary';
import Button from '@/components/ui/Button';
import { useEnrollSubmit } from '@/hooks/useEnrollSubmit';
import type { EnrollmentRequest } from '@/types/enrollment';

const ENROLLMENT_DRAFT_STORAGE_KEY = 'course-enrollment:draft';
const ENROLLMENT_RESULT_STORAGE_KEY = 'course-enrollment:result';

export default function ConfirmPage() {
  const router = useRouter();
  const { submit, isSubmitting, error } = useEnrollSubmit();
  const [enrollment, setEnrollment] = useState<EnrollmentRequest | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(ENROLLMENT_DRAFT_STORAGE_KEY);

    if (!stored) {
      setIsReady(true);
      return;
    }

    try {
      setEnrollment(JSON.parse(stored) as EnrollmentRequest);
    } catch {
      sessionStorage.removeItem(ENROLLMENT_DRAFT_STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!enrollment) {
      return;
    }

    try {
      setSubmitErrorMessage(null);
      const result = await submit(enrollment);

      if (!result) {
        return;
      }

      sessionStorage.setItem(ENROLLMENT_RESULT_STORAGE_KEY, JSON.stringify(result));
      sessionStorage.removeItem(ENROLLMENT_DRAFT_STORAGE_KEY);
      router.push('/complete');
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : '신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.';

      setSubmitErrorMessage(message);
    }
  };

  const handleEdit = () => {
    if (!enrollment) {
      router.push('/enrollment');
      return;
    }

    router.push(`/enrollment/apply?courseId=${enrollment.courseId}`);
  };

  if (!isReady) {
    return <div className="mx-auto w-full max-w-3xl p-6">신청 정보를 불러오는 중입니다...</div>;
  }

  if (!enrollment) {
    return (
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
        <h1 className="text-h2">확인할 신청 정보가 없습니다.</h1>
        <p className="text-body text-text-subtle">강좌 목록으로 이동해 다시 신청을 진행해 주세요.</p>
        <div>
          <Button type="button" onClick={() => router.push('/enrollment')}>
            강좌 목록으로 이동
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <header className="grid gap-2">
        <h1 className="text-h2">신청 내용 확인</h1>
        <p className="text-body text-text-subtle">입력한 정보를 확인한 뒤 최종 제출해 주세요.</p>
      </header>

      <ConfirmSummary enrollment={enrollment} />
      {(submitErrorMessage || error?.message) && <p className="text-error">{submitErrorMessage ?? error?.message}</p>}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={handleEdit} disabled={isSubmitting}>
          이전
        </Button>
        <Button type="button" onClick={handleSubmit} isLoading={isSubmitting} disabled={isSubmitting}>
          최종 제출
        </Button>
      </div>
    </section>
  );
}
