export default function CatMascot({ className = 'w-40 h-40' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="귀여운 고양이">
      {/* 꼬리 */}
      <path
        d="M148 180 Q178 170 172 138 Q168 118 150 122"
        stroke="#F3A65E"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />
      {/* 몸통 */}
      <ellipse cx="100" cy="160" rx="52" ry="36" fill="#FBC98C" />
      {/* 앞발 */}
      <ellipse cx="80" cy="188" rx="12" ry="9" fill="#FEE9CC" />
      <ellipse cx="120" cy="188" rx="12" ry="9" fill="#FEE9CC" />
      {/* 귀 (뾰족한 귀) */}
      <path d="M56 62 L44 22 L82 54 Z" fill="#F3A65E" />
      <path d="M144 62 L156 22 L118 54 Z" fill="#F3A65E" />
      <path d="M60 58 L53 34 L76 52 Z" fill="#FFD3E4" />
      <path d="M140 58 L147 34 L124 52 Z" fill="#FFD3E4" />
      {/* 머리 */}
      <circle cx="100" cy="98" r="48" fill="#FBC98C" />
      {/* 볼 홍조 */}
      <ellipse cx="66" cy="106" rx="11" ry="7" fill="#FFB6C8" opacity="0.85" />
      <ellipse cx="134" cy="106" rx="11" ry="7" fill="#FFB6C8" opacity="0.85" />
      {/* 수염 */}
      <path
        d="M40 96 Q58 94 70 98 M40 106 Q58 104 70 106 M160 96 Q142 94 130 98 M160 106 Q142 104 130 106"
        stroke="#C97B3D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* 눈 */}
      <ellipse cx="80" cy="92" rx="6" ry="7.5" fill="#4A3527" />
      <ellipse cx="120" cy="92" rx="6" ry="7.5" fill="#4A3527" />
      <circle cx="82.5" cy="89" r="2" fill="#fff" />
      <circle cx="122.5" cy="89" r="2" fill="#fff" />
      {/* 코 */}
      <path d="M96 104 L104 104 L100 110 Z" fill="#FF8FA3" />
      {/* 입 */}
      <path
        d="M100 110 Q100 116 92 116 M100 110 Q100 116 108 116"
        stroke="#4A3527"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
