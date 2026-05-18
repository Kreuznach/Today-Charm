/**
 * src/lib/storage.ts
 * localStorage 기반 스토리지 레이어
 *
 * 추후 Apps in Toss Storage 또는 Supabase 로 교체 시
 * 이 파일만 수정하면 됩니다.
 */

import type { CharmCollectionItem, DailyCharmRecord } from '../types/charm';

const KEY_RECORDS = 'charm_records';       // DailyCharmRecord[]
const KEY_COLLECTION = 'charm_collection'; // CharmCollectionItem[]

// ─── 내부 헬퍼 ───────────────────────────────────────────

function loadRecords(): DailyCharmRecord[] {
  try {
    const raw = localStorage.getItem(KEY_RECORDS);
    return raw ? (JSON.parse(raw) as DailyCharmRecord[]) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: DailyCharmRecord[]): void {
  localStorage.setItem(KEY_RECORDS, JSON.stringify(records));
}

function loadCollection(): CharmCollectionItem[] {
  try {
    const raw = localStorage.getItem(KEY_COLLECTION);
    return raw ? (JSON.parse(raw) as CharmCollectionItem[]) : [];
  } catch {
    return [];
  }
}

function saveCollection(items: CharmCollectionItem[]): void {
  localStorage.setItem(KEY_COLLECTION, JSON.stringify(items));
}

// ─── Public API ──────────────────────────────────────────

/**
 * 오늘(date) 부적 기록 조회. 없으면 null 반환.
 */
export function getTodayRecord(date: string): DailyCharmRecord | null {
  return loadRecords().find(r => r.date === date) ?? null;
}

/**
 * 오늘 부적 기록 저장 (신규 저장 or 재뽑기 업데이트)
 */
export function saveTodayRecord(record: DailyCharmRecord): void {
  const records = loadRecords().filter(r => r.date !== record.date);
  records.push(record);
  saveRecords(records);

  // 도감 업데이트
  updateCollection(record.finalCharm.charmId, record.date);
}

/**
 * 최근 n일 기록 조회 (오늘 포함, 최신순)
 * dates: 'YYYY-MM-DD' 문자열 배열
 */
export function getRecentRecords(dates: string[]): DailyCharmRecord[] {
  const all = loadRecords();
  return dates
    .map(d => all.find(r => r.date === d))
    .filter((r): r is DailyCharmRecord => !!r);
}

/**
 * 전체 기록 조회
 */
export function getAllRecords(): DailyCharmRecord[] {
  return loadRecords().sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * 도감 전체 조회
 */
export function getCollection(): CharmCollectionItem[] {
  return loadCollection();
}

/**
 * 도감에 부적 추가 또는 획득 횟수 증가
 */
function updateCollection(charmId: string, date: string): void {
  const items = loadCollection();
  const existing = items.find(i => i.charmId === charmId);
  if (existing) {
    existing.acquiredCount += 1;
  } else {
    items.push({ charmId, firstAcquiredDate: date, acquiredCount: 1 });
  }
  saveCollection(items);
}
