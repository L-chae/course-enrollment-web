'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import type { EnrollmentResponse } from '@/types/enrollment';

const ENROLLMENT_RESULT_STORAGE_KEY = 'course-enrollment:result';

export default function CompletePage() {
  const router = useRouter();
  const [result, setResult] = useState<EnrollmentResponse | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      const stored = sessionStorage.getItem(ENROLLMENT_RESULT_STORAGE_KEY);

      if (!stored) {
        if (isActive) {
          setIsReady(true);
        }
        return;
      }

      try {
        if (isActive) {
          setResult(JSON.parse(stored) as EnrollmentResponse);
        }
      } catch {
        sessionStorage.removeItem(ENROLLMENT_RESULT_STORAGE_KEY);
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const handleGoToCourses = () => {
    router.push('/enrollment');
  };

  if (!isReady) {
    return (
      <section className="content-container enrollment-page">
        <div className="card flex flex-col gap-4 p-6">
          <p className="text-body">신청 결과를 확인하는 중입니다.</p>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="content-container enrollment-page">
        <div className="card flex flex-col gap-4 p-6">
          <h1 className="text-h2">신청 완료 정보를 찾을 수 없습니다.</h1>
          <p className="text-body">강좌 목록으로 이동해 다시 진행해 주세요.</p>
          <div>
            <Button type="button" onClick={handleGoToCourses}>
              강좌 목록으로 이동
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-container enrollment-page">
      <div className="card flex flex-col gap-4 p-6">
        <h1 className="text-h2">수강 신청 완료</h1>
        <p className="text-body">{result.message}</p>
        <div className="grid gap-1">
          <p className="text-caption">신청번호</p>
          <p className="text-h3">{result.enrollmentId}</p>
        </div>
        <div>
          <Button type="button" onClick={handleGoToCourses}>
            강좌 목록으로 이동
          </Button>
        </div>
      </div>
    </section>
  );
}
