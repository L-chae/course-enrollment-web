import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Input from '@/components/ui/Input';

type GroupFieldsProps = {
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
};

export default function GroupFields({ register, errors }: GroupFieldsProps) {
  const groupErrors = (
    errors as FieldErrors<Extract<EnrollmentSchema, { type: 'group' }>>
  ).group;

  return (
    <section className="card" style={{ padding: 'var(--space-md)' }}>
      <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>
        단체 정보
      </h3>

      {groupErrors?.message ? <p className="text-error">{groupErrors.message as string}</p> : null}

      <Input
        label="단체명"
        required
        {...register('group.organizationName')}
        error={groupErrors?.organizationName?.message as string | undefined}
      />

      <Input
        label="신청 인원수"
        type="number"
        min={2}
        max={10}
        required
        {...register('group.headCount', { valueAsNumber: true })}
        error={groupErrors?.headCount?.message as string | undefined}
      />

      <Input
        label="담당자 연락처"
        type="tel"
        required
        {...register('group.contactPerson')}
        error={groupErrors?.contactPerson?.message as string | undefined}
      />
    </section>
  );
}
