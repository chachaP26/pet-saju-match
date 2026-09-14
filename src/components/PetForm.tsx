'use client';

import { useState } from 'react';
import type { PetInput, PetInputMode, Season } from '@/types';

const MODE_LABEL: Record<PetInputMode, string> = {
  exact: '생년월일시',
  approx: '대략적 시기',
  metDate: '만난 날 기준',
};

const SEASON_LABEL: Record<Season, string> = {
  spring: '봄',
  summer: '여름',
  fall: '가을',
  winter: '겨울',
};

export default function PetForm({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (pet: PetInput) => void;
}) {
  const [mode, setMode] = useState<PetInputMode>('exact');
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [error, setError] = useState('');

  // exact 모드 필드
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [timeKnown, setTimeKnown] = useState(true);
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('0');
  const [isLunar, setIsLunar] = useState(false);

  // approx 모드 필드
  const [approxYear, setApproxYear] = useState('');
  const [season, setSeason] = useState<Season>('spring');

  // metDate 모드 필드
  const [metYear, setMetYear] = useState('');
  const [metMonth, setMetMonth] = useState('');
  const [metDay, setMetDay] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !species.trim()) {
      setError('반려동물의 이름과 종류를 입력해주세요.');
      return;
    }

    const base = { name: name.trim(), species: species.trim(), mode };

    if (mode === 'exact') {
      const y = Number(year);
      const m = Number(month);
      const d = Number(day);
      if (!y || !m || !d) {
        setError('생년월일을 입력해주세요.');
        return;
      }
      onSubmit({
        ...base,
        exact: {
          year: y,
          month: m,
          day: d,
          hour: timeKnown ? Number(hour) : null,
          minute: timeKnown ? Number(minute) : 0,
          isLunar,
        },
      });
      return;
    }

    if (mode === 'approx') {
      const y = Number(approxYear);
      if (!y) {
        setError('대략적인 출생 연도를 입력해주세요.');
        return;
      }
      onSubmit({ ...base, approx: { year: y, season } });
      return;
    }

    // metDate
    const y = Number(metYear);
    const m = Number(metMonth);
    const d = Number(metDay);
    if (!y || !m || !d) {
      setError('처음 만난 날짜를 입력해주세요.');
      return;
    }
    onSubmit({ ...base, metDate: { year: y, month: m, day: d } });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border-2 border-pastel-mint bg-white/80 p-5 shadow-md shadow-pastel-mint/50"
    >
      <h2 className="font-heading text-xl text-choco">🐶🐱 반려동물 정보</h2>

      <div className="flex flex-col gap-1 text-sm">
        <p className="text-choco-soft">
          반려동물의 정확한 생시를 모르셔도 괜찮아요. 다만 아래 방식에 따라 실제 사주와는 차이가
          있을 수 있습니다.
        </p>
      </div>

      <div className="flex gap-2">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          이름
          <input
            className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="초코"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          종류
          <input
            className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="강아지, 고양이 등"
          />
        </label>
      </div>

      <div className="flex gap-1 rounded-full bg-pastel-mint/40 p-1 text-xs sm:text-sm">
        {(Object.keys(MODE_LABEL) as PetInputMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 whitespace-nowrap rounded-full px-1 py-2 font-bold transition ${
              mode === m ? 'bg-white text-coral-deep shadow' : 'text-choco-soft'
            }`}
          >
            {MODE_LABEL[m]}
          </button>
        ))}
      </div>

      {mode === 'exact' && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              년
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2020"
              />
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              월
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="3"
              />
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              일
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="10"
              />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-choco-soft">
            <input
              type="checkbox"
              className="h-4 w-4 accent-coral"
              checked={isLunar}
              onChange={(e) => setIsLunar(e.target.checked)}
            />
            음력 생일이에요
          </label>

          <label className="flex items-center gap-2 text-sm text-choco-soft">
            <input
              type="checkbox"
              className="h-4 w-4 accent-coral"
              checked={timeKnown}
              onChange={(e) => setTimeKnown(e.target.checked)}
            />
            태어난 시간을 알고 있어요
          </label>

          {timeKnown && (
            <div className="flex gap-2">
              <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                시
                <input
                  type="number"
                  min={0}
                  max={23}
                  className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                />
              </label>
              <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                분
                <input
                  type="number"
                  min={0}
                  max={59}
                  className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>
      )}

      {mode === 'approx' && (
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            대략적인 출생 연도
            <input
              type="number"
              className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
              value={approxYear}
              onChange={(e) => setApproxYear(e.target.value)}
              placeholder="2020년생 정도"
            />
          </label>
          <div className="flex flex-col gap-1 text-sm">
            태어난 계절
            <div className="flex gap-2">
              {(Object.keys(SEASON_LABEL) as Season[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={`flex-1 rounded-full border-2 px-2 py-2 font-bold ${
                    season === s
                      ? 'border-coral bg-pastel-pink/40 text-coral-deep'
                      : 'border-pastel-mint-deep/40 text-choco-soft'
                  }`}
                >
                  {SEASON_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'metDate' && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-choco-soft">
            생일 대신 처음 만난 날(입양일 등)로 &ldquo;인연 궁합&rdquo;을 계산해요. 실제 생일
            사주와는 다른 결과예요.
          </p>
          <div className="flex gap-2">
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              년
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={metYear}
                onChange={(e) => setMetYear(e.target.value)}
                placeholder="2023"
              />
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              월
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={metMonth}
                onChange={(e) => setMetMonth(e.target.value)}
                placeholder="6"
              />
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
              일
              <input
                type="number"
                className="w-full min-w-0 rounded-xl border-2 border-pastel-mint-deep/50 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
                value={metDay}
                onChange={(e) => setMetDay(e.target.value)}
                placeholder="1"
              />
            </label>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border-2 border-pastel-mint-deep/50 px-4 py-2 font-medium text-choco-soft"
        >
          이전
        </button>
        <button
          type="submit"
          className="flex-1 rounded-full bg-coral px-4 py-2 font-heading text-white shadow-md shadow-coral/40 transition hover:bg-coral-deep active:scale-95"
        >
          궁합 보기 🔮
        </button>
      </div>
    </form>
  );
}
