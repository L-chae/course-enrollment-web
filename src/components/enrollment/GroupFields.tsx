import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FORM_LIMITS } from '@/constants';
import type { EnrollmentSchema } from '@/lib/schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type GroupFieldsProps = {
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
  remainingSeats: number;
  headCount?: number;
  onHeadCountChange: (nextHeadCount: number) => void;
};

export default function GroupFields({
  register,
  errors,
  remainingSeats,
  headCount,
  onHeadCountChange,
}: GroupFieldsProps) {
  const groupErrors = (
    errors as FieldErrors<Extract<EnrollmentSchema, { type: 'group' }>>
  ).group;
  const minHeadCount = FORM_LIMITS.groupMinHeadCount;
  const maxHeadCount = Math.max(minHeadCount, Math.min(FORM_LIMITS.groupMaxHeadCount, remainingSeats));
  const currentHeadCount =
    typeof headCount === 'number' && Number.isFinite(headCount)
      ? Math.min(Math.max(headCount, minHeadCount), maxHeadCount)
      : minHeadCount;
  return (
    <section className="card flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-h3">단체 정보</h3>
        <span className="text-caption">최대 {maxHeadCount}명</span>
      </div>

      {groupErrors?.message ? <p className="text-error mt-2">{groupErrors.message as string}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="단체명"
          required
          {...register('group.organizationName')}
          error={groupErrors?.organizationName?.message as string | undefined}
        />

        <Input
          label="담당자 연락처"
          type="tel"
          required
          {...register('group.contactPerson')}
          error={groupErrors?.contactPerson?.message as string | undefined}
        />
      </div>

      <div className="rounded-sm border border-border-subtle bg-bg-sunken p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-caption">신청 인원수</p>
            <p className="text-caption text-text-sub">
              입력한 인원수에 맞춰 참가자 입력칸이 자동 조정됩니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onHeadCountChange(currentHeadCount - 1)}
              disabled={currentHeadCount <= minHeadCount}
            >
              -
            </Button>
            <input
              type="number"
              min={minHeadCount}
              max={maxHeadCount}
              value={currentHeadCount}
              onChange={(event) => {
                const nextValue = Number(event.target.value);
                if (Number.isNaN(nextValue)) {
                  return;
                }
                onHeadCountChange(nextValue);
              }}
              className="input-standard w-20 text-center"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => onHeadCountChange(currentHeadCount + 1)}
              disabled={currentHeadCount >= maxHeadCount}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
