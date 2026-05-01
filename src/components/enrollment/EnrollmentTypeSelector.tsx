'use client';

import Button from '@/components/ui/Button';

type EnrollmentType = 'personal' | 'group';

type EnrollmentTypeSelectorProps = {
  value: EnrollmentType;
  onChange: (type: EnrollmentType) => void;
  isGroupDisabled?: boolean;
};

export default function EnrollmentTypeSelector({
  value,
  onChange,
  isGroupDisabled = false,
}: EnrollmentTypeSelectorProps) {
  return (
    <section className="card p-4">
      <p className="text-text-sub mb-2 text-sm font-bold">신청 유형</p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={value === 'personal' ? 'primary' : 'secondary'}
          className="flex-1"
          onClick={() => onChange('personal')}
        >
          개인 신청
        </Button>
        <Button
          type="button"
          variant={value === 'group' ? 'primary' : 'secondary'}
          className="flex-1"
          disabled={isGroupDisabled}
          onClick={() => onChange('group')}
        >
          단체 신청
        </Button>
      </div>
      {isGroupDisabled ? (
        <p className="text-caption text-text-sub mt-2">
          잔여 인원이 부족해 단체 신청을 선택할 수 없습니다.
        </p>
      ) : null}
    </section>
  );
}
