import { Course } from '@/types/course';

export const MOCK_COURSES: Course[] = [
  // 1. Development 케이스
  {
    id: 'crs-001',
    title: 'Kubernetes 아키텍처와 클라우드 네이티브 실무 마스터',
    description: '현업에서 요구하는 클라우드 네이티브 환경 구축의 모든 것을 다룹니다.',
    category: 'development',
    price: 280000,
    maxCapacity: 30,
    currentEnrollment: 15, // Open
    startDate: '2026-06-01T00:00:00Z',
    endDate: '2026-07-31T23:59:59Z',
    instructor: '조쿠버 팀장',
  },
  {
    id: 'crs-004',
    title: 'TypeScript 심화: 안정적인 대규모 서비스 설계',
    description: '타입 시스템을 활용한 견고한 아키텍처 설계 기법을 배웁니다.',
    category: 'development',
    price: 210000,
    maxCapacity: 40,
    currentEnrollment: 40, // Full
    startDate: '2026-05-20T00:00:00Z',
    endDate: '2026-06-20T23:59:59Z',
    instructor: '김코드 강사',
  },
  {
    id: 'crs-007',
    title: 'Next.js 15 실무: Full-stack 웹 어플리케이션 개발',
    description: 'App Router와 Server Components를 활용한 최신 웹 개발.',
    category: 'development',
    price: 240000,
    maxCapacity: 25,
    currentEnrollment: 23, // Imminent[cite: 3]
    startDate: '2026-06-10T00:00:00Z',
    endDate: '2026-08-10T23:59:59Z',
    instructor: '리액트 마스터',
  },

  // 2. Design 케이스
  {
    id: 'crs-002',
    title: '대규모 서비스를 위한 디자인 시스템 구축 전략',
    description: '확장성 있는 디자인 시스템을 구축하는 실무 프로세스.',
    category: 'design',
    price: 195000,
    maxCapacity: 20,
    currentEnrollment: 19, // Imminent[cite: 3]
    startDate: '2026-05-15T00:00:00Z',
    endDate: '2026-06-15T23:59:59Z',
    instructor: '이디자인 디렉터',
  },
  {
    id: 'crs-005',
    title: 'Figma를 활용한 하이파이 프로토타이핑 마스터',
    description: '실제 제품과 흡사한 고도화된 프로토타입 제작기법.',
    category: 'design',
    price: 140000,
    maxCapacity: 30,
    currentEnrollment: 5, // Open
    startDate: '2026-07-05T00:00:00Z',
    endDate: '2026-08-05T23:59:59Z',
    instructor: '최피그마 리더',
  },

  // 3. Business 케이스
  {
    id: 'crs-003',
    title: '재무제표 분석을 통한 기업 가치 평가 실전',
    description: '비재무 담당자도 쉽게 이해할 수 있는 재무제표 읽기.',
    category: 'business',
    price: 150000,
    maxCapacity: 50,
    currentEnrollment: 50, // Full[cite: 3]
    startDate: '2026-07-01T00:00:00Z',
    endDate: '2026-08-31T23:59:59Z',
    instructor: '박회계 파트너',
  },
  {
    id: 'crs-006',
    title: 'B2B 영업 제안 전략과 협상 기술 마스터 클래스',
    description: '대형 계약을 이끌어내는 제안서 작성과 협상의 기술.',
    category: 'business',
    price: 180000,
    maxCapacity: 25,
    currentEnrollment: 25, // Full[cite: 3]
    startDate: '2026-06-15T00:00:00Z',
    endDate: '2026-07-15T23:59:59Z',
    instructor: '정영업 고문',
  },

  // 4. Marketing 및 추가 데이터 (페이지네이션 테스트용)
  {
    id: 'crs-008',
    title: '데이터 드리븐 퍼포먼스 마케팅 최적화',
    description: 'GA4와 광고 데이터를 활용한 마케팅 성과 극대화.',
    category: 'marketing',
    price: 160000,
    maxCapacity: 100,
    currentEnrollment: 45, // Open
    startDate: '2026-05-01T00:00:00Z',
    endDate: '2026-06-01T23:59:59Z',
    instructor: '이마켓 리더',
  },
  {
    id: 'crs-009',
    title: 'UX 리서치 기반 UI 개선 실무',
    description: '사용자 중심의 설계.',
    category: 'design',
    price: 175000,
    maxCapacity: 20,
    currentEnrollment: 2,
    startDate: '2026-08-01T00:00:00Z',
    endDate: '2026-09-01T23:59:59Z',
    instructor: '김리서치',
  },
  {
    id: 'crs-010',
    title: 'Spring Boot MSA 아키텍처',
    description: '분산 시스템 설계.',
    category: 'development',
    price: 250000,
    maxCapacity: 40,
    currentEnrollment: 38,
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-10-01T23:59:59Z',
    instructor: '박스프링',
  },
  {
    id: 'crs-011',
    title: '조직 문화와 HR 전략',
    description: '스타트업 인사 관리.',
    category: 'business',
    price: 200000,
    maxCapacity: 15,
    currentEnrollment: 0,
    startDate: '2026-10-01T00:00:00Z',
    endDate: '2026-11-01T23:59:59Z',
    instructor: '최인사',
  },
  {
    id: 'crs-012',
    title: '브랜드 마케팅 마스터 클래스',
    description: '브랜드 아이덴티티 구축.',
    category: 'marketing',
    price: 190000,
    maxCapacity: 50,
    currentEnrollment: 49,
    startDate: '2026-05-10T00:00:00Z',
    endDate: '2026-06-10T23:59:59Z',
    instructor: '강브랜드',
  },
];
