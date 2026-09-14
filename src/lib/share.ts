import type { CompatibilityResult, OwnerInput, PetInput } from '@/types';

export const SITE_URL = 'https://pet-saju-match.vercel.app';

export function buildShareContent(owner: OwnerInput, pet: PetInput, result: CompatibilityResult) {
  const title = `${pet.name}(이)와 나의 사주 궁합 결과 🐾`;
  const text = `${owner.name}님과 ${pet.name}의 궁합은 ${result.score}점, "${result.relationLabel}"이래요! 우리 사이 궁합에서 우리 아이와의 궁합도 확인해보세요 🐶🐱`;
  return { title, text, url: SITE_URL };
}
