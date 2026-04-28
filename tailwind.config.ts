/**
 * tailwind.config.ts
 *
 * Tailwind v4 에서는 디자인 토큰을 globals.css의 @theme 블록에서 관리합니다.
 * 이 파일에서 colors / spacing / radius / shadow 를 재정의하지 마세요.
 * 중복 정의 시 @theme 값이 덮어써질 수 있습니다.
 *
 * 플러그인, safelist, content 패턴 등 빌드 설정만 여기서 관리합니다.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      // 토큰 확장이 필요하면 globals.css @theme 에 추가 후,
      // 여기서는 Tailwind 빌드 전용 설정만 작성합니다.
    },
  },
  plugins: [],
};

export default config;