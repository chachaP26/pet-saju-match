import type { Metadata } from "next";
import { Jua, Gaegu } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://pet-saju-match.vercel.app"),
  title: "우리 사이 궁합 | 반려동물과 나의 사주 궁합",
  description:
    "반려동물의 정확한 생년월일시를 몰라도 괜찮아요. 나와 반려동물의 사주 궁합, 타고난 기질, 오늘의 기운, 형제 궁합까지 무료로 확인해보세요.",
  keywords: [
    "반려동물 사주",
    "펫 사주",
    "강아지 사주",
    "고양이 사주",
    "반려동물 궁합",
    "사주 궁합",
  ],
  openGraph: {
    title: "우리 사이 궁합 | 반려동물과 나의 사주 궁합",
    description:
      "반려동물의 정확한 생년월일시를 몰라도 괜찮아요. 나와 반려동물의 사주 궁합을 무료로 확인해보세요.",
    url: "https://pet-saju-match.vercel.app",
    siteName: "우리 사이 궁합",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "우리 사이 궁합 | 반려동물과 나의 사주 궁합",
    description:
      "반려동물의 정확한 생년월일시를 몰라도 괜찮아요. 나와 반려동물의 사주 궁합을 무료로 확인해보세요.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jua.variable} ${gaegu.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js"
          integrity="sha384-oroumrnFVE0xtgqyDZJARgERibXg2C28380uaUZz2kHDS5CR7tu20eGiOU6GkTpy"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
