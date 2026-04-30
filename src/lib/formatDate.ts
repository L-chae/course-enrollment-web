export const formatCourseCardDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('ko-KR');

export const formatCourseDetailDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
