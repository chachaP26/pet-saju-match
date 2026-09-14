export default function DogMascot({ className = 'w-40 h-40' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="귀여운 강아지">
      {/* 꼬리 */}
      <ellipse cx="158" cy="150" rx="12" ry="22" fill="#E8B888" transform="rotate(35 158 150)" />
      {/* 몸통 */}
      <ellipse cx="100" cy="158" rx="54" ry="38" fill="#F6D9AE" />
      {/* 앞발 */}
      <ellipse cx="78" cy="188" rx="13" ry="10" fill="#FBEBD1" />
      <ellipse cx="122" cy="188" rx="13" ry="10" fill="#FBEBD1" />
      {/* 귀 (늘어진 귀) */}
      <ellipse
        cx="52"
        cy="88"
        rx="16"
        ry="30"
        fill="#E8B888"
        transform="rotate(-18 52 88)"
      />
      <ellipse
        cx="148"
        cy="88"
        rx="16"
        ry="30"
        fill="#E8B888"
        transform="rotate(18 148 88)"
      />
      {/* 머리 */}
      <circle cx="100" cy="98" r="50" fill="#F6D9AE" />
      {/* 입 주변 주둥이 */}
      <ellipse cx="100" cy="116" rx="24" ry="17" fill="#FBEBD1" />
      {/* 볼 홍조 */}
      <ellipse cx="68" cy="112" rx="11" ry="7" fill="#FFB6C8" opacity="0.8" />
      <ellipse cx="132" cy="112" rx="11" ry="7" fill="#FFB6C8" opacity="0.8" />
      {/* 눈 */}
      <circle cx="80" cy="92" r="6.5" fill="#4A3527" />
      <circle cx="120" cy="92" r="6.5" fill="#4A3527" />
      <circle cx="82.5" cy="89.5" r="2" fill="#fff" />
      <circle cx="122.5" cy="89.5" r="2" fill="#fff" />
      {/* 코 */}
      <ellipse cx="100" cy="112" rx="7" ry="5" fill="#4A3527" />
      {/* 입 */}
      <path
        d="M100 117 Q100 124 92 126 M100 117 Q100 124 108 126"
        stroke="#4A3527"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* 혀 */}
      <path d="M96 126 Q100 136 104 126 Q100 132 96 126 Z" fill="#FF8FA3" />
    </svg>
  );
}
