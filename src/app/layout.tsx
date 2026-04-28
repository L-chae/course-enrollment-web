import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "수강신청 시스템",
  description: "과제 제출용 수강신청 프론트엔드 애플리케이션입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* 나중에 여기에 Provider를 감쌀 예정*/}
        {children}
      </body>
    </html>
  );
}