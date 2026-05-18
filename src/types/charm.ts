/**
 * src/types/charm.ts
 * 오늘의 말랑부적 — 공통 타입 정의
 */

export type CharmCategory = 'daily' | 'spending' | 'social' | 'meal' | 'cute';
export type CharmRarity = 'basic' | 'special' | 'seasonal';

export interface CharmResult {
  charmId: string;
  charmName: string;
  charmCategory: CharmCategory;
  charmImageKey: string;
  rarity: CharmRarity;
  mainMessage: string;
  charmEffect: string;
  todayUsage: string;
  avoidPoint: string;
  luckyPoint: string;
}

export interface DailyCharmRecord {
  date: string;            // 'YYYY-MM-DD' KST
  firstCharm?: CharmResult;
  finalCharm: CharmResult;
  rerolled: boolean;
  createdAt: string;       // ISO 8601
}

export interface CharmCollectionItem {
  charmId: string;
  firstAcquiredDate: string;
  acquiredCount: number;
}
