export type EnrollmentErrorCode =
  | 'COURSE_FULL'
  | 'DUPLICATE_ENROLLMENT'
  | 'INVALID_INPUT'
  | 'UNKNOWN_ERROR';

const ERROR_MESSAGES: Record<EnrollmentErrorCode, string> = {
  COURSE_FULL: '모집이 마감된 강좌입니다.',
  DUPLICATE_ENROLLMENT: '이미 신청한 강좌입니다.',
  INVALID_INPUT: '입력값을 다시 확인해 주세요.',
  UNKNOWN_ERROR: '신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
};

export function getEnrollmentErrorMessage(code?: string) {
  if (!code || !(code in ERROR_MESSAGES)) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  return ERROR_MESSAGES[code as EnrollmentErrorCode];
}
