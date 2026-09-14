import { calculateFourPillars, type FourPillarsDetail, type FiveElement } from 'manseryeok';
import type {
  CompatibilityResult,
  ConfidenceLevel,
  DailyEnergy,
  OwnerInput,
  PetInput,
  PetTemperament,
  Season,
  SiblingCompatibility,
} from '@/types';
import { BRANCH_TRAIT, ELEMENT_TEMPERAMENT } from './temperament';

// 계절별 대표 날짜 (절기 경계를 피해 중간값을 사용)
const SEASON_REPRESENTATIVE: Record<Season, { month: number; day: number }> = {
  spring: { month: 4, day: 15 },
  summer: { month: 7, day: 15 },
  fall: { month: 10, day: 15 },
  winter: { month: 1, day: 15 },
};

const ELEMENT_GENERATES: Record<FiveElement, FiveElement> = {
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
};

const ELEMENT_CONTROLS: Record<FiveElement, FiveElement> = {
  목: '토',
  토: '수',
  수: '화',
  화: '금',
  금: '목',
};

type ElementRelation = 'same' | 'aGeneratesB' | 'bGeneratesA' | 'aControlsB' | 'bControlsA';

function getElementRelation(elementA: FiveElement, elementB: FiveElement): ElementRelation {
  if (elementA === elementB) return 'same';
  if (ELEMENT_GENERATES[elementA] === elementB) return 'aGeneratesB';
  if (ELEMENT_GENERATES[elementB] === elementA) return 'bGeneratesA';
  if (ELEMENT_CONTROLS[elementA] === elementB) return 'aControlsB';
  return 'bControlsA';
}

export function calculatePillarsForOwner(owner: OwnerInput): FourPillarsDetail {
  return calculateFourPillars({
    year: owner.year,
    month: owner.month,
    day: owner.day,
    hour: owner.hour ?? 12,
    minute: owner.hour === null ? 0 : owner.minute,
    isLunar: owner.isLunar,
  });
}

export function calculatePillarsForPet(pet: PetInput): FourPillarsDetail {
  if (pet.mode === 'exact' && pet.exact) {
    const e = pet.exact;
    return calculateFourPillars({
      year: e.year,
      month: e.month,
      day: e.day,
      hour: e.hour ?? 12,
      minute: e.hour === null ? 0 : e.minute,
      isLunar: e.isLunar,
    });
  }

  if (pet.mode === 'approx' && pet.approx) {
    const rep = SEASON_REPRESENTATIVE[pet.approx.season];
    return calculateFourPillars({
      year: pet.approx.year,
      month: rep.month,
      day: rep.day,
      hour: 12,
      minute: 0,
    });
  }

  if (pet.mode === 'metDate' && pet.metDate) {
    const m = pet.metDate;
    return calculateFourPillars({
      year: m.year,
      month: m.month,
      day: m.day,
      hour: 12,
      minute: 0,
    });
  }

  throw new Error('반려동물 정보가 입력 방식에 맞게 채워지지 않았습니다.');
}

export function getOverallConfidence(owner: OwnerInput, pet: PetInput): ConfidenceLevel {
  if (pet.mode === 'metDate') return 'bond';
  if (pet.mode === 'approx') return 'partial';
  // pet.mode === 'exact'
  const petHourKnown = pet.exact?.hour !== null && pet.exact?.hour !== undefined;
  const ownerHourKnown = owner.hour !== null;
  return petHourKnown && ownerHourKnown ? 'precise' : 'partial';
}

const OWNER_PET_RELATION_TEXT: Record<
  ElementRelation,
  { label: string; score: number; description: string; tip: string }
