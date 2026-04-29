import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border-subtle bg-bg-card/90 shadow-soft backdrop-blur-sm">
      <div className="content-container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-text-main">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-primary text-text-inverse">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 13L8 3L13 13"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M5 9.5H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>

          <span className="text-base font-black tracking-tight">
            GLOBAL <span className="text-brand-primary">CAMPUS</span>
          </span>
        </Link>

        <Link
          href="/mypage"
          className="text-sm font-bold text-text-sub transition-colors hover:text-text-main"
        >
          마이페이지
        </Link>
      </div>
    </header>
  );
}
