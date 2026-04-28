import { redirect } from "next/navigation";

export default function Home() {
  // 루트 접속 시 바로 수강신청 1단계(강의 목록)로 리다이렉트
  redirect("/enrollment");
}