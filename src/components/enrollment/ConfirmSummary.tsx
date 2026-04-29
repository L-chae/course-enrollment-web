import type { ReactNode } from 'react';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { EnrollmentRequest } from '@/types/enrollment';

type ConfirmSummaryProps = {
  enrollment: EnrollmentRequest;
  onEdit?: (section: string) => void;
};

type SummarySectionProps = {
  title: string;
  sectionKey: string;
  onEdit?: (section: string) => void;
  children: ReactNode;
};

function SummarySection({ title, sectionKey, onEdit, children }: SummarySectionProps) {
  return (
    <section className="border-border-subtle border-b pb-4 last:border-b-0 last:pb-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-h3">{title}</h3>
        {onEdit ? (
          <Button type="button" variant="ghost" className="text-sm" onClick={() => onEdit(sectionKey)}>
            수정
          </Button>
        ) : null}
      </div>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
      <span className="text-caption">{label}</span>
      <span className="text-body">{value}</span>
    </div>
  );
}

export default function ConfirmSummary({ enrollment, onEdit }: ConfirmSummaryProps) {
  const applicant = enrollment.applicant;
  const typeLabel = enrollment.type === 'group' ? '단체 신청' : '개인 신청';

  return (
    <Card className="flex flex-col gap-4">
      <SummarySection title="신청 정보" sectionKey="type" onEdit={onEdit}>
        <SummaryRow label="신청 유형" value={typeLabel} />
        <SummaryRow label="강좌 ID" value={enrollment.courseId} />
        <SummaryRow label="약관 동의" value={enrollment.agreedToTerms ? '동의 완료' : '미동의'} />
      </SummarySection>

      <SummarySection title="신청자 정보" sectionKey="applicant" onEdit={onEdit}>
        <SummaryRow label="이름" value={applicant.name} />
        <SummaryRow label="이메일" value={applicant.email} />
        <SummaryRow label="연락처" value={applicant.phone} />
        <SummaryRow label="수강동기" value={applicant.motivation || '-'} />
      </SummarySection>

      {enrollment.type === 'group' ? (
        <SummarySection title="단체 정보" sectionKey="group" onEdit={onEdit}>
          <SummaryRow label="단체명" value={enrollment.group.organizationName} />
          <SummaryRow label="신청 인원수" value={`${enrollment.group.headCount}명`} />
          <SummaryRow label="담당자 연락처" value={enrollment.group.contactPerson} />
          <div className="grid gap-2">
            <span className="text-caption">참가자 명단</span>
            <ul className="grid gap-2">
              {enrollment.group.participants.map((participant, index) => (
                <li key={`${participant.email}-${index}`} className="border-border-subtle rounded-sm border p-3">
                  <p className="text-body font-bold">{participant.name}</p>
                  <p className="text-caption">{participant.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </SummarySection>
      ) : null}
    </Card>
  );
}
