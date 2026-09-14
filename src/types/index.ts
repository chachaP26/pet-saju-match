export type PetInputMode = 'exact' | 'approx' | 'metDate';

export type ConfidenceLevel = 'precise' | 'partial' | 'bond';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface OwnerInput {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number | null; // null = 시간 모름
  minute: number;
  isLunar: boolean;
}

export interface PetExactInput {
  year: number;
  month: number;
  day: number;
  hour: number | null; // null = 시간 모름
  minute: number;
  isLunar: boolean;
}

export interface PetApproxInput {
  year: number; // "몇 년생 정도"
  season: Season;
}

export interface PetMetDateInput {
  year: number;
  month: number;
  day: number;
}

export interface PetInput {
  name: string;
  species: string;
  mode: PetInputMode;
  exact?: PetExactInput;
  approx?: PetApproxInput;
  metDate?: PetMetDateInput;
}

export interface PetTemperament {
  elementEmoji: string;
  elementTitle: string;
  elementDescription: string;
  elementStrength: string;
  elementCaution: string;
  zodiacLabel: string;
  zodiacDescription: string;
  isBond: boolean; // true면 생일이 아닌 만난 날 기준 추정치
}

export interface DailyEnergy {
  todayLabel: string; // 예: "9월 14일 (임오일)"
  relationLabel: string;
  description: string;
  activity: string;
}

export interface SiblingCompatibility {
  pet2Name: string;
  pet2Temperament: PetTemperament;
  score: number;
  relationLabel: string;
  description: string;
  tip: string;
}

export interface CompatibilityResult {
  confidence: ConfidenceLevel;
  ownerSummary: string;
  petSummary: string;
  relationLabel: string;
  score: number;
  description: string;
  tip: string;
  petTemperament: PetTemperament;
  todayEnergy: DailyEnergy;
  sibling?: SiblingCompatibility;
}
