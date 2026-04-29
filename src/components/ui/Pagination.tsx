'use client';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="페이지네이션">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            className={[
              'h-10 min-w-10 rounded-[10px] px-3 text-sm font-bold transition-colors',
              isActive
                ? 'bg-bg-inverse text-text-inverse'
                : 'bg-bg-sunken text-text-sub hover:bg-border-subtle hover:text-text-main',
            ].join(' ')}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`${page}페이지로 이동`}
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}
