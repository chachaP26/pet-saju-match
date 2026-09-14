import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadKoreanFont(text: string, weight: number) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Gaegu:wght@${weight}&text=${encodeURIComponent(text)}`;
  // User-Agent를 지정하지 않으면 Google Fonts가 truetype(ttf)을 내려준다 (satori/resvg는 ttf만 지원, woff2는 미지원)
  const css = await fetch(cssUrl).then((res) => res.text());

  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error('Font URL not found');

  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
  return fontData;
}

export default async function Image() {
  const title = '우리 사이 궁합';
  const subtitle = '나와 반려동물의 사주 궁합 보기';
  const fontData = await loadKoreanFont(title + subtitle + '🐾', 700);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF3C4 0%, #D3F6E8 50%, #E8DCFF 100%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 130, marginBottom: 20 }}>
          <span>🐶</span>
          <span style={{ marginLeft: 24 }}>🐱</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            color: '#4A3527',
          }}
        >
          🐾 {title} 🐾
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#8A6D5B',
            marginTop: 16,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Gaegu', data: fontData, weight: 700, style: 'normal' }],
    },
  );
}
