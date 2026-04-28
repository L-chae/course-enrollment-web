'use client';

import React, { useState, useEffect } from 'react';

const COURSE = {
  category: 'Development',
  title: 'Next.js 15 & Tailwind v4 전문 리팩토링',
  lessons: 12,
  price: '185,000원',
  rating: 4.9,
  reviews: 238,
};

const ORDER = {
  course: 'Next.js 15 리팩토링',
  type: '단체 수강 (5인)',
  total: '925,000원',
  remaining: 3,
};

const sp = {
  xs: 'var(--space-xs)',
  sm: 'var(--space-sm)',
  md: 'var(--space-md)',
  lg: 'var(--space-lg)',
  xl: 'var(--space-xl)',
  '2xl': 'var(--space-2xl)',
} as const;

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="bg-bg-sunken hover:bg-border-subtle border-border-subtle text-text-sub flex items-center gap-2 rounded-sm border text-xs font-bold transition-all select-none"
      style={{ padding: `${sp.xs} ${sp.md}`, transitionDuration: 'var(--duration-fast)' }}
    >
      <span className="text-sm leading-none">{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? 'DARK' : 'LIGHT'}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-text-mute text-xs font-bold tracking-widest uppercase"
      style={{ marginBottom: sp.sm }}
    >
      {children}
    </p>
  );
}

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="bg-bg-base min-h-screen transition-colors duration-500">
      {/* GNB */}
      <nav
        className="bg-bg-card/90 border-border-subtle shadow-soft sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ height: 'var(--h-gnb)' }}
      >
        <div className="content-container flex h-full items-center justify-between">
          <a href="#" className="flex items-center" style={{ gap: sp.sm }}>
            <span className="bg-brand-primary flex h-7 w-7 items-center justify-center rounded-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 12 L7 2 L12 12"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M4 8.5 H10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-text-main text-base font-black tracking-tight">
              Global<span className="text-brand-primary">Campus</span>
            </span>
          </a>
          <div className="flex items-center" style={{ gap: sp.md }}>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <nav
              className="text-text-sub hidden items-center text-sm font-semibold md:flex"
              style={{ gap: sp.md }}
            >
              <a href="#" className="text-brand-primary font-bold">
                수강신청
              </a>
              <a href="#" className="hover:text-text-main transition-colors">
                내 강의실
              </a>
              <a href="#" className="hover:text-text-main transition-colors">
                커뮤니티
              </a>
            </nav>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="content-container" style={{ paddingTop: sp.xl, paddingBottom: sp['2xl'] }}>
        {/* 페이지 헤더 */}
        <header style={{ marginBottom: sp['2xl'] }}>
          <div className="flex items-center" style={{ gap: sp.sm, marginBottom: sp.md }}>
            <span className="badge-brand">Design System</span>
            <span className="text-text-mute font-mono text-xs">v4.0</span>
          </div>
          <h1 className="text-h1" style={{ marginBottom: sp.sm }}>
            컴포넌트 쇼케이스
          </h1>
          <p className="text-text-sub text-lg leading-relaxed" style={{ maxWidth: '520px' }}>
            Tailwind v4 CSS 변수 기반 토큰 시스템. 하드코딩 색상 없이 라이트·다크 모드를 완전
            지원합니다.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start lg:grid-cols-3" style={{ gap: sp.xl }}>
          {/* 좌측 (2/3) */}
          <div
            className="lg:col-span-2"
            style={{ display: 'flex', flexDirection: 'column', gap: sp.xl }}
          >
            {/* ① Typography */}
            <section className="card" style={{ padding: sp.lg }}>
              <div
                className="border-border-subtle border-b"
                style={{ paddingBottom: sp.md, marginBottom: sp.lg }}
              >
                <SectionLabel>01 — Typography</SectionLabel>
                <h2 className="text-h2">타이포그래피 스케일</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp.lg }}>
                {[
                  {
                    meta: '.text-h1 · 36px · extrabold · tracking-tighter',
                    node: <p className="text-h1">전체 강좌 탐색</p>,
                  },
                  {
                    meta: '.text-h2 · 24px · extrabold · tracking-tight',
                    node: <p className="text-h2">카테고리 · 개발</p>,
                  },
                  {
                    meta: '.text-h3 · brand color',
                    node: (
                      <p className="text-h3 text-brand-primary">실전 Next.js 15 리팩토링 가이드</p>
                    ),
                  },
                  {
                    meta: '.text-body · 16px · text-main',
                    node: <p className="text-body">본문은 가독성을 위해 1.6 행간을 유지합니다.</p>,
                  },
                  {
                    meta: '.text-caption · text-sub',
                    node: (
                      <p className="text-caption">
                        최종 업데이트 · 2025년 3월 14일 · 수강생 4,291명
                      </p>
                    ),
                  },
                  {
                    meta: '.text-error · 에러 메시지',
                    node: <p className="text-error">이메일 형식이 올바르지 않습니다.</p>,
                  },
                  {
                    meta: '.text-success · 성공 메시지',
                    node: <p className="text-success">신청이 완료되었습니다.</p>,
                  },
                ].map(({ meta, node }) => (
                  <div key={meta}>
                    <span
                      className="text-text-mute block font-mono text-xs"
                      style={{ marginBottom: sp.xs }}
                    >
                      {meta}
                    </span>
                    {node}
                  </div>
                ))}
              </div>
            </section>

            {/* ② Buttons & Inputs */}
            <div className="grid sm:grid-cols-2" style={{ gap: sp.lg }}>
              <div className="card" style={{ padding: sp.lg }}>
                <SectionLabel>02 — Buttons</SectionLabel>
                <h2 className="text-h3" style={{ marginBottom: sp.md }}>
                  액션 버튼
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                  <button
                    className="bg-brand-primary hover:bg-brand-dark shadow-brand w-full rounded-sm font-bold text-white transition-all hover:shadow-none active:scale-[0.98]"
                    style={{
                      padding: `${sp.sm} ${sp.lg}`,
                      transitionDuration: 'var(--duration-fast)',
                    }}
                  >
                    수강 신청하기
                  </button>
                  <button
                    className="text-text-main bg-bg-card hover:bg-bg-sunken border-border-strong w-full rounded-sm border font-bold transition-all active:scale-[0.98]"
                    style={{
                      padding: `${sp.sm} ${sp.lg}`,
                      transitionDuration: 'var(--duration-fast)',
                    }}
                  >
                    찜하기
                  </button>
                  <button
                    className="text-brand-primary hover:bg-bg-sunken border-brand-primary/30 hover:border-brand-primary/60 w-full rounded-sm border bg-transparent font-bold transition-all active:scale-[0.98]"
                    style={{
                      padding: `${sp.sm} ${sp.lg}`,
                      transitionDuration: 'var(--duration-fast)',
                    }}
                  >
                    미리보기
                  </button>
                  {/* disabled 상태 */}
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-sm font-bold"
                    style={{
                      padding: `${sp.sm} ${sp.lg}`,
                      backgroundColor: 'var(--color-bg-disabled)',
                      color: 'var(--color-text-disabled)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    마감된 강의
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: sp.lg }}>
                <SectionLabel>03 — Inputs</SectionLabel>
                <h2 className="text-h3" style={{ marginBottom: sp.md }}>
                  입력 필드
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: sp.md }}>
                  {/* 기본 */}
                  <div>
                    <label
                      className="text-text-sub block text-sm font-bold"
                      style={{ marginBottom: sp.xs }}
                    >
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      placeholder="example@global.com"
                      className="input-standard"
                    />
                  </div>
                  {/* 에러 상태 */}
                  <div>
                    <label
                      className="text-text-sub block text-sm font-bold"
                      style={{ marginBottom: sp.xs }}
                    >
                      전화번호
                    </label>
                    <input
                      type="text"
                      placeholder="010-0000-0000"
                      className={`input-standard ${inputError ? 'input-error' : ''}`}
                      onFocus={() => setInputError(true)}
                      onBlur={() => setInputError(false)}
                    />
                    {inputError && (
                      <p className="text-error" style={{ marginTop: sp.xs }}>
                        올바른 전화번호 형식을 입력하세요.
                      </p>
                    )}
                  </div>
                  {/* disabled */}
                  <div>
                    <label
                      className="text-text-sub block text-sm font-bold"
                      style={{ marginBottom: sp.xs }}
                    >
                      신청 번호 (자동발급)
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="ENR-20250428-001"
                      className="input-standard"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ③ Badges */}
            <section className="card" style={{ padding: sp.lg }}>
              <SectionLabel>04 — Badges</SectionLabel>
              <h2 className="text-h3" style={{ marginBottom: sp.md }}>
                상태 배지
              </h2>
              <div className="flex flex-wrap" style={{ gap: sp.sm }}>
                <span className="badge-brand">Development</span>
                <span className="badge-success">신청 완료</span>
                <span className="badge-error">정원 마감</span>
                <span className="badge-warning">마감 임박</span>
              </div>
            </section>

            {/* ④ Color Tokens */}
            <section className="card" style={{ padding: sp.lg }}>
              <SectionLabel>05 — Color Tokens</SectionLabel>
              <h2 className="text-h3" style={{ marginBottom: sp.lg }}>
                컬러 팔레트
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: sp.sm }}>
                {[
                  { label: 'brand-primary', bg: 'var(--color-brand-primary)' },
                  { label: 'brand-dark', bg: 'var(--color-brand-dark)' },
                  { label: 'error', bg: 'var(--color-error)' },
                  { label: 'success', bg: 'var(--color-success)' },
                  { label: 'warning', bg: 'var(--color-warning)' },
                  { label: 'bg-base', bg: 'var(--color-bg-base)', border: true },
                  { label: 'bg-card', bg: 'var(--color-bg-card)', border: true },
                  { label: 'bg-sunken', bg: 'var(--color-bg-sunken)' },
                  { label: 'bg-inverse', bg: 'var(--color-bg-inverse)' },
                  { label: 'bg-disabled', bg: 'var(--color-bg-disabled)', border: true },
                  { label: 'border-subtle', bg: 'var(--color-border-subtle)' },
                  { label: 'border-strong', bg: 'var(--color-border-strong)' },
                ].map(({ label, bg, border }) => (
                  <div key={label}>
                    <div
                      style={{
                        height: '40px',
                        borderRadius: 'var(--radius-sm)',
                        background: bg,
                        border: border ? '1px solid var(--color-border-subtle)' : undefined,
                        marginBottom: sp.xs,
                      }}
                    />
                    <p className="text-text-mute font-mono text-xs leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ⑤ Course Cards */}
            <section>
              <SectionLabel>06 — Course Card</SectionLabel>
              <h2 className="text-h3" style={{ marginBottom: sp.md }}>
                강좌 카드
              </h2>
              <div className="grid sm:grid-cols-2" style={{ gap: sp.lg }}>
                <article className="card-interactive group overflow-hidden">
                  <div className="bg-bg-sunken relative aspect-video overflow-hidden rounded-t-md">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-brand-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                          <rect
                            x="4"
                            y="4"
                            width="28"
                            height="28"
                            rx="4"
                            stroke="var(--color-brand-primary)"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                          />
                          <path
                            d="M12 18 L16 22 L24 14"
                            stroke="var(--color-brand-primary)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="badge-brand absolute" style={{ top: sp.sm, left: sp.sm }}>
                      심화
                    </span>
                  </div>
                  <div style={{ padding: sp.lg }}>
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: sp.sm }}
                    >
                      <span className="text-brand-primary text-xs font-black tracking-widest uppercase">
                        {COURSE.category}
                      </span>
                      <div
                        className="text-text-mute flex items-center text-xs font-medium"
                        style={{ gap: sp.xs }}
                      >
                        <span className="text-yellow-500">★</span>
                        <span>{COURSE.rating}</span>
                        <span>({COURSE.reviews})</span>
                      </div>
                    </div>
                    <h4
                      className="group-hover:text-brand-primary text-lg leading-snug font-extrabold transition-colors duration-200"
                      style={{ marginBottom: sp.sm }}
                    >
                      {COURSE.title}
                    </h4>
                    <div
                      className="border-border-subtle flex items-center justify-between border-t"
                      style={{ paddingTop: sp.sm }}
                    >
                      <span className="text-text-mute text-sm">총 {COURSE.lessons}강</span>
                      <span className="text-text-main text-xl font-black">{COURSE.price}</span>
                    </div>
                  </div>
                </article>

                {/* 스켈레톤 */}
                <div className="card animate-pulse overflow-hidden">
                  <div className="bg-bg-sunken aspect-video rounded-t-md" />
                  <div
                    style={{ padding: sp.lg, display: 'flex', flexDirection: 'column', gap: sp.sm }}
                  >
                    <div className="bg-bg-sunken h-3 w-20 rounded-sm" />
                    <div className="bg-bg-sunken h-5 w-full rounded-sm" />
                    <div className="bg-bg-sunken h-5 w-4/5 rounded-sm" />
                    <div
                      className="border-border-subtle flex justify-between border-t"
                      style={{ paddingTop: sp.sm }}
                    >
                      <div className="bg-bg-sunken h-4 w-12 rounded-sm" />
                      <div className="bg-bg-sunken h-6 w-20 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 사이드바 */}
          <aside>
            {/* 1. card를 제거하거나 !bg-bg-inverse로 배경색을 강제합니다. */}
            <div
              className="bg-bg-inverse text-text-inverse shadow-elevated rounded-md"
              style={{
                padding: sp.lg,
                position: 'sticky',
                top: 'var(--top-sticky)',
                display: 'flex',
                flexDirection: 'column',
                gap: sp.lg,
                border: '1px solid rgba(255,255,255,0.1)', // 카드 느낌을 위한 미세한 테두리
              }}
            >
              <div>
                {/* 2. h3에 text-inherit를 주어 부모의 흰색(text-inverse)을 따라가게 합니다. */}
                <h3
                  className="border-b border-white/10 text-xl font-black tracking-tight text-inherit"
                  style={{ paddingBottom: sp.md, marginBottom: sp.md }}
                >
                  수강 신청 요약
                </h3>
                <dl style={{ display: 'flex', flexDirection: 'column', gap: sp.sm }}>
                  <div className="flex items-start justify-between text-sm" style={{ gap: sp.sm }}>
                    <dt className="shrink-0 font-medium" style={{ opacity: 0.6 }}>
                      선택 강좌
                    </dt>
                    <dd className="text-right leading-snug font-bold">{ORDER.course}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="font-medium" style={{ opacity: 0.6 }}>
                      수강 구분
                    </dt>
                    <dd className="font-bold">{ORDER.type}</dd>
                  </div>
                </dl>
              </div>

              <div
                className="flex items-baseline justify-between border-t border-white/10"
                style={{ paddingTop: sp.lg }}
              >
                <span className="text-sm" style={{ opacity: 0.6 }}>
                  총 결제 금액
                </span>
                {/* 3. 여기도 text-inherit 추가 */}
                <strong className="text-3xl font-black text-inherit">{ORDER.total}</strong>
              </div>

              <button
                className="bg-brand-primary hover:bg-brand-dark shadow-brand w-full rounded-sm text-base font-black text-white transition-all active:scale-[0.98]"
                style={{ padding: `${sp.md} ${sp.lg}`, transitionDuration: 'var(--duration-fast)' }}
              >
                결제 및 신청하기
              </button>

              <p className="text-center text-xs leading-relaxed" style={{ opacity: 0.4 }}>
                7일 환불 보장 · 수료증 발급 포함
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
