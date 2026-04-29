import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';

import type { EnrollmentSchema } from '@/lib/schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type ParticipantFieldsProps = {
  fields: FieldArrayWithId<EnrollmentSchema, 'group.participants', 'id'>[];
  register: UseFormRegister<EnrollmentSchema>;
  errors: FieldErrors<EnrollmentSchema>;
  append: UseFieldArrayAppend<EnrollmentSchema, 'group.participants'>;
  remove: UseFieldArrayRemove;
};

export default function ParticipantFields({
  fields,
  register,
  errors,
  append,
  remove,
}: ParticipantFieldsProps) {
  const participantsErrors = (
    errors as FieldErrors<Extract<EnrollmentSchema, { type: 'group' }>>
  ).group?.participants;
  const arrayLevelError =
    participantsErrors && !Array.isArray(participantsErrors)
      ? (participantsErrors.message as string | undefined)
      : undefined;

  return (
    <section className="card" style={{ padding: 'var(--space-md)' }}>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 'var(--space-md)', gap: 'var(--space-sm)' }}
      >
        <h3 className="text-h3">참가자 명단</h3>
        <Button type="button" variant="secondary" onClick={() => append({ name: '', email: '' })}>
          참가자 추가
        </Button>
      </div>

      {arrayLevelError ? <p className="text-error">{arrayLevelError}</p> : null}

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const itemErrors = Array.isArray(participantsErrors) ? participantsErrors[index] : undefined;

          return (
            <section key={field.id} className="card" style={{ padding: 'var(--space-md)' }}>
              <p className="text-caption" style={{ marginBottom: 'var(--space-sm)' }}>
                참가자 {index + 1}
              </p>

              <Input
                label="이름"
                required
                {...register(`group.participants.${index}.name` as const)}
                error={itemErrors?.name?.message as string | undefined}
              />

              <Input
                label="이메일"
                type="email"
                required
                {...register(`group.participants.${index}.email` as const)}
                error={itemErrors?.email?.message as string | undefined}
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  참가자 삭제
                </Button>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