> = {
  same: {
    label: '닮은꼴 케미',
    score: 78,
    description:
      '두 분의 일간(日干) 오행이 같아요. 좋아하는 것도, 편안하게 느끼는 리듬도 비슷해서 별다른 설명 없이도 척하면 척 통하는 사이예요. 굳이 애쓰지 않아도 자연스럽게 서로의 속도를 맞추게 되는, 닮아서 편안한 관계예요.',
    tip: '같은 시간에 낮잠을 자거나 같은 산책 코스를 반복해도 둘 다 편안함을 느끼는 조합이에요. 새로운 자극보다는 익숙한 루틴을 지켜주면 만족도가 더 높아져요.',
  },
  aGeneratesB: {
    label: '든든한 서포터 케미',
    score: 90,
    description:
      '보호자님의 기운이 반려동물에게 흘러들어가는 상생 관계예요. 보호자님이 먼저 다가가고 챙겨줄수록 반려동물이 정서적으로 안정되고, 애교도 눈에 띄게 늘어나는 걸 느끼실 수 있어요. 보호자님 컨디션이 처지는 날엔 반려동물도 덩달아 기운이 빠질 수 있으니, 스스로를 잘 챙기는 것도 관계를 위한 일이에요.',
    tip: '매일 비슷한 시간에 밥과 산책을 챙겨주는 것만으로도 반려동물에게는 큰 안정감이 돼요.',
  },
  bGeneratesA: {
    label: '힐링 충전 케미',
    score: 88,
    description:
      '반려동물의 기운이 보호자님에게 흘러들어가는 상생 관계예요. 겉으로는 보호자님이 돌보는 사이 같지만, 실제로는 반려동물 쪽에서 위로와 활력을 채워주는 힐링 관계에 가까워요. 지치고 힘든 날일수록 반려동물 곁에 있는 시간이 생각보다 큰 힘이 되어줄 거예요.',
    tip: '바쁘더라도 하루 10분은 온전히 반려동물과 눈을 맞추는 시간을 가져보세요. 서로에게 충전이 되는 시간이에요.',
  },
  aControlsB: {
    label: '훈육형 케미',
    score: 60,
    description:
      '보호자님이 자연스럽게 주도권을 쥐는 상극 관계예요. 훈육이나 생활 습관을 잡아주는 데는 유리하지만, 너무 강하게 밀어붙이면 반려동물이 위축되거나 눈치를 볼 수 있어요. 단호함과 다정함 사이의 균형을 잘 잡으면 누구보다 신뢰가 단단한 팀이 될 수 있는 조합이에요.',
    tip: '명령보다는 칭찬과 보상 위주로 훈련하면 훨씬 효과가 좋은 조합이에요.',
  },
  bControlsA: {
    label: '츤데레 케미',
    score: 55,
    description:
      '반려동물에게 보호자님이 은근히 휘둘리는 상극 관계예요. 간식 달라고 조르거나 산책 나가자고 보채면 결국 못 이기고 들어주게 되는, 티격태격하면서도 정이 넘치는 사이예요. 가끔은 단호하게 선을 그어주는 것도 서로에게 필요해요.',
    tip: '일관된 규칙을 미리 정해두면, 휘둘리는 것 같아도 관계의 중심을 잡는 데 큰 도움이 돼요.',
  },
};

// 오늘(a) 과 반려동물(b)의 일간 오행 관계로 본 하루 컨디션
const DAILY_ENERGY_TEXT: Record<
  ElementRelation,
  { label: string; description: string; activity: string }
> = {
  same: {
    label: '평소 페이스',
    description:
      '오늘은 평소와 똑같은 컨디션이에요. 특별한 변화 없이 늘 하던 산책 코스, 늘 먹던 사료가 딱 좋게 느껴지는 무난하고 안정적인 하루예요.',
    activity: '늘 다니던 산책 코스를 그대로 걷는 정도가 딱 좋아요.',
  },
  aGeneratesB: {
    label: '기운 충전',
    description:
      '오늘은 기운을 받는 날이라 컨디션이 좋고 평소보다 애교도 늘어날 수 있어요. 몸도 마음도 여유로운 편이라 뭘 해도 잘 받아들이는 날이에요.',
    activity: '새로운 장난감이나 간식을 시도해보기 좋은 타이밍이에요.',
  },
  bGeneratesA: {
    label: '에너지 발산',
    description:
      '오늘은 기운을 밖으로 쓰는 날이에요. 평소보다 활발하고 장난기가 늘어날 수 있어서, 가만히 두면 오히려 안절부절못할 수 있어요.',
    activity: '산책이나 놀이 시간을 평소보다 조금 더 챙겨주면 만족도가 훨씬 높은 하루가 될 거예요.',
  },
  aControlsB: {
    label: '컨디션 저조',
    description:
      '오늘은 살짝 예민하거나 조심스러워질 수 있는 날이에요. 평소라면 아무렇지 않을 일에도 유독 신경을 쓰는 모습을 보일 수 있어요.',
    activity: '낯선 자극이나 무리한 활동보다는 익숙하고 편안한 환경에서 푹 쉬게 해주세요.',
  },
  bControlsA: {
    label: '자기주장 강세',
    description:
      '오늘은 반려동물이 평소보다 적극적으로 원하는 걸 표현할 수 있는 날이에요. 은근히 고집을 부리거나 원하는 걸 얻을 때까지 조를 수 있어요.',
    activity: '간식이나 산책을 평소보다 조금 더 조르더라도 너그럽게 받아주면 하루가 훈훈하게 마무리될 거예요.',
  },
};

