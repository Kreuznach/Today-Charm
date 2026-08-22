/**
 * 시즌 부적이 열리는 계절을 정합니다.
 * 계절이 아니면 새로 뽑히지 않고, 이미 모은 것만 도감에서 볼 수 있습니다.
 */

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/** 시즌 부적만 적습니다. 나머지 부적은 언제나 나옵니다. */
export const SEASONAL_CHARM_SEASON: Record<string, Season> = {
  'charm-12': 'winter', // 구독 정리 부적
  'charm-18': 'spring', // 평온한 인간관계 부적
  'charm-23': 'summer', // 고양이 기운 부적
};

export function getSeason(dateStr: string): Season {
  const month = Number(dateStr.slice(5, 7));
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export function getSeasonLabel(season: Season): string {
  const map: Record<Season, string> = {
    spring: '봄',
    summer: '여름',
    autumn: '가을',
    winter: '겨울',
  };
  return map[season];
}

export function isCharmDrawable(
  charm: { charmId: string; rarity: string },
  dateStr: string,
): boolean {
  if (charm.rarity !== 'seasonal') return true;
  const need = SEASONAL_CHARM_SEASON[charm.charmId];
  if (!need) return true;
  return getSeason(dateStr) === need;
}

export function getCharmSeason(charmId: string): Season | null {
  return SEASONAL_CHARM_SEASON[charmId] ?? null;
}
