export type EnrollmentType = 'personal' | 'group';

export interface Applicant {
  name: string;
  email: string;
  phone: string;
  motivation?: string;
}

export interface GroupInfo {
  organizationName: string;
  headCount: number;
  contactPerson: string;
  participants: { name: string; email: string }[];
}

export interface EnrollmentBase {
  courseId: string;
  applicant: Applicant;
  agreedToTerms: boolean;
}

export interface PersonalEnrollmentRequest extends EnrollmentBase {
  type: 'personal';
}

export interface GroupEnrollmentRequest extends EnrollmentBase {
  type: 'group';
  group: GroupInfo;
}

export type EnrollmentRequest = PersonalEnrollmentRequest | GroupEnrollmentRequest;

export interface EnrollmentResponse {
  success: boolean;
  enrollmentId: string;
  message: string;
}

export interface EnrollmentDuplicateCheckResponse {
  duplicated: boolean;
  message?: string;
}
