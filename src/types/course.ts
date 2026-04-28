export type Category = 'development' | 'design' | 'marketing' | 'business';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  instructor: string;
}

export interface CourseListResponse {
  courses: Course[];
  categories: string[];
}
