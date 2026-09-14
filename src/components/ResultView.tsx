import type { CompatibilityResult, OwnerInput, PetInput } from '@/types';
import ConfidenceBadge from './ConfidenceBadge';
import DisclaimerBanner from './DisclaimerBanner';

export default function ResultView({
  owner,
  pet,
  result,
  onRestart,
}: {
  owner: OwnerInput;
  pet: PetInput;
  result: CompatibilityResult;
  onRestart: () => void;
}) {
  const title =
    pet.mode === 'metDate'
      ? `${pet.name}(이)와 나의 인연 궁합`
      : `${pet.name}(이)와 나의 사주 궁합`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl text-choco">{title}</h2>
        <ConfidenceBadge level={result.confidence} />
      </div>

      <DisclaimerBanner />

      <div className="flex flex-col gap-2 rounded-3xl border-2 border-pastel-mint bg-white/80 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-heading text-choco">
            {result.petTemperament.elementEmoji} {pet.name}의 타고난 기질
          </p>
          <span className="rounded-full bg-pastel-mint px-2 py-1 text-xs font-bold text-choco">
            {result.petTemperament.zodiacLabel}
          </span>
        </div>
        <p className="text-sm font-bold text-coral-deep">{result.petTemperament.elementTitle}</p>
        <p className="text-sm leading-relaxed text-choco-soft">
          {result.petTemperament.elementDescription}
        </p>
        <p className="text-sm leading-relaxed text-choco-soft">
          {result.petTemperament.zodiacDescription}
        </p>
        <div className="mt-1 flex flex-col gap-1 rounded-2xl bg-pastel-mint/30 p-3 text-sm">
          <p className="text-choco-soft">
            <span className="font-bold text-choco">👍 강점 </span>
            {result.petTemperament.elementStrength}
          </p>
          <p className="text-choco-soft">
            <span className="font-bold text-choco">💭 주의할 점 </span>
            {result.petTemperament.elementCaution}
          </p>
        </div>
        {result.petTemperament.isBond && (
          <p className="text-xs text-choco-soft/70">
            * 생일이 아닌 만난 날 기준으로 추정한 기질이에요.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 rounded-3xl border-2 border-pastel-lavender bg-pastel-lavender/40 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-heading text-choco">
            🔮 오늘의 기운 — {result.todayEnergy.todayLabel}
          </p>
          <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-choco">
            {result.todayEnergy.relationLabel}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-choco-soft">
          {result.todayEnergy.description}
        </p>
        <p className="text-sm leading-relaxed text-choco-soft">
          <span className="font-bold text-choco">🎾 오늘은 이렇게 </span>
          {result.todayEnergy.activity}
        </p>
      </div>

      <div className="rounded-3xl border-2 border-pastel-pink bg-white/80 p-5 text-center shadow-sm">
        <p className="text-sm text-choco-soft">궁합 점수</p>
        <p className="font-heading text-5xl text-coral">{result.score}점</p>
        <p className="mt-1 text-sm font-bold text-choco">{result.relationLabel}</p>
      </div>

      <p className="leading-relaxed text-choco-soft">{result.description}</p>

      <div className="rounded-2xl bg-pastel-yellow/40 p-3 text-sm leading-relaxed text-choco-soft">
        <span className="font-bold text-choco">💡 꿀팁 </span>
        {result.tip}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-pastel-peach/50 p-3">
          <p className="font-bold text-choco">{owner.name}의 사주</p>
          <p className="mt-1 text-choco-soft">{result.ownerSummary}</p>
        </div>
        <div className="rounded-2xl bg-pastel-peach/50 p-3">
          <p className="font-bold text-choco">{pet.name}의 사주</p>
          <p className="mt-1 text-choco-soft">{result.petSummary}</p>
        </div>
      </div>

      {result.sibling && (
        <div className="flex flex-col gap-2 rounded-3xl border-2 border-pastel-yellow bg-pastel-yellow/30 p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-choco">
              🐾 {pet.name}와 {result.sibling.pet2Name}의 형제 궁합
            </p>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-coral-deep">
              {result.sibling.score}점
            </span>
          </div>
          <p className="text-sm font-bold text-coral-deep">{result.sibling.relationLabel}</p>
          <p className="text-sm leading-relaxed text-choco-soft">{result.sibling.description}</p>
          <p className="text-sm leading-relaxed text-choco-soft">
            <span className="font-bold text-choco">💡 꿀팁 </span>
            {result.sibling.tip}
          </p>
          <div className="mt-1 flex items-center justify-between rounded-2xl bg-white/70 p-3 text-sm">
            <p className="text-choco-soft">
              {result.sibling.pet2Name}의 기질: {result.sibling.pet2Temperament.elementTitle}
            </p>
            <span className="rounded-full bg-pastel-yellow px-2 py-1 text-xs font-bold text-choco">
              {result.sibling.pet2Temperament.zodiacLabel}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="rounded-full border-2 border-pastel-pink px-4 py-3 font-heading text-choco-soft transition hover:bg-pastel-pink/30"
      >
        🔁 다시 입력하기
      </button>
    </div>
  );
}
