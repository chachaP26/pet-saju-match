'use client';

import { useState } from 'react';
import OwnerForm from '@/components/OwnerForm';
import PetForm from '@/components/PetForm';
import ResultView from '@/components/ResultView';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import DogMascot from '@/components/mascots/DogMascot';
import CatMascot from '@/components/mascots/CatMascot';
import { computeCompatibility } from '@/lib/saju';
import type { CompatibilityResult, OwnerInput, PetInput } from '@/types';

type Step = 'intro' | 'owner' | 'pet' | 'siblingPrompt' | 'pet2' | 'result';

export default function Page() {
  const [step, setStep] = useState<Step>('intro');
  const [owner, setOwner] = useState<OwnerInput | null>(null);
  const [pet, setPet] = useState<PetInput | null>(null);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState('');

  function handleOwnerNext(o: OwnerInput) {
    setOwner(o);
    setStep('pet');
  }

  function handlePetSubmit(p: PetInput) {
    setPet(p);
    setError('');
    setStep('siblingPrompt');
  }

  function finalizeResult(p1: PetInput, p2?: PetInput) {
    if (!owner) return;
    try {
      const compat = computeCompatibility(owner, p1, p2);
      setResult(compat);
      setError('');
      setStep('result');
    } catch {
      setError('입력하신 날짜를 계산할 수 없어요. 날짜를 다시 확인해주세요.');
      setStep(p2 ? 'pet2' : 'siblingPrompt');
    }
  }

  function handleNoSibling() {
    if (!pet) return;
    finalizeResult(pet);
  }

  function handlePet2Submit(p2: PetInput) {
    if (!pet) return;
    finalizeResult(pet, p2);
  }

  function handleRestart() {
    setOwner(null);
    setPet(null);
    setResult(null);
    setError('');
    setStep('intro');
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <header className="text-center">
        <h1 className="font-heading text-3xl text-choco">
          🐾 우리 사이 궁합 🐾
        </h1>
        <p className="mt-1 text-sm text-choco-soft">나와 반려동물의 사주 궁합 보기</p>
      </header>

      {step === 'intro' && (
        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-center gap-2">
            <DogMascot className="h-32 w-32 drop-shadow-md" />
            <CatMascot className="h-32 w-32 drop-shadow-md" />
          </div>

          <div className="rounded-3xl border-2 border-pastel-pink bg-white/80 p-5 shadow-md shadow-pastel-pink/50">
            <p className="text-center leading-relaxed text-choco-soft">
              반려동물의 정확한 생년월일시를 몰라도 괜찮아요! 정확한 정보, 대략적인 시기, 처음
              만난 날 중 편한 방식으로 입력하면 그에 맞는 궁합을 보여드려요 🐶🐱
            </p>
          </div>

          <DisclaimerBanner />

          <button
            onClick={() => setStep('owner')}
            className="rounded-full bg-coral px-6 py-3.5 font-heading text-lg text-white shadow-lg shadow-coral/40 transition hover:scale-[1.02] hover:bg-coral-deep active:scale-95"
          >
            시작하기 🐾
          </button>
        </div>
      )}

      {step === 'owner' && <OwnerForm onNext={handleOwnerNext} />}

      {step === 'pet' && (
        <>
          <PetForm onBack={() => setStep('owner')} onSubmit={handlePetSubmit} />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </>
      )}

      {step === 'siblingPrompt' && pet && (
        <div className="flex flex-col gap-4 rounded-3xl border-2 border-pastel-mint bg-white/80 p-5 shadow-md shadow-pastel-mint/50">
          <div className="flex justify-center gap-1">
            <DogMascot className="h-16 w-16" />
            <CatMascot className="h-16 w-16" />
          </div>
          <h2 className="font-heading text-center text-xl text-choco">
            함께 키우는 반려동물이 또 있나요?
          </h2>
          <p className="text-center text-sm leading-relaxed text-choco-soft">
            같이 지내는 반려동물이 있다면 {pet.name}(이)와의 형제 궁합도 함께 볼 수 있어요.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setStep('pet')}
              className="rounded-full border-2 border-pastel-pink px-4 py-2 font-medium text-choco-soft"
            >
              이전
            </button>
            <button
              onClick={handleNoSibling}
              className="flex-1 rounded-full border-2 border-pastel-pink px-4 py-2 font-medium text-choco-soft hover:bg-pastel-pink/30"
            >
              없어요
            </button>
            <button
              onClick={() => setStep('pet2')}
              className="flex-1 rounded-full bg-coral px-4 py-2 font-heading text-white shadow-md shadow-coral/40 hover:bg-coral-deep"
            >
              있어요
            </button>
          </div>
        </div>
      )}

      {step === 'pet2' && (
        <>
          <PetForm onBack={() => setStep('siblingPrompt')} onSubmit={handlePet2Submit} />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </>
      )}

      {step === 'result' && owner && pet && result && (
        <ResultView owner={owner} pet={pet} result={result} onRestart={handleRestart} />
      )}
    </main>
  );
}
