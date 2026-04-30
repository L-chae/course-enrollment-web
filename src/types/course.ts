export type Category = 'development' | 'design' | 'marketing' | 'business';
export type CourseFilterCategory = 'all' | Category;

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
  pagination: CoursePagination;
}

export interface CoursePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
