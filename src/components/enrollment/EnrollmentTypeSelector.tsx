'use client';

import Button from '@/components/ui/Button';

type EnrollmentType = 'personal' | 'group';

type EnrollmentTypeSelectorProps = {
  value: EnrollmentType;
  onChange: (type: EnrollmentType) => void;
};

export default function EnrollmentTypeSelector({ value, onChange }: EnrollmentTypeSelectorProps) {
  return (
    <section className="card" style={{ padding: 'var(--space-md)' }}>
      <p className="text-text-sub text-sm font-bold" style={{ marginBottom: 'var(--space-sm)' }}>
        신청 유형
      </p>
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
          onClick={() => onChange('group')}
        >
          단체 신청
        </Button>
      </div>
    </section>
  );
}
