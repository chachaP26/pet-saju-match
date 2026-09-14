'use client';

import { useState } from 'react';
import type { OwnerInput } from '@/types';

export default function OwnerForm({ onNext }: { onNext: (owner: OwnerInput) => void }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [timeKnown, setTimeKnown] = useState(true);
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('0');
  const [isLunar, setIsLunar] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    if (!name.trim() || !y || !m || !d) {
      setError('이름과 생년월일을 모두 입력해주세요.');
      return;
    }

    onNext({
      name: name.trim(),
      year: y,
      month: m,
      day: d,
      hour: timeKnown ? Number(hour) : null,
      minute: timeKnown ? Number(minute) : 0,
      isLunar,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border-2 border-pastel-pink bg-white/80 p-5 shadow-md shadow-pastel-pink/50"
    >
      <h2 className="font-heading text-xl text-choco">🙋 내 정보</h2>

      <label className="flex flex-col gap-1 text-sm">
        이름
        <input
          className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
        />
      </label>

      <div className="flex gap-2">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          년
          <input
            type="number"
            className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="1995"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          월
          <input
            type="number"
            className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="5"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          일
          <input
            type="number"
            className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="15"
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
              className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
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
              className="w-full min-w-0 rounded-xl border-2 border-pastel-pink/70 bg-white px-3 py-2 text-base text-choco focus:border-coral focus:outline-none"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="rounded-full bg-coral px-4 py-3 font-heading text-white shadow-md shadow-coral/40 transition hover:bg-coral-deep active:scale-95"
      >
        다음: 반려동물 정보 🐾
      </button>
    </form>
  );
}
