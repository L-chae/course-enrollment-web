import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Button from '@/components/ui/Button';

type ParticipantFieldsProps = {
  fields: FieldArrayWithId<EnrollmentSchema, 'group.participants', 'id'>[];
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
  headCount?: number;
  completedCount: number;
  onRemoveParticipant: (index: number) => void;
};

export default function ParticipantFields({
  fields,
  register,
  errors,
  headCount,
  completedCount,
  onRemoveParticipant,
}: ParticipantFieldsProps) {
  const participantsErrors = (
    errors as FieldErrors<Extract<EnrollmentSchema, { type: 'group' }>>
  ).group?.participants;
  const arrayLevelError =
    participantsErrors && !Array.isArray(participantsErrors)
      ? (participantsErrors.message as string | undefined)
      : undefined;
  const requiredHeadCount =
    typeof headCount === 'number' && Number.isFinite(headCount) ? headCount : fields.length;
  const remainingInputCount = Math.max(requiredHeadCount - completedCount, 0);

  return (
    <section className="card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-h3">참가자 명단</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-bg-sunken px-3 py-1 text-caption">
            {completedCount} / {requiredHeadCount}명 완료
          </span>
          {remainingInputCount > 0 ? (
            <span className="text-caption">{remainingInputCount}명 남음</span>
          ) : null}
        </div>
      </div>

      {arrayLevelError ? <p className="text-error">{arrayLevelError}</p> : null}

      <div className="grid gap-3">
        {fields.map((field, index) => {
          const itemErrors = Array.isArray(participantsErrors) ? participantsErrors[index] : undefined;

          return (
            <div
              key={field.id}
              className="grid gap-3 rounded-sm border border-border-subtle p-3 md:grid-cols-[48px_1fr_1fr_auto] md:items-start"
            >
              <span className="text-caption md:pt-3">{index + 1}번</span>
              <div className="flex flex-col gap-1">
                <label className="text-text-sub text-sm font-bold">이름</label>
                <input
                  className={`input-standard ${itemErrors?.name ? 'input-error' : ''}`}
                  {...register(`group.participants.${index}.name` as const)}
                />
                {itemErrors?.name?.message ? (
                  <p className="text-error text-xs">{itemErrors.name.message as string}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-text-sub text-sm font-bold">이메일</label>
                <input
                  type="email"
                  className={`input-standard ${itemErrors?.email ? 'input-error' : ''}`}
                  {...register(`group.participants.${index}.email` as const)}
                />
                {itemErrors?.email?.message ? (
                  <p className="text-error text-xs">{itemErrors.email.message as string}</p>
                ) : null}
              </div>
              <div className="flex justify-end md:pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="px-3 py-2 text-sm"
                  onClick={() => onRemoveParticipant(index)}
                  disabled={fields.length <= 2}
                >
                  삭제
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
