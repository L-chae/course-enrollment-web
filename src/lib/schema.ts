import { z } from 'zod';
import { FORM_LIMITS, PHONE_REGEX } from '@/constants';

export const applicantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(FORM_LIMITS.applicantNameMinLength, '이름은 2자 이상 입력해 주세요.')
    .max(FORM_LIMITS.applicantNameMaxLength),
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해 주세요.')
    .email('이메일 형식이 올바르지 않습니다.'),
  phone: z
    .string()
    .trim()
    .min(1, '전화번호를 입력해 주세요.')
    .regex(PHONE_REGEX, '형식이 올바르지 않습니다.'),
  motivation: z
    .string()
    .max(FORM_LIMITS.motivationMaxLength, '300자 이하로 입력해 주세요.')
    .optional()
    .or(z.literal('')),
});

export const groupSchema = z
  .object({
    organizationName: z.string().trim().min(1, '단체명을 입력해 주세요.'),
    headCount: z
      .number()
      .int()
      .min(FORM_LIMITS.groupMinHeadCount, '최소 2명부터 가능합니다.')
      .max(FORM_LIMITS.groupMaxHeadCount),
    participants: z.array(
      z.object({
        name: z.string().trim().min(1, '이름을 입력해 주세요.'),
        email: z.string().trim().email('올바르지 않은 이메일입니다.'),
      }),
    ),
    contactPerson: z.string().trim().regex(PHONE_REGEX, '형식이 올바르지 않습니다.'),
  })
  .superRefine((group, ctx) => {
    if (group.participants.length !== group.headCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['participants'],
        message: '신청 인원수와 명단 수가 일치해야 합니다.',
      });
    }
    const emails = group.participants.map((p) => p.email.toLowerCase());
    if (new Set(emails).size !== emails.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['participants'],
        message: '참가자 이메일은 중복될 수 없습니다.',
      });
    }
  });

// Discriminated Union 설정
export const enrollmentSchema = z.discriminatedUnion('type', [
  z.object({
    courseId: z.string().min(1, '강의를 선택해 주세요.'),
    type: z.literal('personal'),
    applicant: applicantSchema,
    // errorMap 대신 message를 사용합니다[cite: 10]
    agreedToTerms: z.literal(true, { message: '약관에 동의해 주세요.' }),
  }),
  z.object({
    courseId: z.string().min(1, '강의를 선택해 주세요.'),
    type: z.literal('group'),
    applicant: applicantSchema,
    group: groupSchema,
    agreedToTerms: z.literal(true, { message: '약관에 동의해 주세요.' }),
  }),
]);

export type EnrollmentSchema = z.infer<typeof enrollmentSchema>;
