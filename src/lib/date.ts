/**
 * src/lib/date.ts
 * KST(UTC+9) 기준 날짜 유틸리티
 */

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * 현재 KST 기준 날짜 문자열 반환 → 'YYYY-MM-DD'
 */
export function getTodayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + KST_OFFSET_MS);
  return kst.toISOString().slice(0, 10);
}

/**
 * KST 기준 날짜 문자열을 사람이 읽기 좋은 형태로 변환
 * '2026-05-18' → '2026년 5월 18일'
 */
export function formatDateKST(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

/**
 * 두 날짜 문자열('YYYY-MM-DD')이 같은 날인지 확인
 */
export function isSameDate(a: string, b: string): boolean {
  return a === b;
}

/**
 * 최근 n일의 날짜 목록 반환 (오늘 포함, KST 기준, 최신순)
 */
export function getRecentDates(n: number): string[] {
  const now = new Date();
  const kstNow = new Date(now.getTime() + KST_OFFSET_MS);
  const dates: string[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(kstNow);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}
