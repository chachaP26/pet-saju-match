'use client';

import { useState } from 'react';
import type { CompatibilityResult, OwnerInput, PetInput } from '@/types';
import { buildShareContent, SITE_URL } from '@/lib/share';
import { getInitializedKakao } from '@/lib/kakao';

export default function ShareBar({
  owner,
  pet,
  result,
}: {
  owner: OwnerInput;
  pet: PetInput;
  result: CompatibilityResult;
}) {
  const [toast, setToast] = useState('');

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  }

  async function copyToClipboard() {
    const { text, url } = buildShareContent(owner, pet, result);
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return true;
    } catch {
      return false;
    }
  }

  async function handleNativeShare() {
    const content = buildShareContent(owner, pet, result);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(content);
      } catch {
        // 사용자가 공유를 취소한 경우 등 — 무시
      }
      return;
    }
    const ok = await copyToClipboard();
    showToast(ok ? '링크가 복사됐어요! 원하는 곳에 붙여넣어보세요 📋' : '복사에 실패했어요.');
  }

  async function handleKakaoShare() {
    const kakao = getInitializedKakao();
    if (kakao) {
      const { title, text } = buildShareContent(owner, pet, result);
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: text,
          imageUrl: `${SITE_URL}/opengraph-image`,
          link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
        },
        buttons: [
          {
            title: '나도 궁합보기',
            link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
          },
        ],
      });
      return;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      handleNativeShare();
      return;
    }
    const ok = await copyToClipboard();
    showToast(ok ? '링크가 복사됐어요! 카카오톡에 붙여넣어보세요 💬' : '복사에 실패했어요.');
  }

  function handleTwitterShare() {
    const { text, url } = buildShareContent(owner, pet, result);
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  }

  async function handleInstagramShare() {
    const ok = await copyToClipboard();
    showToast(
      ok ? '링크가 복사됐어요! 인스타그램 스토리나 DM에 붙여넣어보세요 📸' : '복사에 실패했어요.',
    );
  }

  async function handleCopyLink() {
    const ok = await copyToClipboard();
    showToast(ok ? '링크가 복사됐어요! 🔗' : '복사에 실패했어요.');
  }

  return (
    <div className="flex flex-col gap-2 rounded-3xl border-2 border-pastel-pink bg-white/80 p-4">
      <p className="text-center text-sm font-bold text-choco">결과를 친구에게 공유해보세요</p>

      <button
        onClick={handleNativeShare}
        className="rounded-full bg-coral px-4 py-3 font-heading text-white shadow-md shadow-coral/40 transition hover:bg-coral-deep active:scale-95"
      >
        📤 공유하기
      </button>

      <div className="flex justify-center gap-3 pt-1">
        <button
          onClick={handleKakaoShare}
          aria-label="카카오톡으로 공유"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] text-xl shadow-sm transition active:scale-90"
        >
          💬
        </button>
        <button
          onClick={handleTwitterShare}
          aria-label="트위터(X)로 공유"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white shadow-sm transition active:scale-90"
        >
          𝕏
        </button>
        <button
          onClick={handleInstagramShare}
          aria-label="인스타그램에 공유"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-xl shadow-sm transition active:scale-90"
        >
          📸
        </button>
        <button
          onClick={handleCopyLink}
          aria-label="링크 복사"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-pastel-mint text-xl shadow-sm transition active:scale-90"
        >
          🔗
        </button>
      </div>

      {toast && (
        <p className="text-center text-xs font-bold text-coral-deep" role="status">
          {toast}
        </p>
      )}
    </div>
  );
}
