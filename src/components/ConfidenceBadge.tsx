import type { ConfidenceLevel } from '@/types';

const BADGE: Record<ConfidenceLevel, { emoji: string; label: string; className: string }> = {
  precise: {
    emoji: '🟢',
    label: '정밀 사주',
    className: 'bg-pastel-mint text-choco border-pastel-mint-deep',
  },
  partial: {
    emoji: '🟡',
    label: '약식 사주',
    className: 'bg-pastel-yellow text-choco border-[#e8c65a]',
  },
  bond: {
    emoji: '🔵',
    label: '인연 궁합',
    className: 'bg-pastel-lavender text-choco border-[#c4a9ff]',
  },
};

export default function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const { emoji, label, className } = BADGE[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-1 text-sm font-bold ${className}`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}
