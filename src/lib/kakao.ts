export interface KakaoShareContent {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons: { title: string; link: { mobileWebUrl: string; webUrl: string } }[];
}

interface KakaoSdk {
  isInitialized: () => boolean;
  init: (key: string) => void;
  Share: {
    sendDefault: (options: KakaoShareContent) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

export function getInitializedKakao(): KakaoSdk | undefined {
  if (typeof window === 'undefined' || !window.Kakao) return undefined;

  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (!key) return undefined;

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key);
  }
  return window.Kakao;
}
