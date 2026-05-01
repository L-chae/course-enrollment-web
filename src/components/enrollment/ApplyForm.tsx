'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray } from 'react-hook-form';

import ApplicantFields from '@/components/enrollment/ApplicantFields';
import EnrollmentTypeSelector from '@/components/enrollment/EnrollmentTypeSelector';
import GroupFields from '@/components/enrollment/GroupFields';
import ParticipantFields from '@/components/enrollment/ParticipantFields';
import TermsAgreement from '@/components/enrollment/TermsAgreement';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { FORM_LIMITS, FORM_PERSIST_STORAGE_PREFIX } from '@/constants';
import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import { useEnrollForm } from '@/hooks/useEnrollForm';
import { useEnrollSubmit } from '@/hooks/useEnrollSubmit';
import { useFormPersist } from '@/hooks/useFormPersist';
import type { EnrollmentSchema } from '@/lib/schema';
import { checkEnrollmentDuplicate } from '@/lib/enrollmentApi';
import type { EnrollmentResponse } from '@/types/enrollment';

type ApplyFormProps = {
  courseId: string;
  title: string;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  isMockMode?: boolean;
};

export default function ApplyForm({
  courseId,
  title,
  price,
  maxCapacity,
  currentEnrollment,
  isMockMode = false,
}: ApplyFormProps) {
  const router = useRouter();
  const { submit, isSubmitting } = useEnrollSubmit();
  const [isLeavingSafely, setIsLeavingSafely] = useState(false);
  const [isTypeChangeModalOpen, setIsTypeChangeModalOpen] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const [completedResult, setCompletedResult] = useState<EnrollmentResponse | null>(null);
  const [duplicateCheckResult, setDuplicateCheckResult] = useState<{
    email: string;
    duplicated: boolean;
    message?: string;
  } | null>(null);
  const remainingSeats = Math.max(0, maxCapacity - currentEnrollment);
  const maxGroupHeadCount = Math.min(FORM_LIMITS.groupMaxHeadCount, remainingSeats);
  const isGroupUnavailable = remainingSeats < FORM_LIMITS.groupMinHeadCount;
  const draftStorageKey = `${FORM_PERSIST_STORAGE_PREFIX}:${courseId}`;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
    getValues,
    clearErrors,
  } = useEnrollForm();

  useFormPersist({
    courseId,
    watch,
    reset,
    getValues,
  });

  useBeforeUnload({
    enabled: isDirty && !isLeavingSafely,
  });

  const {
    fields: participantFields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: 'group.participants',
  });

  const selectedType = watch('type') ?? 'personal';
  const headCount = watch('group.headCount');
  const applicantName = watch('applicant.name');
  const applicantEmail = watch('applicant.email');
  const applicantPhone = watch('applicant.phone');
  const groupOrganizationName = watch('group.organizationName');
  const groupContactPerson = watch('group.contactPerson');
  const participants = watch('group.participants') ?? [];
  const trimmedApplicantEmail = applicantEmail?.trim() ?? '';
  const normalizedHeadCount =
    typeof headCount === 'number' && Number.isFinite(headCount) ? headCount : FORM_LIMITS.groupMinHeadCount;
  const displayHeadCount =
    selectedType === 'group' ? Math.min(normalizedHeadCount, FORM_LIMITS.groupMaxHeadCount) : 1;
  const totalPrice = selectedType === 'group' ? price * Math.max(normalizedHeadCount, 0) : price;
  const typeLabel = selectedType === 'group' ? '단체 신청' : '개인 신청';
  const isDuplicateEnrollment =
    trimmedApplicantEmail.length > 0 &&
    duplicateCheckResult?.email === trimmedApplicantEmail &&
    duplicateCheckResult.duplicated;
  const isSubmitDisabled =
    isSubmitting ||
    isDuplicateEnrollment ||
    (selectedType === 'group' && isGroupUnavailable) ||
    (selectedType === 'group' && normalizedHeadCount > maxGroupHeadCount);
  const submitButtonLabel = isSubmitting
    ? '처리 중...'
    : isDuplicateEnrollment
      ? '이미 신청한 강좌'
      : selectedType === 'group' && isGroupUnavailable
        ? '단체 신청 불가'
      : selectedType === 'group' && normalizedHeadCount > maxGroupHeadCount
        ? '신청 인원 조정 필요'
        : '신청 완료';
  const submitBlockReason = submitErrorMessage
    ? submitErrorMessage
    : isDuplicateEnrollment
      ? '이미 신청한 이력이 있어 제출할 수 없습니다.'
      : selectedType === 'group' && normalizedHeadCount > maxGroupHeadCount
        ? '신청 인원이 잔여석을 초과해 제출할 수 없습니다.'
        : selectedType === 'group' && isGroupUnavailable
          ? '잔여 인원이 부족해 단체 신청을 진행할 수 없습니다.'
          : null;
  const summaryStatusMessage = submitBlockReason
    ? submitBlockReason
    : isGroupUnavailable
      ? '잔여 인원 부족으로 단체 신청이 불가합니다.'
      : '신청 정보를 확인한 뒤 제출해 주세요.';
  const summaryStatusClass = submitBlockReason ? 'text-error' : 'text-caption text-text-sub';
  const visibleParticipants = participants.filter(
    (participant) => participant.name.trim().length > 0 || participant.email.trim().length > 0,
  );
  const completedParticipantCount = participants.filter(
    (participant) => participant?.name?.trim() && participant?.email?.trim(),
  ).length;

  const resetGroupValues = useCallback(() => {
    setValue('group.organizationName', '');
    setValue('group.headCount', FORM_LIMITS.groupMinHeadCount);
    setValue('group.contactPerson', '');
    replace([]);
    clearErrors('group');
  }, [clearErrors, replace, setValue]);

  const handleHeadCountChange = useCallback((nextHeadCount: number) => {
    if (selectedType !== 'group') {
      return;
    }

    const clampedHeadCount = Math.min(
      Math.max(nextHeadCount, FORM_LIMITS.groupMinHeadCount),
      maxGroupHeadCount,
    );
    setValue('group.headCount', clampedHeadCount, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [maxGroupHeadCount, selectedType, setValue]);

  const handleParticipantRemove = useCallback((index: number) => {
    if (selectedType !== 'group' || participantFields.length <= FORM_LIMITS.groupMinHeadCount) {
      return;
    }

    remove(index);
    const nextHeadCount = Math.max(
      FORM_LIMITS.groupMinHeadCount,
      normalizedHeadCount - 1,
    );
    setValue('group.headCount', nextHeadCount, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [normalizedHeadCount, participantFields.length, remove, selectedType, setValue]);

  useEffect(() => {
    setValue('courseId', courseId);
  }, [courseId, setValue]);

  useEffect(() => {
    if (selectedType !== 'group' || isGroupUnavailable) {
      return;
    }

    const targetHeadCount = Math.min(
      Math.max(normalizedHeadCount, FORM_LIMITS.groupMinHeadCount),
      maxGroupHeadCount,
    );

    if (targetHeadCount !== normalizedHeadCount) {
      setValue('group.headCount', targetHeadCount);
      return;
    }
  }, [isGroupUnavailable, maxGroupHeadCount, normalizedHeadCount, selectedType, setValue]);

  useEffect(() => {
    if (selectedType !== 'group' || isGroupUnavailable) {
      return;
    }

    const targetHeadCount = Math.min(
      Math.max(normalizedHeadCount, FORM_LIMITS.groupMinHeadCount),
      maxGroupHeadCount,
    );
    const participants = getValues('group.participants') ?? [];

    if (participants.length === targetHeadCount) {
      return;
    }
    if (participants.length < targetHeadCount) {
      for (let index = participants.length; index < targetHeadCount; index += 1) {
        append({ name: '', email: '' });
      }
      return;
    }

    for (let index = participants.length - 1; index >= targetHeadCount; index -= 1) {
      remove(index);
    }
  }, [
    append,
    getValues,
    isGroupUnavailable,
    maxGroupHeadCount,
    normalizedHeadCount,
    remove,
    selectedType,
  ]);

  useEffect(() => {
    if (!trimmedApplicantEmail) {
      return;
    }

    let isActive = true;

    const checkDuplicate = async () => {
      try {
        const result = await checkEnrollmentDuplicate({
          courseId,
          email: trimmedApplicantEmail,
        });

        if (!isActive) {
          return;
        }

        setDuplicateCheckResult({
          email: trimmedApplicantEmail,
          duplicated: result.duplicated,
          message: result.message,
        });
      } catch {
        if (!isActive) {
          return;
        }

        setDuplicateCheckResult({
          email: trimmedApplicantEmail,
          duplicated: false,
        });
      }
    };

    void checkDuplicate();

    return () => {
      isActive = false;
    };
  }, [courseId, trimmedApplicantEmail]);

  useEffect(() => {
    if (selectedType !== 'group' || !isGroupUnavailable) {
      return;
    }

    resetGroupValues();
    setValue('type', 'personal');
  }, [isGroupUnavailable, resetGroupValues, selectedType, setValue]);

  const hasGroupInputValues = () => {
    const group = getValues('group');

    if (!group) {
      return false;
    }

    const hasOrganizationName = group.organizationName.trim().length > 0;
    const hasContactPerson = group.contactPerson.trim().length > 0;
    const hasChangedHeadCount = group.headCount !== FORM_LIMITS.groupMinHeadCount;
    const hasParticipantInput = group.participants.some(
      (participant) => participant.name.trim().length > 0 || participant.email.trim().length > 0,
    );
    const hasExtraParticipants = group.participants.length > FORM_LIMITS.groupMinHeadCount;

    return (
      hasOrganizationName ||
      hasContactPerson ||
      hasChangedHeadCount ||
      hasParticipantInput ||
      hasExtraParticipants
    );
  };

  const applyPersonalSample = () => {
    reset({
      courseId,
      type: 'personal',
      applicant: {
        name: '김민수',
        email: 'minsu@example.com',
        phone: '010-1234-5678',
        motivation: '실무에서 바로 적용할 수 있는 내용을 배우고 싶습니다.',
      },
      agreedToTerms: true as const,
    });
    clearErrors();
    setSubmitErrorMessage(null);
  };

  const applyGroupSample = (count: number) => {
    const targetHeadCount = Math.min(
      Math.max(count, FORM_LIMITS.groupMinHeadCount),
      maxGroupHeadCount,
    );
    const sampleParticipants = Array.from({ length: targetHeadCount }, (_, index) => ({
      name: `참가자${index + 1}`,
      email: `group${index + 1}@example.com`,
    }));

    reset({
      courseId,
      type: 'group',
      applicant: {
        name: '이담당',
        email: 'manager@example.com',
        phone: '010-2345-6789',
        motivation: '팀 단위 역량 강화를 위해 신청합니다.',
      },
      group: {
        organizationName: '테스트 컴퍼니',
        headCount: targetHeadCount,
        contactPerson: '010-9876-5432',
        participants: sampleParticipants,
      },
      agreedToTerms: true as const,
    });
    clearErrors();
    setSubmitErrorMessage(null);
  };

  const applyDuplicateSample = () => {
    reset({
      courseId,
      type: 'personal',
      applicant: {
        name: '중복신청자',
        email: 'duplicate@example.com',
        phone: '010-2222-3333',
        motivation: '',
      },
      agreedToTerms: true as const,
    });
    clearErrors();
    setSubmitErrorMessage(null);
  };

  const resetMockValues = () => {
    reset({
      courseId,
      type: 'personal',
      applicant: {
        name: '',
        email: '',
        phone: '',
        motivation: '',
      },
      agreedToTerms: false as unknown as true,
    });
    clearErrors();
    setSubmitErrorMessage(null);
  };

  const handleTypeChange = (type: EnrollmentSchema['type']) => {
    if (type === selectedType) {
      return;
    }

    if (type === 'group') {
      if (isGroupUnavailable) {
        return;
      }

      setValue('type', 'group');
      setValue('group.organizationName', '');
      setValue('group.headCount', FORM_LIMITS.groupMinHeadCount, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('group.contactPerson', '');
      replace([
        { name: '', email: '' },
        { name: '', email: '' },
      ]);
      clearErrors('group');

      return;
    }

    if (hasGroupInputValues()) {
      setIsTypeChangeModalOpen(true);
      return;
    }

    resetGroupValues();
    setValue('type', 'personal', {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleConfirmTypeChange = () => {
    resetGroupValues();
    setValue('type', 'personal', {
      shouldDirty: true,
      shouldValidate: true,
    });
    setIsTypeChangeModalOpen(false);
  };

  const handleCancelTypeChange = () => {
    setIsTypeChangeModalOpen(false);
  };

  const handleValidSubmit = async (values: EnrollmentSchema) => {
    setIsLeavingSafely(true);

    try {
      setSubmitErrorMessage(null);
      const result = await submit(values);

      if (!result) {
        return;
      }

      localStorage.removeItem(draftStorageKey);
      setCompletedResult(result);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : '신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.';

      setSubmitErrorMessage(message);
      setIsLeavingSafely(false);
    }
  };

  const handleCloseCompleteModal = () => {
    router.push('/enrollment');
  };

  const renderSummaryRow = (label: string, value: React.ReactNode) => (
    <div className="flex items-start justify-between gap-4">
      <span className="text-caption">{label}</span>
      <span className="text-body text-right">{value ?? '-'}</span>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="card flex flex-col gap-6 p-6">
            {isMockMode ? (
              <section className="rounded-sm border border-border-subtle bg-bg-sunken p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-text-sub">UI 테스트</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={applyPersonalSample}>
                    개인 신청 샘플
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => applyGroupSample(2)}>
                    단체 2명 샘플
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => applyGroupSample(5)}>
                    단체 5명 샘플
                  </Button>
                  <Button type="button" variant="secondary" onClick={applyDuplicateSample}>
                    중복 신청 샘플
                  </Button>
                  <Button type="button" variant="ghost" onClick={resetMockValues}>
                    초기화
                  </Button>
                </div>
              </section>
            ) : null}

            <EnrollmentTypeSelector
              value={selectedType}
              onChange={handleTypeChange}
              isGroupDisabled={isGroupUnavailable}
            />
            <ApplicantFields register={register} errors={errors} />

            {selectedType === 'group' && (
              <>
                <GroupFields
                  register={register}
                  errors={errors}
                  remainingSeats={remainingSeats}
                  headCount={headCount}
                  onHeadCountChange={handleHeadCountChange}
                />
                <ParticipantFields
                  fields={participantFields}
                  register={register}
                  errors={errors}
                  headCount={headCount}
                  completedCount={completedParticipantCount}
                  onRemoveParticipant={handleParticipantRemove}
                />
              </>
            )}
          </section>

          <aside className="card flex h-fit flex-col gap-5 p-6 lg:sticky lg:top-24">
            <header className="grid gap-1">
              <p className="text-caption">최종 검토</p>
              <h3 className="text-h3">신청 요약</h3>
            </header>

            <section className="border-border-subtle border-t pt-4">
              <h4 className="text-caption mb-3">강좌 정보</h4>
              <div className="grid gap-3">
                {renderSummaryRow('강좌명', title)}
              </div>
            </section>

            <section className="border-border-subtle border-t pt-4">
              <h4 className="text-caption mb-3">신청자 정보</h4>
              <div className="grid gap-3">
                {renderSummaryRow('신청 유형', typeLabel)}
                {renderSummaryRow('이름', applicantName?.trim() || '-')}
                {renderSummaryRow('이메일', applicantEmail?.trim() || '-')}
                {renderSummaryRow('연락처', applicantPhone?.trim() || '-')}
              </div>
            </section>

            {selectedType === 'group' ? (
              <section className="border-border-subtle border-t pt-4">
                <h4 className="text-caption mb-3">단체 정보</h4>
                <div className="grid gap-3">
                  {renderSummaryRow('단체명', groupOrganizationName?.trim() || '-')}
                  {renderSummaryRow('담당자 연락처', groupContactPerson?.trim() || '-')}
                  {renderSummaryRow('참가자 수', `${displayHeadCount}명`)}
                  <div className="grid gap-2">
                    <span className="text-caption">참가자</span>
                    {visibleParticipants.length === 0 ? (
                      <span className="text-body">-</span>
                    ) : (
                      <ul className="grid gap-1">
                        {visibleParticipants.slice(0, 3).map((participant, index) => (
                          <li key={`${participant.email}-${index}`} className="text-body">
                            {participant.name || '-'} / {participant.email || '-'}
                          </li>
                        ))}
                        {visibleParticipants.length > 3 ? (
                          <li className="text-caption text-text-sub">
                            외 {visibleParticipants.length - 3}명
                          </li>
                        ) : null}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            ) : null}

            <section className="border-border-subtle border-t pt-4">
              <h4 className="text-caption mb-3">결제 정보</h4>
              {renderSummaryRow('총 금액', <strong className="text-h3 text-brand-primary">{totalPrice.toLocaleString()}원</strong>)}
            </section>

            <section className="border-border-subtle border-t pt-4">
              <TermsAgreement
                register={register}
                error={errors.agreedToTerms?.message as string | undefined}
                compact
              />
            </section>

            <section className="border-border-subtle border-t pt-4">
              <div className="rounded-sm border border-border-subtle p-3">
                <p className={summaryStatusClass}>{summaryStatusMessage}</p>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitDisabled}
                className="mt-3 w-full"
              >
                {submitButtonLabel}
              </Button>
            </section>
          </aside>
        </div>
      </form>

      <Modal
        isOpen={isTypeChangeModalOpen}
        onClose={handleCancelTypeChange}
        title="신청 유형 변경"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={handleCancelTypeChange}>
              취소
            </Button>
            <Button type="button" onClick={handleConfirmTypeChange}>
              변경하기
            </Button>
          </>
        }
      >
        <p className="text-body">
          신청 유형을 변경하면 일부 입력값이 초기화됩니다. 계속하시겠습니까?
        </p>
      </Modal>

      <Modal
        isOpen={Boolean(completedResult)}
        title="수강 신청 완료"
        onClose={handleCloseCompleteModal}
        footer={
          <Button type="button" onClick={handleCloseCompleteModal}>
            강좌 목록으로 이동
          </Button>
        }
      >
        <div className="grid gap-3">
          <p className="text-body">{completedResult?.message}</p>
          <div className="rounded-sm border border-border-subtle bg-bg-sunken p-4">
            <p className="text-caption">신청번호</p>
            <p className="text-h3">{completedResult?.enrollmentId}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
