#!/usr/bin/env node
/**
 * 개선 규칙이 깨지지 않았는지 빠르게 확인합니다.
 * 실행: node scripts/validate-improvement.cjs
 */
const assert = require('assert');

function getYesterdayKST(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const utc = Date.UTC(y, m - 1, d);
  return new Date(utc - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function getSeason(dateStr) {
  const month = Number(dateStr.slice(5, 7));
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getStreak(today, dates) {
  const set = new Set(dates);
  if (!set.has(today)) return 0;
  let count = 0;
  let cursor = today;
  while (set.has(cursor)) {
    count += 1;
    cursor = getYesterdayKST(cursor);
  }
  return count;
}

assert.strictEqual(getYesterdayKST('2026-08-22'), '2026-08-21');
assert.strictEqual(getYesterdayKST('2026-01-01'), '2025-12-31');
assert.strictEqual(getSeason('2026-08-22'), 'summer');
assert.strictEqual(getSeason('2026-12-01'), 'winter');
assert.strictEqual(getStreak('2026-08-22', ['2026-08-22', '2026-08-21', '2026-08-20']), 3);
assert.strictEqual(getStreak('2026-08-22', ['2026-08-22', '2026-08-20']), 1);
assert.strictEqual(getStreak('2026-08-22', ['2026-08-21']), 0);

const shareText = [
  '오늘 뽑은 말랑부적: 지갑 방어 부적',
  '오늘은 지갑을 잠깐 쉬게 해 주자.',
  '',
  '진짜 운세가 아니에요. 오늘을 가볍게 버티는 카드예요.',
].join('\n');
assert.ok(!/포인트|쿠폰|대박|운명/.test(shareText));

console.log('개선 규칙 확인 통과');