function siblingRelationText(
  relation: ElementRelation,
  nameA: string,
  nameB: string,
): { label: string; score: number; description: string; tip: string } {
  switch (relation) {
    case 'same':
      return {
        label: '닮은꼴 남매 케미',
        score: 80,
        description: `${nameA}와 ${nameB}는 성향이 비슷해서 합이 잘 맞아요. 좋아하는 장난감이나 쉬는 방식도 비슷해서 나란히 있어도 부딪힐 일이 적은, 편안한 룸메이트 같은 사이예요.`,
        tip: '취향이 겹치는 만큼 간식이나 장난감은 넉넉히 준비해서 서로 눈치 볼 일을 줄여주세요.',
      };
    case 'aGeneratesB':
      return {
        label: '든든한 챙김 케미',
        score: 88,
        description: `${nameA}가 ${nameB}를 챙겨주는 관계예요. ${nameA} 덕분에 ${nameB}가 마음 편히 지낼 수 있고, 낯선 상황에서도 ${nameA}가 곁에 있으면 ${nameB}가 훨씬 안정감을 느껴요.`,
        tip: `병원이나 낯선 장소에 갈 땐 가능하면 ${nameA}와 ${nameB}를 함께 데려가 보세요. 서로에게 의지가 될 거예요.`,
      };
    case 'bGeneratesA':
      return {
        label: '든든한 챙김 케미',
        score: 88,
        description: `${nameB}가 ${nameA}를 챙겨주는 관계예요. ${nameB} 덕분에 ${nameA}가 마음 편히 지낼 수 있고, 낯선 상황에서도 ${nameB}가 곁에 있으면 ${nameA}가 훨씬 안정감을 느껴요.`,
        tip: `병원이나 낯선 장소에 갈 땐 가능하면 ${nameA}와 ${nameB}를 함께 데려가 보세요. 서로에게 의지가 될 거예요.`,
      };
    case 'aControlsB':
      return {
        label: '티격태격 케미',
        score: 58,
        description: `${nameA}가 ${nameB}보다 기가 세서 은근히 주도권을 쥐는 편이에요. 밥이나 장난감 앞에서 가끔 신경전이 벌어질 수 있지만, 서로 미워서 그런 건 아니에요.`,
        tip: '밥그릇과 쉬는 자리는 따로 마련해주면 신경전이 확실히 줄어드는 조합이에요.',
      };
    case 'bControlsA':
      return {
        label: '티격태격 케미',
        score: 58,
        description: `${nameB}가 ${nameA}보다 기가 세서 은근히 주도권을 쥐는 편이에요. 밥이나 장난감 앞에서 가끔 신경전이 벌어질 수 있지만, 서로 미워서 그런 건 아니에요.`,
        tip: '밥그릇과 쉬는 자리는 따로 마련해주면 신경전이 확실히 줄어드는 조합이에요.',
      };
  }
}

function getPetTemperament(petPillars: FourPillarsDetail, pet: PetInput): PetTemperament {
  const elementInfo = ELEMENT_TEMPERAMENT[petPillars.dayElement.stem];
  const zodiacInfo = BRANCH_TRAIT[petPillars.year.earthlyBranch];

  return {
    elementEmoji: elementInfo.emoji,
    elementTitle: elementInfo.title,
    elementDescription: elementInfo.description,
    elementStrength: elementInfo.strength,
    elementCaution: elementInfo.caution,
    zodiacLabel: pet.mode === 'metDate' ? `인연 ${zodiacInfo.animal}` : zodiacInfo.animal,
    zodiacDescription: zodiacInfo.description,
    isBond: pet.mode === 'metDate',
  };
}

function computeTodayEnergy(petPillars: FourPillarsDetail): DailyEnergy {
  const now = new Date();
  const todayPillars = calculateFourPillars({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: 12,
    minute: 0,
  });

  const relation = getElementRelation(todayPillars.dayElement.stem, petPillars.dayElement.stem);
  const { label, description, activity } = DAILY_ENERGY_TEXT[relation];

  return {
    todayLabel: `${now.getMonth() + 1}월 ${now.getDate()}일 (${todayPillars.day.heavenlyStem}${todayPillars.day.earthlyBranch}일)`,
    relationLabel: label,
    description,
    activity,
  };
}

function computeSiblingCompatibility(pet1: PetInput, pet2: PetInput): SiblingCompatibility {
  const pet1Pillars = calculatePillarsForPet(pet1);
  const pet2Pillars = calculatePillarsForPet(pet2);

  const relation = getElementRelation(pet1Pillars.dayElement.stem, pet2Pillars.dayElement.stem);
  const { label, score, description, tip } = siblingRelationText(relation, pet1.name, pet2.name);

  return {
    pet2Name: pet2.name,
    pet2Temperament: getPetTemperament(pet2Pillars, pet2),
    score,
    relationLabel: label,
    description,
    tip,
  };
}

export function computeCompatibility(
  owner: OwnerInput,
  pet: PetInput,
  pet2?: PetInput,
): CompatibilityResult {
  const ownerPillars = calculatePillarsForOwner(owner);
  const petPillars = calculatePillarsForPet(pet);

  const relation = getElementRelation(ownerPillars.dayElement.stem, petPillars.dayElement.stem);
  const { label, score, description, tip } = OWNER_PET_RELATION_TEXT[relation];

  return {
    confidence: getOverallConfidence(owner, pet),
    ownerSummary: ownerPillars.toString(),
    petSummary: petPillars.toString(),
    relationLabel: label,
    score,
    description,
    tip,
    petTemperament: getPetTemperament(petPillars, pet),
    todayEnergy: computeTodayEnergy(petPillars),
    sibling: pet2 ? computeSiblingCompatibility(pet, pet2) : undefined,
  };
}
