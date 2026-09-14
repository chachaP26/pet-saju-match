import type { Metadata } from "next";
import { Jua, Gaegu } from "next/font/google";
import "./globals.css";

const jua = Jua({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const gaegu = Gaegu({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "우리 사이 궁합 | 반려동물과 나의 사주 궁합",
  description: "나와 반려동물의 생년월일(시)로 보는 사주 궁합",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jua.variable} ${gaegu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
